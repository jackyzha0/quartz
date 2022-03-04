import { encoderError } from "../../encoding/encodings";
import { finished } from "../../encoding/finished";
import { index, indexGB18030RangesPointerFor, indexPointerFor } from "../../encoding/indexes";
import { end_of_stream, isASCIICodePoint } from "../../encoding/terminology";
/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 * @param {boolean=} gbk_flag
 */
export class GB18030Encoder {
    constructor(options, gbk_flag = undefined) {
        this.gbk_flag = gbk_flag;
        this.fatal = options.fatal;
        // gb18030's decoder has an associated gbk flag (initially unset).
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    handler(stream, code_point) {
        // 1. If code point is end-of-stream, return finished.
        if (code_point === end_of_stream)
            return finished;
        // 2. If code point is an ASCII code point, return a byte whose
        // value is code point.
        if (isASCIICodePoint(code_point))
            return code_point;
        // 3. If code point is U+E5E5, return error with code point.
        if (code_point === 0xE5E5)
            return encoderError(code_point);
        // 4. If the gbk flag is set and code point is U+20AC, return
        // byte 0x80.
        if (this.gbk_flag && code_point === 0x20AC)
            return 0x80;
        // 5. Let pointer be the index pointer for code point in index
        // gb18030.
        let pointer = indexPointerFor(code_point, index('gb18030'));
        // 6. If pointer is not null, run these substeps:
        if (pointer !== null) {
            // 1. Let lead be Math.floor(pointer / 190) + 0x81.
            const lead = Math.floor(pointer / 190) + 0x81;
            // 2. Let trail be pointer % 190.
            const trail = pointer % 190;
            // 3. Let offset be 0x40 if trail is less than 0x3F and 0x41 otherwise.
            const offset = trail < 0x3F ? 0x40 : 0x41;
            // 4. Return two bytes whose values are lead and trail + offset.
            return [lead, trail + offset];
        }
        // 7. If gbk flag is set, return error with code point.
        if (this.gbk_flag)
            return encoderError(code_point);
        // 8. Set pointer to the index gb18030 ranges pointer for code
        // point.
        pointer = indexGB18030RangesPointerFor(code_point);
        // 9. Let byte1 be Math.floor(pointer / 10 / 126 / 10).
        const byte1 = Math.floor(pointer / 10 / 126 / 10);
        // 10. Set pointer to pointer − byte1 × 10 × 126 × 10.
        pointer = pointer - byte1 * 10 * 126 * 10;
        // 11. Let byte2 be Math.floor(pointer / 10 / 126).
        const byte2 = Math.floor(pointer / 10 / 126);
        // 12. Set pointer to pointer − byte2 × 10 × 126.
        pointer = pointer - byte2 * 10 * 126;
        // 13. Let byte3 be Math.floor(pointer / 10).
        const byte3 = Math.floor(pointer / 10);
        // 14. Let byte4 be pointer − byte3 × 10.
        const byte4 = pointer - byte3 * 10;
        // 15. Return four bytes whose values are byte1 + 0x81, byte2 +
        // 0x30, byte3 + 0x81, byte4 + 0x30.
        return [byte1 + 0x81,
            byte2 + 0x30,
            byte3 + 0x81,
            byte4 + 0x30];
    }
}
//# sourceMappingURL=GB18030Encoder.js.map