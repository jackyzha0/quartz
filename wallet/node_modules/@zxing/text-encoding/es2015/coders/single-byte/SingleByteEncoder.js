import { encoderError } from "../../encoding/encodings";
import { finished } from "../../encoding/finished";
import { indexPointerFor } from "../../encoding/indexes";
import { end_of_stream, isASCIICodePoint } from "../../encoding/terminology";
/**
 * @constructor
 * @implements {Encoder}
 * @param {!Array.<?number>} index The encoding index.
 * @param {{fatal: boolean}} options
 */
export class SingleByteEncoder {
    constructor(index, options) {
        this.index = index;
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
        // 3. Let pointer be the index pointer for code point in index
        // single-byte.
        const pointer = indexPointerFor(code_point, this.index);
        // 4. If pointer is null, return error with code point.
        if (pointer === null)
            encoderError(code_point);
        // 5. Return a byte whose value is pointer + 0x80.
        return pointer + 0x80;
    }
}
//# sourceMappingURL=SingleByteEncoder.js.map