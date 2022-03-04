"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encodings_1 = require("../../encoding/encodings");
var finished_1 = require("../../encoding/finished");
var indexes_1 = require("../../encoding/indexes");
var terminology_1 = require("../../encoding/terminology");
/**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
var Big5Encoder = /** @class */ (function () {
    function Big5Encoder(options) {
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    Big5Encoder.prototype.handler = function (stream, code_point) {
        // 1. If code point is end-of-stream, return finished.
        if (code_point === terminology_1.end_of_stream)
            return finished_1.finished;
        // 2. If code point is an ASCII code point, return a byte whose
        // value is code point.
        if (terminology_1.isASCIICodePoint(code_point))
            return code_point;
        // 3. Let pointer be the index Big5 pointer for code point.
        var pointer = indexes_1.indexBig5PointerFor(code_point);
        // 4. If pointer is null, return error with code point.
        if (pointer === null)
            return encodings_1.encoderError(code_point);
        // 5. Let lead be Math.floor(pointer / 157) + 0x81.
        var lead = Math.floor(pointer / 157) + 0x81;
        // 6. If lead is less than 0xA1, return error with code point.
        if (lead < 0xA1)
            return encodings_1.encoderError(code_point);
        // 7. Let trail be pointer % 157.
        var trail = pointer % 157;
        // 8. Let offset be 0x40 if trail is less than 0x3F and 0x62
        // otherwise.
        var offset = trail < 0x3F ? 0x40 : 0x62;
        // Return two bytes whose values are lead and trail + offset.
        return [lead, trail + offset];
    };
    return Big5Encoder;
}());
exports.Big5Encoder = Big5Encoder;
//# sourceMappingURL=Big5Encoder.js.map