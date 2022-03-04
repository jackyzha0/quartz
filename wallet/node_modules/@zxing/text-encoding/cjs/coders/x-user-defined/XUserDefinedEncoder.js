"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encodings_1 = require("../../encoding/encodings");
var finished_1 = require("../../encoding/finished");
var terminology_1 = require("../../encoding/terminology");
var utilities_1 = require("../../encoding/utilities");
/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 */
var XUserDefinedEncoder = /** @class */ (function () {
    function XUserDefinedEncoder(options) {
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    XUserDefinedEncoder.prototype.handler = function (stream, code_point) {
        // 1.If code point is end-of-stream, return finished.
        if (code_point === terminology_1.end_of_stream)
            return finished_1.finished;
        // 2. If code point is an ASCII code point, return a byte whose
        // value is code point.
        if (terminology_1.isASCIICodePoint(code_point))
            return code_point;
        // 3. If code point is in the range U+F780 to U+F7FF, inclusive,
        // return a byte whose value is code point − 0xF780 + 0x80.
        if (utilities_1.inRange(code_point, 0xF780, 0xF7FF))
            return code_point - 0xF780 + 0x80;
        // 4. Return error with code point.
        return encodings_1.encoderError(code_point);
    };
    return XUserDefinedEncoder;
}());
exports.XUserDefinedEncoder = XUserDefinedEncoder;
//# sourceMappingURL=XUserDefinedEncoder.js.map