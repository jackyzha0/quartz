"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var finished_1 = require("../../encoding/finished");
var terminology_1 = require("../../encoding/terminology");
var utilities_1 = require("../../encoding/utilities");
/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 */
var UTF8Encoder = /** @class */ (function () {
    function UTF8Encoder(options) {
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    UTF8Encoder.prototype.handler = function (stream, code_point) {
        // 1. If code point is end-of-stream, return finished.
        if (code_point === terminology_1.end_of_stream)
            return finished_1.finished;
        // 2. If code point is an ASCII code point, return a byte whose
        // value is code point.
        if (terminology_1.isASCIICodePoint(code_point))
            return code_point;
        // 3. Set count and offset based on the range code point is in:
        var count, offset;
        // U+0080 to U+07FF, inclusive:
        if (utilities_1.inRange(code_point, 0x0080, 0x07FF)) {
            // 1 and 0xC0
            count = 1;
            offset = 0xC0;
        }
        // U+0800 to U+FFFF, inclusive:
        else if (utilities_1.inRange(code_point, 0x0800, 0xFFFF)) {
            // 2 and 0xE0
            count = 2;
            offset = 0xE0;
        }
        // U+10000 to U+10FFFF, inclusive:
        else if (utilities_1.inRange(code_point, 0x10000, 0x10FFFF)) {
            // 3 and 0xF0
            count = 3;
            offset = 0xF0;
        }
        // 4. Let bytes be a byte sequence whose first byte is (code
        // point >> (6 × count)) + offset.
        var bytes = [(code_point >> (6 * count)) + offset];
        // 5. Run these substeps while count is greater than 0:
        while (count > 0) {
            // 1. Set temp to code point >> (6 × (count − 1)).
            var temp = code_point >> (6 * (count - 1));
            // 2. Append to bytes 0x80 | (temp & 0x3F).
            bytes.push(0x80 | (temp & 0x3F));
            // 3. Decrease count by one.
            count -= 1;
        }
        // 6. Return bytes bytes, in order.
        return bytes;
    };
    return UTF8Encoder;
}());
exports.UTF8Encoder = UTF8Encoder;
//# sourceMappingURL=UTF8Encoder.js.map