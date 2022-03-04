"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encodings_1 = require("../../encoding/encodings");
var finished_1 = require("../../encoding/finished");
var indexes_1 = require("../../encoding/indexes");
var terminology_1 = require("../../encoding/terminology");
var utilities_1 = require("../../encoding/utilities");
/**
 * @constructor
 * @implements {Decoder}
 * @param {{fatal: boolean}} options
 */
var ShiftJISDecoder = /** @class */ (function () {
    function ShiftJISDecoder(options) {
        this.fatal = options.fatal;
        // Shift_JIS's decoder has an associated Shift_JIS lead (initially
        // 0x00).
        /** @type {number} */ this.Shift_JIS_lead = 0x00;
    }
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    ShiftJISDecoder.prototype.handler = function (stream, bite) {
        // 1. If byte is end-of-stream and Shift_JIS lead is not 0x00,
        // set Shift_JIS lead to 0x00 and return error.
        if (bite === terminology_1.end_of_stream && this.Shift_JIS_lead !== 0x00) {
            this.Shift_JIS_lead = 0x00;
            return encodings_1.decoderError(this.fatal);
        }
        // 2. If byte is end-of-stream and Shift_JIS lead is 0x00,
        // return finished.
        if (bite === terminology_1.end_of_stream && this.Shift_JIS_lead === 0x00)
            return finished_1.finished;
        // 3. If Shift_JIS lead is not 0x00, let lead be Shift_JIS lead,
        // let pointer be null, set Shift_JIS lead to 0x00, and then run
        // these substeps:
        if (this.Shift_JIS_lead !== 0x00) {
            var lead = this.Shift_JIS_lead;
            var pointer = null;
            this.Shift_JIS_lead = 0x00;
            // 1. Let offset be 0x40, if byte is less than 0x7F, and 0x41
            // otherwise.
            var offset = (bite < 0x7F) ? 0x40 : 0x41;
            // 2. Let lead offset be 0x81, if lead is less than 0xA0, and
            // 0xC1 otherwise.
            var lead_offset = (lead < 0xA0) ? 0x81 : 0xC1;
            // 3. If byte is in the range 0x40 to 0x7E, inclusive, or 0x80
            // to 0xFC, inclusive, set pointer to (lead − lead offset) ×
            // 188 + byte − offset.
            if (utilities_1.inRange(bite, 0x40, 0x7E) || utilities_1.inRange(bite, 0x80, 0xFC))
                pointer = (lead - lead_offset) * 188 + bite - offset;
            // 4. If pointer is in the range 8836 to 10715, inclusive,
            // return a code point whose value is 0xE000 − 8836 + pointer.
            if (utilities_1.inRange(pointer, 8836, 10715))
                return 0xE000 - 8836 + pointer;
            // 5. Let code point be null, if pointer is null, and the
            // index code point for pointer in index jis0208 otherwise.
            var code_point = (pointer === null) ? null :
                indexes_1.indexCodePointFor(pointer, indexes_1.index('jis0208'));
            // 6. If code point is null and byte is an ASCII byte, prepend
            // byte to stream.
            if (code_point === null && terminology_1.isASCIIByte(bite))
                stream.prepend(bite);
            // 7. If code point is null, return error.
            if (code_point === null)
                return encodings_1.decoderError(this.fatal);
            // 8. Return a code point whose value is code point.
            return code_point;
        }
        // 4. If byte is an ASCII byte or 0x80, return a code point
        // whose value is byte.
        if (terminology_1.isASCIIByte(bite) || bite === 0x80)
            return bite;
        // 5. If byte is in the range 0xA1 to 0xDF, inclusive, return a
        // code point whose value is 0xFF61 − 0xA1 + byte.
        if (utilities_1.inRange(bite, 0xA1, 0xDF))
            return 0xFF61 - 0xA1 + bite;
        // 6. If byte is in the range 0x81 to 0x9F, inclusive, or 0xE0
        // to 0xFC, inclusive, set Shift_JIS lead to byte and return
        // continue.
        if (utilities_1.inRange(bite, 0x81, 0x9F) || utilities_1.inRange(bite, 0xE0, 0xFC)) {
            this.Shift_JIS_lead = bite;
            return null;
        }
        // 7. Return error.
        return encodings_1.decoderError(this.fatal);
    };
    return ShiftJISDecoder;
}());
exports.ShiftJISDecoder = ShiftJISDecoder;
//# sourceMappingURL=ShiftJISDecoder.js.map