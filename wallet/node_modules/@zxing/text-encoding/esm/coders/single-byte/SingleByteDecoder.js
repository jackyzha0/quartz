import { decoderError } from "../../encoding/encodings";
import { finished } from "../../encoding/finished";
import { end_of_stream, isASCIIByte } from "../../encoding/terminology";
/**
 * @constructor
 * @implements {Decoder}
 * @param {!Array.<number>} index The encoding index.
 * @param {{fatal: boolean}} options
 */
var SingleByteDecoder = /** @class */ (function () {
    function SingleByteDecoder(index, options) {
        this.index = index;
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    SingleByteDecoder.prototype.handler = function (stream, bite) {
        // 1. If byte is end-of-stream, return finished.
        if (bite === end_of_stream)
            return finished;
        // 2. If byte is an ASCII byte, return a code point whose value
        // is byte.
        if (isASCIIByte(bite))
            return bite;
        // 3. Let code point be the index code point for byte − 0x80 in
        // index single-byte.
        var code_point = this.index[bite - 0x80];
        // 4. If code point is null, return error.
        if (!code_point)
            return decoderError(this.fatal);
        // 5. Return a code point whose value is code point.
        return code_point;
    };
    return SingleByteDecoder;
}());
export { SingleByteDecoder };
//# sourceMappingURL=SingleByteDecoder.js.map