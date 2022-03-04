"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var finished_1 = require("../../encoding/finished");
var terminology_1 = require("../../encoding/terminology");
var utilities_1 = require("../../encoding/utilities");
var converCodeUnitToBytes_1 = require("./converCodeUnitToBytes");
/**
 * @constructor
 * @implements {Encoder}
 * @param {boolean} utf16_be True if big-endian, false if little-endian.
 * @param {{fatal: boolean}} options
 */
var UTF16Encoder = /** @class */ (function () {
    function UTF16Encoder(utf16_be, options) {
        this.utf16_be = utf16_be;
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    UTF16Encoder.prototype.handler = function (stream, code_point) {
        // 1. If code point is end-of-stream, return finished.
        if (code_point === terminology_1.end_of_stream)
            return finished_1.finished;
        // 2. If code point is in the range U+0000 to U+FFFF, inclusive,
        // return the sequence resulting of converting code point to
        // bytes using utf-16be encoder flag.
        if (utilities_1.inRange(code_point, 0x0000, 0xFFFF))
            return converCodeUnitToBytes_1.convertCodeUnitToBytes(code_point, this.utf16_be);
        // 3. Let lead be ((code point − 0x10000) >> 10) + 0xD800,
        // converted to bytes using utf-16be encoder flag.
        var lead = converCodeUnitToBytes_1.convertCodeUnitToBytes(((code_point - 0x10000) >> 10) + 0xD800, this.utf16_be);
        // 4. Let trail be ((code point − 0x10000) & 0x3FF) + 0xDC00,
        // converted to bytes using utf-16be encoder flag.
        var trail = converCodeUnitToBytes_1.convertCodeUnitToBytes(((code_point - 0x10000) & 0x3FF) + 0xDC00, this.utf16_be);
        // 5. Return a byte sequence of lead followed by trail.
        return lead.concat(trail);
    };
    return UTF16Encoder;
}());
exports.UTF16Encoder = UTF16Encoder;
//# sourceMappingURL=UTF16Encoder.js.map