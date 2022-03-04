"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encodings_1 = require("../../encoding/encodings");
var finished_1 = require("../../encoding/finished");
var indexes_1 = require("../../encoding/indexes");
var terminology_1 = require("../../encoding/terminology");
var utilities_1 = require("../../encoding/utilities");
var states;
(function (states) {
    states[states["ASCII"] = 0] = "ASCII";
    states[states["Roman"] = 1] = "Roman";
    states[states["Katakana"] = 2] = "Katakana";
    states[states["LeadByte"] = 3] = "LeadByte";
    states[states["TrailByte"] = 4] = "TrailByte";
    states[states["EscapeStart"] = 5] = "EscapeStart";
    states[states["Escape"] = 6] = "Escape";
})(states || (states = {}));
var ISO2022JPDecoder = /** @class */ (function () {
    /**
     * @constructor
     * @implements {Decoder}
     * @param {{fatal: boolean}} options
     */
    function ISO2022JPDecoder(options) {
        this.fatal = options.fatal;
        // iso-2022-jp's decoder has an associated iso-2022-jp decoder
        // state (initially ASCII), iso-2022-jp decoder output state
        // (initially ASCII), iso-2022-jp lead (initially 0x00), and
        // iso-2022-jp output flag (initially unset).
        /** @type {number} */ this.iso2022jp_decoder_state = states.ASCII,
            /** @type {number} */ this.iso2022jp_decoder_output_state = states.ASCII,
            /** @type {number} */ this.iso2022jp_lead = 0x00,
            /** @type {boolean} */ this.iso2022jp_output_flag = false;
    }
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    ISO2022JPDecoder.prototype.handler = function (stream, bite) {
        // switching on iso-2022-jp decoder state:
        switch (this.iso2022jp_decoder_state) {
            default:
            case states.ASCII:
                // ASCII
                // Based on byte:
                // 0x1B
                if (bite === 0x1B) {
                    // Set iso-2022-jp decoder state to escape start and return
                    // continue.
                    this.iso2022jp_decoder_state = states.EscapeStart;
                    return null;
                }
                // 0x00 to 0x7F, excluding 0x0E, 0x0F, and 0x1B
                if (utilities_1.inRange(bite, 0x00, 0x7F) && bite !== 0x0E
                    && bite !== 0x0F && bite !== 0x1B) {
                    // Unset the iso-2022-jp output flag and return a code point
                    // whose value is byte.
                    this.iso2022jp_output_flag = false;
                    return bite;
                }
                // end-of-stream
                if (bite === terminology_1.end_of_stream) {
                    // Return finished.
                    return finished_1.finished;
                }
                // Otherwise
                // Unset the iso-2022-jp output flag and return error.
                this.iso2022jp_output_flag = false;
                return encodings_1.decoderError(this.fatal);
            case states.Roman:
                // Roman
                // Based on byte:
                // 0x1B
                if (bite === 0x1B) {
                    // Set iso-2022-jp decoder state to escape start and return
                    // continue.
                    this.iso2022jp_decoder_state = states.EscapeStart;
                    return null;
                }
                // 0x5C
                if (bite === 0x5C) {
                    // Unset the iso-2022-jp output flag and return code point
                    // U+00A5.
                    this.iso2022jp_output_flag = false;
                    return 0x00A5;
                }
                // 0x7E
                if (bite === 0x7E) {
                    // Unset the iso-2022-jp output flag and return code point
                    // U+203E.
                    this.iso2022jp_output_flag = false;
                    return 0x203E;
                }
                // 0x00 to 0x7F, excluding 0x0E, 0x0F, 0x1B, 0x5C, and 0x7E
                if (utilities_1.inRange(bite, 0x00, 0x7F) && bite !== 0x0E && bite !== 0x0F
                    && bite !== 0x1B && bite !== 0x5C && bite !== 0x7E) {
                    // Unset the iso-2022-jp output flag and return a code point
                    // whose value is byte.
                    this.iso2022jp_output_flag = false;
                    return bite;
                }
                // end-of-stream
                if (bite === terminology_1.end_of_stream) {
                    // Return finished.
                    return finished_1.finished;
                }
                // Otherwise
                // Unset the iso-2022-jp output flag and return error.
                this.iso2022jp_output_flag = false;
                return encodings_1.decoderError(this.fatal);
            case states.Katakana:
                // Katakana
                // Based on byte:
                // 0x1B
                if (bite === 0x1B) {
                    // Set iso-2022-jp decoder state to escape start and return
                    // continue.
                    this.iso2022jp_decoder_state = states.EscapeStart;
                    return null;
                }
                // 0x21 to 0x5F
                if (utilities_1.inRange(bite, 0x21, 0x5F)) {
                    // Unset the iso-2022-jp output flag and return a code point
                    // whose value is 0xFF61 − 0x21 + byte.
                    this.iso2022jp_output_flag = false;
                    return 0xFF61 - 0x21 + bite;
                }
                // end-of-stream
                if (bite === terminology_1.end_of_stream) {
                    // Return finished.
                    return finished_1.finished;
                }
                // Otherwise
                // Unset the iso-2022-jp output flag and return error.
                this.iso2022jp_output_flag = false;
                return encodings_1.decoderError(this.fatal);
            case states.LeadByte:
                // Lead byte
                // Based on byte:
                // 0x1B
                if (bite === 0x1B) {
                    // Set iso-2022-jp decoder state to escape start and return
                    // continue.
                    this.iso2022jp_decoder_state = states.EscapeStart;
                    return null;
                }
                // 0x21 to 0x7E
                if (utilities_1.inRange(bite, 0x21, 0x7E)) {
                    // Unset the iso-2022-jp output flag, set iso-2022-jp lead
                    // to byte, iso-2022-jp decoder state to trail byte, and
                    // return continue.
                    this.iso2022jp_output_flag = false;
                    this.iso2022jp_lead = bite;
                    this.iso2022jp_decoder_state = states.TrailByte;
                    return null;
                }
                // end-of-stream
                if (bite === terminology_1.end_of_stream) {
                    // Return finished.
                    return finished_1.finished;
                }
                // Otherwise
                // Unset the iso-2022-jp output flag and return error.
                this.iso2022jp_output_flag = false;
                return encodings_1.decoderError(this.fatal);
            case states.TrailByte:
                // Trail byte
                // Based on byte:
                // 0x1B
                if (bite === 0x1B) {
                    // Set iso-2022-jp decoder state to escape start and return
                    // continue.
                    this.iso2022jp_decoder_state = states.EscapeStart;
                    return encodings_1.decoderError(this.fatal);
                }
                // 0x21 to 0x7E
                if (utilities_1.inRange(bite, 0x21, 0x7E)) {
                    // 1. Set the iso-2022-jp decoder state to lead byte.
                    this.iso2022jp_decoder_state = states.LeadByte;
                    // 2. Let pointer be (iso-2022-jp lead − 0x21) × 94 + byte − 0x21.
                    var pointer = (this.iso2022jp_lead - 0x21) * 94 + bite - 0x21;
                    // 3. Let code point be the index code point for pointer in
                    // index jis0208.
                    var code_point = indexes_1.indexCodePointFor(pointer, indexes_1.index('jis0208'));
                    // 4. If code point is null, return error.
                    if (code_point === null)
                        return encodings_1.decoderError(this.fatal);
                    // 5. Return a code point whose value is code point.
                    return code_point;
                }
                // end-of-stream
                if (bite === terminology_1.end_of_stream) {
                    // Set the iso-2022-jp decoder state to lead byte, prepend
                    // byte to stream, and return error.
                    this.iso2022jp_decoder_state = states.LeadByte;
                    stream.prepend(bite);
                    return encodings_1.decoderError(this.fatal);
                }
                // Otherwise
                // Set iso-2022-jp decoder state to lead byte and return
                // error.
                this.iso2022jp_decoder_state = states.LeadByte;
                return encodings_1.decoderError(this.fatal);
            case states.EscapeStart:
                // Escape start
                // 1. If byte is either 0x24 or 0x28, set iso-2022-jp lead to
                // byte, iso-2022-jp decoder state to escape, and return
                // continue.
                if (bite === 0x24 || bite === 0x28) {
                    this.iso2022jp_lead = bite;
                    this.iso2022jp_decoder_state = states.Escape;
                    return null;
                }
                // 2. Prepend byte to stream.
                stream.prepend(bite);
                // 3. Unset the iso-2022-jp output flag, set iso-2022-jp
                // decoder state to iso-2022-jp decoder output state, and
                // return error.
                this.iso2022jp_output_flag = false;
                this.iso2022jp_decoder_state = this.iso2022jp_decoder_output_state;
                return encodings_1.decoderError(this.fatal);
            case states.Escape:
                // Escape
                // 1. Let lead be iso-2022-jp lead and set iso-2022-jp lead to
                // 0x00.
                var lead = this.iso2022jp_lead;
                this.iso2022jp_lead = 0x00;
                // 2. Let state be null.
                var state = null;
                // 3. If lead is 0x28 and byte is 0x42, set state to ASCII.
                if (lead === 0x28 && bite === 0x42)
                    state = states.ASCII;
                // 4. If lead is 0x28 and byte is 0x4A, set state to Roman.
                if (lead === 0x28 && bite === 0x4A)
                    state = states.Roman;
                // 5. If lead is 0x28 and byte is 0x49, set state to Katakana.
                if (lead === 0x28 && bite === 0x49)
                    state = states.Katakana;
                // 6. If lead is 0x24 and byte is either 0x40 or 0x42, set
                // state to lead byte.
                if (lead === 0x24 && (bite === 0x40 || bite === 0x42))
                    state = states.LeadByte;
                // 7. If state is non-null, run these substeps:
                if (state !== null) {
                    // 1. Set iso-2022-jp decoder state and iso-2022-jp decoder
                    // output state to states.
                    this.iso2022jp_decoder_state = this.iso2022jp_decoder_state = state;
                    // 2. Let output flag be the iso-2022-jp output flag.
                    var output_flag = this.iso2022jp_output_flag;
                    // 3. Set the iso-2022-jp output flag.
                    this.iso2022jp_output_flag = true;
                    // 4. Return continue, if output flag is unset, and error
                    // otherwise.
                    return !output_flag ? null : encodings_1.decoderError(this.fatal);
                }
                // 8. Prepend lead and byte to stream.
                stream.prepend([lead, bite]);
                // 9. Unset the iso-2022-jp output flag, set iso-2022-jp
                // decoder state to iso-2022-jp decoder output state and
                // return error.
                this.iso2022jp_output_flag = false;
                this.iso2022jp_decoder_state = this.iso2022jp_decoder_output_state;
                return encodings_1.decoderError(this.fatal);
        }
    };
    return ISO2022JPDecoder;
}());
exports.ISO2022JPDecoder = ISO2022JPDecoder;
//# sourceMappingURL=ISO2022JPDecoder.js.map