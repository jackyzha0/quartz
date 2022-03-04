"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var finished_1 = require("../../encoding/finished");
var terminology_1 = require("../../encoding/terminology");
/**
 * @constructor
 * @implements {Decoder}
 * @param {{fatal: boolean}} options
 */
var XUserDefinedDecoder = /** @class */ (function () {
    function XUserDefinedDecoder(options) {
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    XUserDefinedDecoder.prototype.handler = function (stream, bite) {
        // 1. If byte is end-of-stream, return finished.
        if (bite === terminology_1.end_of_stream)
            return finished_1.finished;
        // 2. If byte is an ASCII byte, return a code point whose value
        // is byte.
        if (terminology_1.isASCIIByte(bite))
            return bite;
        // 3. Return a code point whose value is 0xF780 + byte − 0x80.
        return 0xF780 + bite - 0x80;
    };
    return XUserDefinedDecoder;
}());
exports.XUserDefinedDecoder = XUserDefinedDecoder;
//# sourceMappingURL=XUserDefinedDecoder.js.map