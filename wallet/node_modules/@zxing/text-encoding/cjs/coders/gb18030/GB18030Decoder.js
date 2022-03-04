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
var GB18030Decoder = /** @class */ (function () {
    function GB18030Decoder(options) {
        this.fatal = options.fatal;
        // gb18030's decoder has an associated gb18030 first, gb18030
        // second, and gb18030 third (all initially 0x00).
        /** @type {number} */ this.gb18030_first = 0x00,
            /** @type {number} */ this.gb18030_second = 0x00,
            /** @type {number} */ this.gb18030_third = 0x00;
    }
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    GB18030Decoder.prototype.handler = function (stream, bite) {
        // 1. If byte is end-of-stream and gb18030 first, gb18030
        // second, and gb18030 third are 0x00, return finished.
        if (bite === terminology_1.end_of_stream && this.gb18030_first === 0x00 &&
            this.gb18030_second === 0x00 && this.gb18030_third === 0x00) {
            return finished_1.finished;
        }
        // 2. If byte is end-of-stream, and gb18030 first, gb18030
        // second, or gb18030 third is not 0x00, set gb18030 first,
        // gb18030 second, and gb18030 third to 0x00, and return error.
        if (bite === terminology_1.end_of_stream &&
            (this.gb18030_first !== 0x00 || this.gb18030_second !== 0x00 ||
                this.gb18030_third !== 0x00)) {
            this.gb18030_first = 0x00;
            this.gb18030_second = 0x00;
            this.gb18030_third = 0x00;
            encodings_1.decoderError(this.fatal);
        }
        var code_point;
        // 3. If gb18030 third is not 0x00, run these substeps:
        if (this.gb18030_third !== 0x00) {
            // 1. Let code point be null.
            code_point = null;
            // 2. If byte is in the range 0x30 to 0x39, inclusive, set
            // code point to the index gb18030 ranges code point for
            // (((gb18030 first − 0x81) × 10 + gb18030 second − 0x30) ×
            // 126 + gb18030 third − 0x81) × 10 + byte − 0x30.
            if (utilities_1.inRange(bite, 0x30, 0x39)) {
                code_point = indexes_1.indexGB18030RangesCodePointFor((((this.gb18030_first - 0x81) * 10 + this.gb18030_second - 0x30) * 126 +
                    this.gb18030_third - 0x81) * 10 + bite - 0x30);
            }
            // 3. Let buffer be a byte sequence consisting of gb18030
            // second, gb18030 third, and byte, in order.
            var buffer = [this.gb18030_second, this.gb18030_third, bite];
            // 4. Set gb18030 first, gb18030 second, and gb18030 third to
            // 0x00.
            this.gb18030_first = 0x00;
            this.gb18030_second = 0x00;
            this.gb18030_third = 0x00;
            // 5. If code point is null, prepend buffer to stream and
            // return error.
            if (code_point === null) {
                stream.prepend(buffer);
                return encodings_1.decoderError(this.fatal);
            }
            // 6. Return a code point whose value is code point.
            return code_point;
        }
        // 4. If gb18030 second is not 0x00, run these substeps:
        if (this.gb18030_second !== 0x00) {
            // 1. If byte is in the range 0x81 to 0xFE, inclusive, set
            // gb18030 third to byte and return continue.
            if (utilities_1.inRange(bite, 0x81, 0xFE)) {
                this.gb18030_third = bite;
                return null;
            }
            // 2. Prepend gb18030 second followed by byte to stream, set
            // gb18030 first and gb18030 second to 0x00, and return error.
            stream.prepend([this.gb18030_second, bite]);
            this.gb18030_first = 0x00;
            this.gb18030_second = 0x00;
            return encodings_1.decoderError(this.fatal);
        }
        // 5. If gb18030 first is not 0x00, run these substeps:
        if (this.gb18030_first !== 0x00) {
            // 1. If byte is in the range 0x30 to 0x39, inclusive, set
            // gb18030 second to byte and return continue.
            if (utilities_1.inRange(bite, 0x30, 0x39)) {
                this.gb18030_second = bite;
                return null;
            }
            // 2. Let lead be gb18030 first, let pointer be null, and set
            // gb18030 first to 0x00.
            var lead = this.gb18030_first;
            var pointer = null;
            this.gb18030_first = 0x00;
            // 3. Let offset be 0x40 if byte is less than 0x7F and 0x41
            // otherwise.
            var offset = bite < 0x7F ? 0x40 : 0x41;
            // 4. If byte is in the range 0x40 to 0x7E, inclusive, or 0x80
            // to 0xFE, inclusive, set pointer to (lead − 0x81) × 190 +
            // (byte − offset).
            if (utilities_1.inRange(bite, 0x40, 0x7E) || utilities_1.inRange(bite, 0x80, 0xFE))
                pointer = (lead - 0x81) * 190 + (bite - offset);
            // 5. Let code point be null if pointer is null and the index
            // code point for pointer in index gb18030 otherwise.
            code_point = pointer === null ? null :
                indexes_1.indexCodePointFor(pointer, indexes_1.index('gb18030'));
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
        // 6. If byte is an ASCII byte, return a code point whose value
        // is byte.
        if (terminology_1.isASCIIByte(bite))
            return bite;
        // 7. If byte is 0x80, return code point U+20AC.
        if (bite === 0x80)
            return 0x20AC;
        // 8. If byte is in the range 0x81 to 0xFE, inclusive, set
        // gb18030 first to byte and return continue.
        if (utilities_1.inRange(bite, 0x81, 0xFE)) {
            this.gb18030_first = bite;
            return null;
        }
        // 9. Return error.
        return encodings_1.decoderError(this.fatal);
    };
    return GB18030Decoder;
}());
exports.GB18030Decoder = GB18030Decoder;
//# sourceMappingURL=GB18030Decoder.js.map