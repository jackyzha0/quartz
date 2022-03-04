import { DEFAULT_ENCODING } from "../encoding/defaultEncoding";
import { encoders } from "../encoding/encoding-factory";
import { getEncoding } from "../encoding/encodings";
import { finished } from "../encoding/finished";
import { end_of_stream } from "../encoding/terminology";
import { stringToCodePoints, ToDictionary } from "../encoding/utilities";
import { getGlobalScope } from "../helper/getGlobalScope";
import { Stream } from "./Stream";
/**
 * @constructor
 * @param {string=} label The label of the encoding. NONSTANDARD.
 * @param {Object=} options NONSTANDARD.
 */
export class TextEncoder {
    constructor(label, options) {
        const optionsMap = ToDictionary(options);
        // A TextEncoder object has an associated encoding and encoder.
        /** @private */
        this._encoding = null;
        /** @private @type {?Encoder} */
        this._encoder = null;
        // Non-standard
        /** @private @type {boolean} */
        this._do_not_flush = false;
        /** @private @type {string} */
        this._fatal = Boolean(optionsMap['fatal']) ? 'fatal' : 'replacement';
        // 1. Let enc be a new TextEncoder object.
        // const enc = this;
        // no need to do this as this is a proper class 
        // now and TSC will handle transpilation to older platforms
        // 2. Set enc's encoding to UTF-8's encoder.
        if (Boolean(optionsMap['NONSTANDARD_allowLegacyEncoding'])) {
            // NONSTANDARD behavior.
            label = !!label ? String(label) : DEFAULT_ENCODING;
            const encoding = getEncoding(label);
            if (encoding === null || encoding.name === 'replacement')
                throw RangeError('Unknown encoding: ' + label);
            if (!encoders[encoding.name]) {
                throw Error('Encoder not present.' +
                    ' Did you forget to include encoding-indexes.js first?');
            }
            this._encoding = encoding;
            // EXPERIMENTAL_CODE
            // } else if (["iso-8859-1", "ISO-8859-1", "latin-1", "latin1", "LATIN-1", "LATIN1"].indexOf(label) !== -1) {
            //   this._encoding = getEncoding('iso-8859-1');
        }
        else {
            // Standard behavior.
            this._encoding = getEncoding('utf-8');
            const glo = getGlobalScope() || {};
            if (label !== undefined && 'console' in glo) {
                console.warn('TextEncoder constructor called with encoding label, '
                    + 'which is ignored.');
            }
        }
        // For pre-ES5 runtimes:
        // if (!Object.defineProperty)
        // this.encoding = enc._encoding.name.toLowerCase();
        // 3. Return enc.
        // return enc;
    }
    // if(Object.defineProperty) {
    //  // The encoding attribute's getter must return encoding's name.
    //   Object.defineProperty(TextEncoder.prototype, 'encoding', {
    //     /** @this {TextEncoder} */
    //     get: function () { return this._encoding.name.toLowerCase(); }
    //   });
    // }
    get encoding() {
        return this._encoding.name.toLowerCase();
    }
    /**
     * @param {string=} opt_string The string to encode.
     * @param {Object=} options
     * @return {!Uint8Array} Encoded bytes, as a Uint8Array.
     */
    encode(opt_string, options) {
        opt_string = opt_string === undefined ? '' : String(opt_string);
        const optionsMap = ToDictionary(options);
        // NOTE: This option is nonstandard. None of the encodings
        // permitted for encoding (i.e. UTF-8, UTF-16) are stateful when
        // the input is a USVString so streaming is not necessary.
        if (!this._do_not_flush)
            this._encoder = encoders[this._encoding.name]({
                fatal: this._fatal === 'fatal'
            });
        this._do_not_flush = Boolean(optionsMap['stream']);
        // 1. Convert input to a stream.
        const input = new Stream(stringToCodePoints(opt_string));
        // 2. Let output be a new stream
        const output = [];
        /** @type {?(number|!Array.<number>)} */
        let result;
        // 3. While true, run these substeps:
        while (true) {
            // 1. Let token be the result of reading from input.
            const token = input.read();
            if (token === end_of_stream)
                break;
            // 2. Let result be the result of processing token for encoder,
            // input, output.
            result = this._encoder.handler(input, token);
            if (result === finished)
                break;
            if (Array.isArray(result))
                output.push.apply(output, /**@type {!Array.<number>}*/ (result));
            else
                output.push(result);
        }
        // TODO: Align with spec algorithm.
        if (!this._do_not_flush) {
            while (true) {
                result = this._encoder.handler(input, input.read());
                if (result === finished)
                    break;
                if (Array.isArray(result))
                    output.push.apply(output, /**@type {!Array.<number>}*/ (result));
                else
                    output.push(result);
            }
            this._encoder = null;
        }
        // 3. If result is finished, convert output into a byte sequence,
        // and then return a Uint8Array object wrapping an ArrayBuffer
        // containing output.
        return new Uint8Array(output);
    }
}
//# sourceMappingURL=TextEncoder.js.map