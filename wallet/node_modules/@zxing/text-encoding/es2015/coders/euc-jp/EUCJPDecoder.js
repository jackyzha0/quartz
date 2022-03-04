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
export class EUCJPDecoder {
    constructor(options) {
        this.fatal = options.fatal;
        // euc-jp's decoder has an associated euc-jp jis0212 flag
        // (initially unset) and euc-jp lead (initially 0x00).
        /** @type {boolean} */ this.eucjp_jis0212_flag = false,
            /** @type {number} */ this.eucjp_lead = 0x00;
    }
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    handler(stream, bite) {
        // 1. If byte is end-of-stream and euc-jp lead is not 0x00, set
        // euc-jp lead to 0x00, and return error.
        if (bite === end_of_stream && this.eucjp_lead !== 0x00) {
            this.eucjp_lead = 0x00;
            return decoderError(this.fatal);
        }
        // 2. If byte is end-of-stream and euc-jp lead is 0x00, return
        // finished.
        if (bite === end_of_stream && this.eucjp_lead === 0x00)
            return finished;
        // 3. If euc-jp lead is 0x8E and byte is in the range 0xA1 to
        // 0xDF, inclusive, set euc-jp lead to 0x00 and return a code
        // point whose value is 0xFF61 − 0xA1 + byte.
        if (this.eucjp_lead === 0x8E && inRange(bite, 0xA1, 0xDF)) {
            this.eucjp_lead = 0x00;
            return 0xFF61 - 0xA1 + bite;
        }
        // 4. If euc-jp lead is 0x8F and byte is in the range 0xA1 to
        // 0xFE, inclusive, set the euc-jp jis0212 flag, set euc-jp lead
        // to byte, and return continue.
        if (this.eucjp_lead === 0x8F && inRange(bite, 0xA1, 0xFE)) {
            this.eucjp_jis0212_flag = true;
            this.eucjp_lead = bite;
            return null;
        }
        // 5. If euc-jp lead is not 0x00, let lead be euc-jp lead, set
        // euc-jp lead to 0x00, and run these substeps:
        if (this.eucjp_lead !== 0x00) {
            const lead = this.eucjp_lead;
            this.eucjp_lead = 0x00;
            // 1. Let code point be null.
            let code_point = null;
            // 2. If lead and byte are both in the range 0xA1 to 0xFE,
            // inclusive, set code point to the index code point for (lead
            // − 0xA1) × 94 + byte − 0xA1 in index jis0208 if the euc-jp
            // jis0212 flag is unset and in index jis0212 otherwise.
            if (inRange(lead, 0xA1, 0xFE) && inRange(bite, 0xA1, 0xFE)) {
                code_point = indexCodePointFor((lead - 0xA1) * 94 + (bite - 0xA1), index(!this.eucjp_jis0212_flag ? 'jis0208' : 'jis0212'));
            }
            // 3. Unset the euc-jp jis0212 flag.
            this.eucjp_jis0212_flag = false;
            // 4. If byte is not in the range 0xA1 to 0xFE, inclusive,
            // prepend byte to stream.
            if (!inRange(bite, 0xA1, 0xFE))
                stream.prepend(bite);
            // 5. If code point is null, return error.
            if (code_point === null)
                return decoderError(this.fatal);
            // 6. Return a code point whose value is code point.
            return code_point;
        }
        // 6. If byte is an ASCII byte, return a code point whose value
        // is byte.
        if (isASCIIByte(bite))
            return bite;
        // 7. If byte is 0x8E, 0x8F, or in the range 0xA1 to 0xFE,
        // inclusive, set euc-jp lead to byte and return continue.
        if (bite === 0x8E || bite === 0x8F || inRange(bite, 0xA1, 0xFE)) {
            this.eucjp_lead = bite;
            return null;
        }
        // 8. Return error.
        return decoderError(this.fatal);
    }
}
//# sourceMappingURL=EUCJPDecoder.js.map