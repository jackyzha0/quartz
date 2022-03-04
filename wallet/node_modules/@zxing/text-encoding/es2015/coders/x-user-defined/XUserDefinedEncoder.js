import { encoderError } from "../../encoding/encodings";
import { finished } from "../../encoding/finished";
import { end_of_stream, isASCIICodePoint } from "../../encoding/terminology";
import { inRange } from "../../encoding/utilities";
/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 */
export class XUserDefinedEncoder {
    constructor(options) {
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    handler(stream, code_point) {
        // 1.If code point is end-of-stream, return finished.
        if (code_point === end_of_stream)
            return finished;
        // 2. If code point is an ASCII code point, return a byte whose
        // value is code point.
        if (isASCIICodePoint(code_point))
            return code_point;
        // 3. If code point is in the range U+F780 to U+F7FF, inclusive,
        // return a byte whose value is code point − 0xF780 + 0x80.
        if (inRange(code_point, 0xF780, 0xF7FF))
            return code_point - 0xF780 + 0x80;
        // 4. Return error with code point.
        return encoderError(code_point);
    }
}
//# sourceMappingURL=XUserDefinedEncoder.js.map