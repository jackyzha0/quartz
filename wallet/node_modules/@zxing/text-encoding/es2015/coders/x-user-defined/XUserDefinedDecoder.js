import { finished } from "../../encoding/finished";
import { end_of_stream, isASCIIByte } from "../../encoding/terminology";
/**
 * @constructor
 * @implements {Decoder}
 * @param {{fatal: boolean}} options
 */
export class XUserDefinedDecoder {
    constructor(options) {
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    handler(stream, bite) {
        // 1. If byte is end-of-stream, return finished.
        if (bite === end_of_stream)
            return finished;
        // 2. If byte is an ASCII byte, return a code point whose value
        // is byte.
        if (isASCIIByte(bite))
            return bite;
        // 3. Return a code point whose value is 0xF780 + byte − 0x80.
        return 0xF780 + bite - 0x80;
    }
}
//# sourceMappingURL=XUserDefinedDecoder.js.map