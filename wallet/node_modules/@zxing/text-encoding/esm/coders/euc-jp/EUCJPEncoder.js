import { encoderError } from "../../encoding/encodings";
import { finished } from "../../encoding/finished";
import { index, indexPointerFor } from "../../encoding/indexes";
import { end_of_stream, isASCIICodePoint } from "../../encoding/terminology";
import { inRange } from "../../encoding/utilities";
/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 */
var EUCJPEncoder = /** @class */ (function () {
    function EUCJPEncoder(options) {
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    EUCJPEncoder.prototype.handler = function (stream, code_point) {
        // 1. If code point is end-of-stream, return finished.
        if (code_point === end_of_stream)
            return finished;
        // 2. If code point is an ASCII code point, return a byte whose
        // value is code point.
        if (isASCIICodePoint(code_point))
            return code_point;
        // 3. If code point is U+00A5, return byte 0x5C.
        if (code_point === 0x00A5)
            return 0x5C;
        // 4. If code point is U+203E, return byte 0x7E.
        if (code_point === 0x203E)
            return 0x7E;
        // 5. If code point is in the range U+FF61 to U+FF9F, inclusive,
        // return two bytes whose values are 0x8E and code point −
        // 0xFF61 + 0xA1.
        if (inRange(code_point, 0xFF61, 0xFF9F))
            return [0x8E, code_point - 0xFF61 + 0xA1];
        // 6. If code point is U+2212, set it to U+FF0D.
        if (code_point === 0x2212)
            code_point = 0xFF0D;
        // 7. Let pointer be the index pointer for code point in index
        // jis0208.
        var pointer = indexPointerFor(code_point, index('jis0208'));
        // 8. If pointer is null, return error with code point.
        if (pointer === null)
            return encoderError(code_point);
        // 9. Let lead be Math.floor(pointer / 94) + 0xA1.
        var lead = Math.floor(pointer / 94) + 0xA1;
        // 10. Let trail be pointer % 94 + 0xA1.
        var trail = pointer % 94 + 0xA1;
        // 11. Return two bytes whose values are lead and trail.
        return [lead, trail];
    };
    return EUCJPEncoder;
}());
export { EUCJPEncoder };
//# sourceMappingURL=EUCJPEncoder.js.map