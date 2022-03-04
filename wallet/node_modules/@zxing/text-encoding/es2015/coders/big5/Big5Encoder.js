import { encoderError } from "../../encoding/encodings";
import { finished } from "../../encoding/finished";
import { indexBig5PointerFor } from "../../encoding/indexes";
import { end_of_stream, isASCIICodePoint } from "../../encoding/terminology";
/**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
export class Big5Encoder {
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
        // 3. Let pointer be the index Big5 pointer for code point.
        const pointer = indexBig5PointerFor(code_point);
        // 4. If pointer is null, return error with code point.
        if (pointer === null)
            return encoderError(code_point);
        // 5. Let lead be Math.floor(pointer / 157) + 0x81.
        const lead = Math.floor(pointer / 157) + 0x81;
        // 6. If lead is less than 0xA1, return error with code point.
        if (lead < 0xA1)
            return encoderError(code_point);
        // 7. Let trail be pointer % 157.
        const trail = pointer % 157;
        // 8. Let offset be 0x40 if trail is less than 0x3F and 0x62
        // otherwise.
        const offset = trail < 0x3F ? 0x40 : 0x62;
        // Return two bytes whose values are lead and trail + offset.
        return [lead, trail + offset];
    }
}
//# sourceMappingURL=Big5Encoder.js.map