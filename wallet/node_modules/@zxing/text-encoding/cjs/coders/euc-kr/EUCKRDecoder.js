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
var EUCKRDecoder = /** @class */ (function () {
    function EUCKRDecoder(options) {
        this.fatal = options.fatal;
        // euc-kr's decoder has an associated euc-kr lead (initially 0x00).
        /** @type {number} */ this.euckr_lead = 0x00;
    }
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    EUCKRDecoder.prototype.handler = function (stream, bite) {
        // 1. If byte is end-of-stream and euc-kr lead is not 0x00, set
        // euc-kr lead to 0x00 and return error.
        if (bite === terminology_1.end_of_stream && this.euckr_lead !== 0) {
            this.euckr_lead = 0x00;
            return encodings_1.decoderError(this.fatal);
        }
        // 2. If byte is end-of-stream and euc-kr lead is 0x00, return
        // finished.
        if (bite === terminology_1.end_of_stream && this.euckr_lead === 0)
            return finished_1.finished;
        // 3. If euc-kr lead is not 0x00, let lead be euc-kr lead, let
        // pointer be null, set euc-kr lead to 0x00, and then run these
        // substeps:
        if (this.euckr_lead !== 0x00) {
            var lead = this.euckr_lead;
            var pointer = null;
            this.euckr_lead = 0x00;
            // 1. If byte is in the range 0x41 to 0xFE, inclusive, set
            // pointer to (lead − 0x81) × 190 + (byte − 0x41).
            if (utilities_1.inRange(bite, 0x41, 0xFE))
                pointer = (lead - 0x81) * 190 + (bite - 0x41);
            // 2. Let code point be null, if pointer is null, and the
            // index code point for pointer in index euc-kr otherwise.
            var code_point = (pointer === null)
                ? null : indexes_1.indexCodePointFor(pointer, indexes_1.index('euc-kr'));
            // 3. If code point is null and byte is an ASCII byte, prepend
            // byte to stream.
            if (pointer === null && terminology_1.isASCIIByte(bite))
                stream.prepend(bite);
            // 4. If code point is null, return error.
            if (code_point === null)
                return encodings_1.decoderError(this.fatal);
            // 5. Return a code point whose value is code point.
            return code_point;
        }
        // 4. If byte is an ASCII byte, return a code point whose value
        // is byte.
        if (terminology_1.isASCIIByte(bite))
            return bite;
        // 5. If byte is in the range 0x81 to 0xFE, inclusive, set
        // euc-kr lead to byte and return continue.
        if (utilities_1.inRange(bite, 0x81, 0xFE)) {
            this.euckr_lead = bite;
            return null;
        }
        // 6. Return error.
        return encodings_1.decoderError(this.fatal);
    };
    return EUCKRDecoder;
}());
exports.EUCKRDecoder = EUCKRDecoder;
//# sourceMappingURL=EUCKRDecoder.js.map