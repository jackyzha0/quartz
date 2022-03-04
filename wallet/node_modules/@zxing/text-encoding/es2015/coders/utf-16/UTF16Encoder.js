import { finished } from "../../encoding/finished";
import { end_of_stream } from "../../encoding/terminology";
import { inRange } from "../../encoding/utilities";
import { convertCodeUnitToBytes } from "./converCodeUnitToBytes";
/**
 * @constructor
 * @implements {Encoder}
 * @param {boolean} utf16_be True if big-endian, false if little-endian.
 * @param {{fatal: boolean}} options
 */
export class UTF16Encoder {
    constructor(utf16_be, options) {
        this.utf16_be = utf16_be;
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
        // 2. If code point is in the range U+0000 to U+FFFF, inclusive,
        // return the sequence resulting of converting code point to
        // bytes using utf-16be encoder flag.
        if (inRange(code_point, 0x0000, 0xFFFF))
            return convertCodeUnitToBytes(code_point, this.utf16_be);
        // 3. Let lead be ((code point − 0x10000) >> 10) + 0xD800,
        // converted to bytes using utf-16be encoder flag.
        const lead = convertCodeUnitToBytes(((code_point - 0x10000) >> 10) + 0xD800, this.utf16_be);
        // 4. Let trail be ((code point − 0x10000) & 0x3FF) + 0xDC00,
        // converted to bytes using utf-16be encoder flag.
        const trail = convertCodeUnitToBytes(((code_point - 0x10000) & 0x3FF) + 0xDC00, this.utf16_be);
        // 5. Return a byte sequence of lead followed by trail.
        return lead.concat(trail);
    }
}
//# sourceMappingURL=UTF16Encoder.js.map