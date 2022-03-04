import { finished } from "../../encoding/finished";
import { end_of_stream, isASCIICodePoint } from "../../encoding/terminology";
import { inRange } from "../../encoding/utilities";
/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 */
export class UTF8Encoder {
    constructor(options) {
        this.fatal = options.fatal;
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
        // 3. Set count and offset based on the range code point is in:
        let count, offset;
        // U+0080 to U+07FF, inclusive:
        if (inRange(code_point, 0x0080, 0x07FF)) {
            // 1 and 0xC0
            count = 1;
            offset = 0xC0;
        }
        // U+0800 to U+FFFF, inclusive:
        else if (inRange(code_point, 0x0800, 0xFFFF)) {
            // 2 and 0xE0
            count = 2;
            offset = 0xE0;
        }
        // U+10000 to U+10FFFF, inclusive:
        else if (inRange(code_point, 0x10000, 0x10FFFF)) {
            // 3 and 0xF0
            count = 3;
            offset = 0xF0;
        }
        // 4. Let bytes be a byte sequence whose first byte is (code
        // point >> (6 × count)) + offset.
        const bytes = [(code_point >> (6 * count)) + offset];
        // 5. Run these substeps while count is greater than 0:
        while (count > 0) {
            // 1. Set temp to code point >> (6 × (count − 1)).
            const temp = code_point >> (6 * (count - 1));
            // 2. Append to bytes 0x80 | (temp & 0x3F).
            bytes.push(0x80 | (temp & 0x3F));
            // 3. Decrease count by one.
            count -= 1;
        }
        // 6. Return bytes bytes, in order.
        return bytes;
    }
}
//# sourceMappingURL=UTF8Encoder.js.map