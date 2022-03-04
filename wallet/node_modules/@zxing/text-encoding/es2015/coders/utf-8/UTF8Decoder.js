import { decoderError } from "../../encoding/encodings";
import { finished } from "../../encoding/finished";
import { end_of_stream } from "../../encoding/terminology";
import { inRange } from "../../encoding/utilities";
/**
 * @constructor
 * @implements {Decoder}
 * @param {{fatal: boolean}} options
 */
export class UTF8Decoder {
    constructor(options) {
        this.fatal = options.fatal;
        // utf-8's decoder's has an associated utf-8 code point, utf-8
        // bytes seen, and utf-8 bytes needed (all initially 0), a utf-8
        // lower boundary (initially 0x80), and a utf-8 upper boundary
        // (initially 0xBF).
        /** @type {number} */ this.utf8_code_point = 0,
            /** @type {number} */ this.utf8_bytes_seen = 0,
            /** @type {number} */ this.utf8_bytes_needed = 0,
            /** @type {number} */ this.utf8_lower_boundary = 0x80,
            /** @type {number} */ this.utf8_upper_boundary = 0xBF;
    }
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    handler(stream, bite) {
        // 1. If byte is end-of-stream and utf-8 bytes needed is not 0,
        // set utf-8 bytes needed to 0 and return error.
        if (bite === end_of_stream && this.utf8_bytes_needed !== 0) {
            this.utf8_bytes_needed = 0;
            return decoderError(this.fatal);
        }
        // 2. If byte is end-of-stream, return finished.
        if (bite === end_of_stream)
            return finished;
        // 3. If utf-8 bytes needed is 0, based on byte:
        if (this.utf8_bytes_needed === 0) {
            // 0x00 to 0x7F
            if (inRange(bite, 0x00, 0x7F)) {
                // Return a code point whose value is byte.
                return bite;
            }
            // 0xC2 to 0xDF
            else if (inRange(bite, 0xC2, 0xDF)) {
                // 1. Set utf-8 bytes needed to 1.
                this.utf8_bytes_needed = 1;
                // 2. Set UTF-8 code point to byte & 0x1F.
                this.utf8_code_point = bite & 0x1F;
            }
            // 0xE0 to 0xEF
            else if (inRange(bite, 0xE0, 0xEF)) {
                // 1. If byte is 0xE0, set utf-8 lower boundary to 0xA0.
                if (bite === 0xE0)
                    this.utf8_lower_boundary = 0xA0;
                // 2. If byte is 0xED, set utf-8 upper boundary to 0x9F.
                if (bite === 0xED)
                    this.utf8_upper_boundary = 0x9F;
                // 3. Set utf-8 bytes needed to 2.
                this.utf8_bytes_needed = 2;
                // 4. Set UTF-8 code point to byte & 0xF.
                this.utf8_code_point = bite & 0xF;
            }
            // 0xF0 to 0xF4
            else if (inRange(bite, 0xF0, 0xF4)) {
                // 1. If byte is 0xF0, set utf-8 lower boundary to 0x90.
                if (bite === 0xF0)
                    this.utf8_lower_boundary = 0x90;
                // 2. If byte is 0xF4, set utf-8 upper boundary to 0x8F.
                if (bite === 0xF4)
                    this.utf8_upper_boundary = 0x8F;
                // 3. Set utf-8 bytes needed to 3.
                this.utf8_bytes_needed = 3;
                // 4. Set UTF-8 code point to byte & 0x7.
                this.utf8_code_point = bite & 0x7;
            }
            // Otherwise
            else {
                // Return error.
                return decoderError(this.fatal);
            }
            // Return continue.
            return null;
        }
        // 4. If byte is not in the range utf-8 lower boundary to utf-8
        // upper boundary, inclusive, run these substeps:
        if (!inRange(bite, this.utf8_lower_boundary, this.utf8_upper_boundary)) {
            // 1. Set utf-8 code point, utf-8 bytes needed, and utf-8
            // bytes seen to 0, set utf-8 lower boundary to 0x80, and set
            // utf-8 upper boundary to 0xBF.
            this.utf8_code_point = this.utf8_bytes_needed = this.utf8_bytes_seen = 0;
            this.utf8_lower_boundary = 0x80;
            this.utf8_upper_boundary = 0xBF;
            // 2. Prepend byte to stream.
            stream.prepend(bite);
            // 3. Return error.
            return decoderError(this.fatal);
        }
        // 5. Set utf-8 lower boundary to 0x80 and utf-8 upper boundary
        // to 0xBF.
        this.utf8_lower_boundary = 0x80;
        this.utf8_upper_boundary = 0xBF;
        // 6. Set UTF-8 code point to (UTF-8 code point << 6) | (byte &
        // 0x3F)
        this.utf8_code_point = (this.utf8_code_point << 6) | (bite & 0x3F);
        // 7. Increase utf-8 bytes seen by one.
        this.utf8_bytes_seen += 1;
        // 8. If utf-8 bytes seen is not equal to utf-8 bytes needed,
        // continue.
        if (this.utf8_bytes_seen !== this.utf8_bytes_needed)
            return null;
        // 9. Let code point be utf-8 code point.
        const code_point = this.utf8_code_point;
        // 10. Set utf-8 code point, utf-8 bytes needed, and utf-8 bytes
        // seen to 0.
        this.utf8_code_point = this.utf8_bytes_needed = this.utf8_bytes_seen = 0;
        // 11. Return a code point whose value is code point.
        return code_point;
    }
}
//# sourceMappingURL=UTF8Decoder.js.map