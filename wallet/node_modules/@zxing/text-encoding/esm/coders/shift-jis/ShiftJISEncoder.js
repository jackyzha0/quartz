import { encoderError } from "../../encoding/encodings";
import { finished } from "../../encoding/finished";
import { indexShiftJISPointerFor } from "../../encoding/indexes";
import { end_of_stream, isASCIICodePoint } from "../../encoding/terminology";
import { inRange } from "../../encoding/utilities";
/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 */
var ShiftJISEncoder = /** @class */ (function () {
    function ShiftJISEncoder(options) {
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    ShiftJISEncoder.prototype.handler = function (stream, code_point) {
        // 1. If code point is end-of-stream, return finished.
        if (code_point === end_of_stream)
            return finished;
        // 2. If code point is an ASCII code point or U+0080, return a
        // byte whose value is code point.
        if (isASCIICodePoint(code_point) || code_point === 0x0080)
            return code_point;
        // 3. If code point is U+00A5, return byte 0x5C.
        if (code_point === 0x00A5)
            return 0x5C;
        // 4. If code point is U+203E, return byte 0x7E.
        if (code_point === 0x203E)
            return 0x7E;
        // 5. If code point is in the range U+FF61 to U+FF9F, inclusive,
        // return a byte whose value is code point − 0xFF61 + 0xA1.
        if (inRange(code_point, 0xFF61, 0xFF9F))
            return code_point - 0xFF61 + 0xA1;
        // 6. If code point is U+2212, set it to U+FF0D.
        if (code_point === 0x2212)
            code_point = 0xFF0D;
        // 7. Let pointer be the index Shift_JIS pointer for code point.
        var pointer = indexShiftJISPointerFor(code_point);
        // 8. If pointer is null, return error with code point.
        if (pointer === null)
            return encoderError(code_point);
        // 9. Let lead be Math.floor(pointer / 188).
        var lead = Math.floor(pointer / 188);
        // 10. Let lead offset be 0x81, if lead is less than 0x1F, and
        // 0xC1 otherwise.
        var lead_offset = (lead < 0x1F) ? 0x81 : 0xC1;
        // 11. Let trail be pointer % 188.
        var trail = pointer % 188;
        // 12. Let offset be 0x40, if trail is less than 0x3F, and 0x41
        // otherwise.
        var offset = (trail < 0x3F) ? 0x40 : 0x41;
        // 13. Return two bytes whose values are lead + lead offset and
        // trail + offset.
        return [lead + lead_offset, trail + offset];
    };
    return ShiftJISEncoder;
}());
export { ShiftJISEncoder };
//# sourceMappingURL=ShiftJISEncoder.js.map