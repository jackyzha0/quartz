import { encoderError } from "../../encoding/encodings";
import { finished } from "../../encoding/finished";
import { index, indexPointerFor } from "../../encoding/indexes";
import { end_of_stream, isASCIICodePoint } from "../../encoding/terminology";
/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 */
var EUCKREncoder = /** @class */ (function () {
    function EUCKREncoder(options) {
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    EUCKREncoder.prototype.handler = function (stream, code_point) {
        // 1. If code point is end-of-stream, return finished.
        if (code_point === end_of_stream)
            return finished;
        // 2. If code point is an ASCII code point, return a byte whose
        // value is code point.
        if (isASCIICodePoint(code_point))
            return code_point;
        // 3. Let pointer be the index pointer for code point in index
        // euc-kr.
        var pointer = indexPointerFor(code_point, index('euc-kr'));
        // 4. If pointer is null, return error with code point.
        if (pointer === null)
            return encoderError(code_point);
        // 5. Let lead be Math.floor(pointer / 190) + 0x81.
        var lead = Math.floor(pointer / 190) + 0x81;
        // 6. Let trail be pointer % 190 + 0x41.
        var trail = (pointer % 190) + 0x41;
        // 7. Return two bytes whose values are lead and trail.
        return [lead, trail];
    };
    return EUCKREncoder;
}());
export { EUCKREncoder };
//# sourceMappingURL=EUCKREncoder.js.map