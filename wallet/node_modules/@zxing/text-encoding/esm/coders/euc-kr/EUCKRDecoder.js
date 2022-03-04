import { decoderError } from "../../encoding/encodings";
import { finished } from "../../encoding/finished";
import { index, indexCodePointFor } from "../../encoding/indexes";
import { end_of_stream, isASCIIByte } from "../../encoding/terminology";
import { inRange } from "../../encoding/utilities";
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
        if (bite === end_of_stream && this.euckr_lead !== 0) {
            this.euckr_lead = 0x00;
            return decoderError(this.fatal);
        }
        // 2. If byte is end-of-stream and euc-kr lead is 0x00, return
        // finished.
        if (bite === end_of_stream && this.euckr_lead === 0)
            return finished;
        // 3. If euc-kr lead is not 0x00, let lead be euc-kr lead, let
        // pointer be null, set euc-kr lead to 0x00, and then run these
        // substeps:
        if (this.euckr_lead !== 0x00) {
            var lead = this.euckr_lead;
            var pointer = null;
            this.euckr_lead = 0x00;
            // 1. If byte is in the range 0x41 to 0xFE, inclusive, set
            // pointer to (lead − 0x81) × 190 + (byte − 0x41).
            if (inRange(bite, 0x41, 0xFE))
                pointer = (lead - 0x81) * 190 + (bite - 0x41);
            // 2. Let code point be null, if pointer is null, and the
            // index code point for pointer in index euc-kr otherwise.
            var code_point = (pointer === null)
                ? null : indexCodePointFor(pointer, index('euc-kr'));
            // 3. If code point is null and byte is an ASCII byte, prepend
            // byte to stream.
            if (pointer === null && isASCIIByte(bite))
                stream.prepend(bite);
            // 4. If code point is null, return error.
            if (code_point === null)
                return decoderError(this.fatal);
            // 5. Return a code point whose value is code point.
            return code_point;
        }
        // 4. If byte is an ASCII byte, return a code point whose value
        // is byte.
        if (isASCIIByte(bite))
            return bite;
        // 5. If byte is in the range 0x81 to 0xFE, inclusive, set
        // euc-kr lead to byte and return continue.
        if (inRange(bite, 0x81, 0xFE)) {
            this.euckr_lead = bite;
            return null;
        }
        // 6. Return error.
        return decoderError(this.fatal);
    };
    return EUCKRDecoder;
}());
export { EUCKRDecoder };
//# sourceMappingURL=EUCKRDecoder.js.map