import { DEFAULT_ENCODING } from "../encoding/defaultEncoding";
import { decoders } from "../encoding/encoding-factory";
import { getEncoding } from "../encoding/encodings";
import { finished } from "../encoding/finished";
import { end_of_stream } from "../encoding/terminology";
import { codePointsToString, includes, ToDictionary } from "../encoding/utilities";
import { Stream } from "./Stream";
/**
 * @constructor
 * @param {string=} label The label of the encoding;
 *     defaults to 'utf-8'.
 * @param {Object=} options
 */
export class TextDecoder {
    constructor(label, options) {
        label = label !== undefined ? String(label) : DEFAULT_ENCODING;
        const optionsMap = ToDictionary(options);
        // A TextDecoder object has an associated encoding, decoder,
        // stream, ignore BOM flag (initially unset), BOM seen flag
        // (initially unset), error mode (initially replacement), and do
        // not flush flag (initially unset).
        /** @private */
        this._encoding = null;
        /** @private @type {?Decoder} */
        this._decoder = null;
        /** @private @type {boolean} */
        this._ignoreBOM = false;
        /** @private @type {boolean} */
        this._BOMseen = false;
        /** @private @type {string} */
        this._error_mode = 'replacement';
        /** @private @type {boolean} */
        this._do_not_flush = false;
        // 1. Let encoding be the result of getting an encoding from
        // label.
        const encoding = getEncoding(label);
        // 2. If encoding is failure or replacement, throw a RangeError.
        if (encoding === null || encoding.name === 'replacement')
            throw RangeError('Unknown encoding: ' + label);
        if (!decoders[encoding.name]) {
            throw Error('Decoder not present.' +
                ' Did you forget to include encoding-indexes.js first?');
        }
        // 3. Let dec be a new TextDecoder object.
        // const dec = this;
        // no need to do this as this is a proper class 
        // now and TSC will handle transpilation to older platforms
        // 4. Set dec's encoding to encoding.
        this._encoding = encoding;
        // 5. If options's fatal member is true, set dec's error mode to
        // fatal.
        if (Boolean(optionsMap['fatal']))
            this._error_mode = 'fatal';
        // 6. If options's ignoreBOM member is true, set dec's ignore BOM
        // flag.
        if (Boolean(optionsMap['ignoreBOM']))
            this._ignoreBOM = true;
        // For pre-ES5 runtimes:
        // if (!Object.defineProperty) {
        //   this.encoding = dec._encoding.name.toLowerCase();
        //   this.fatal = dec._error_mode === 'fatal';
        //   this.ignoreBOM = dec._ignoreBOM;
        // }
        // 7. Return dec.
        // return dec;
    }
    // if (Object.defineProperty) {
    // The encoding attribute's getter must return encoding's name.
    //   Object.defineProperty(TextDecoder.prototype, 'encoding', {
    //     /** @this {TextDecoder} */
    //     get: function () { return this._encoding.name.toLowerCase(); }
    //   });
    get encoding() {
        return this._encoding.name.toLowerCase();
    }
    // The fatal attribute's getter must return true if error mode
    // is fatal, and false otherwise.
    //   Object.defineProperty(TextDecoder.prototype, 'fatal', {
    //     /** @this {TextDecoder} */
    //     get: function () { return this._error_mode === 'fatal'; }
    //   });
    get fatal() {
        return this._error_mode === 'fatal';
    }
    // The ignoreBOM attribute's getter must return true if ignore
    // BOM flag is set, and false otherwise.
    //   Object.defineProperty(TextDecoder.prototype, 'ignoreBOM', {
    //     /** @this {TextDecoder} */
    //     get: function () { return this._ignoreBOM; }
    //   });
    get ignoreBOM() {
        return this._ignoreBOM;
    }
    // }
    /**
     * @param {BufferSource=} input The buffer of bytes to decode.
     * @param {Object=} options
     * @return {string} The decoded string.
     */
    decode(input, options) {
        const bytes = getBytesFromInput(input);
        const optionsMap = ToDictionary(options);
        // 1. If the do not flush flag is unset, set decoder to a new
        // encoding's decoder, set stream to a new stream, and unset the
        // BOM seen flag.
        if (!this._do_not_flush) {
            this._decoder = decoders[this._encoding.name]({
                fatal: this._error_mode === 'fatal'
            });
            this._BOMseen = false;
        }
        // 2. If options's stream is true, set the do not flush flag, and
        // unset the do not flush flag otherwise.
        this._do_not_flush = Boolean(optionsMap['stream']);
        // 3. If input is given, push a copy of input to stream.
        // TODO: Align with spec algorithm - maintain stream on instance.
        const input_stream = new Stream(bytes);
        // 4. Let output be a new stream.
        const output = [];
        /** @type {?(number|!Array.<number>)} */
        let result;
        // 5. While true:
        while (true) {
            // 1. Let token be the result of reading from stream.
            const token = input_stream.read();
            // 2. If token is end-of-stream and the do not flush flag is
            // set, return output, serialized.
            // TODO: Align with spec algorithm.
            if (token === end_of_stream)
                break;
            // 3. Otherwise, run these subsubsteps:
            // 1. Let result be the result of processing token for decoder,
            // stream, output, and error mode.
            result = this._decoder.handler(input_stream, token);
            // 2. If result is finished, return output, serialized.
            if (result === finished)
                break;
            if (result !== null) {
                if (Array.isArray(result))
                    output.push.apply(output, /**@type {!Array.<number>}*/ (result));
                else
                    output.push(result);
            }
            // 3. Otherwise, if result is error, throw a TypeError.
            // (Thrown in handler)
            // 4. Otherwise, do nothing.
        }
        // TODO: Align with spec algorithm.
        if (!this._do_not_flush) {
            do {
                result = this._decoder.handler(input_stream, input_stream.read());
                if (result === finished)
                    break;
                if (!result)
                    continue;
                if (Array.isArray(result))
                    output.push.apply(output, /**@type {!Array.<number>}*/ (result));
                else
                    output.push(result);
            } while (!input_stream.endOfStream());
            this._decoder = null;
        }
        return this.serializeStream(output);
    }
    // A TextDecoder object also has an associated serialize stream
    // algorithm...
    /**
     * @param {!Array.<number>} stream
     * @return {string}
     * @this {TextDecoder}
     */
    serializeStream(stream) {
        // 1. Let token be the result of reading from stream.
        // (Done in-place on array, rather than as a stream)
        // 2. If encoding is UTF-8, UTF-16BE, or UTF-16LE, and ignore
        // BOM flag and BOM seen flag are unset, run these subsubsteps:
        if (includes(['UTF-8', 'UTF-16LE', 'UTF-16BE'], this._encoding.name) &&
            !this._ignoreBOM && !this._BOMseen) {
            if (stream.length > 0 && stream[0] === 0xFEFF) {
                // 1. If token is U+FEFF, set BOM seen flag.
                this._BOMseen = true;
                stream.shift();
            }
            else if (stream.length > 0) {
                // 2. Otherwise, if token is not end-of-stream, set BOM seen
                // flag and append token to stream.
                this._BOMseen = true;
            }
            else {
                // 3. Otherwise, if token is not end-of-stream, append token
                // to output.
                // (no-op)
            }
        }
        // 4. Otherwise, return output.
        return codePointsToString(stream);
    }
}
function isBufferInstance(input) {
    try {
        return input instanceof ArrayBuffer;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
function getBytesFromInput(input) {
    if (typeof input !== 'object')
        return new Uint8Array(0);
    if (isBufferInstance(input)) {
        return new Uint8Array(input);
    }
    if ('buffer' in input && isBufferInstance(input.buffer)) {
        return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    }
    return new Uint8Array(0);
}
//# sourceMappingURL=TextDecoder.js.map