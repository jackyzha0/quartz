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
var EUCKREncoder = /** @class */ (function () {
    function EUCKREncoder(options) {
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    EUCKREncoder.prototype.handler = function (stream, code_point) {
        // 1. If code point is end-of-stream, return finished.
        if (code_point === terminology_1.end_of_stream)
            return finished_1.finished;
        // 2. If code point is an ASCII code point, return a byte whose
        // value is code point.
        if (terminology_1.isASCIICodePoint(code_point))
            return code_point;
        // 3. Let pointer be the index pointer for code point in index
        // euc-kr.
        var pointer = indexes_1.indexPointerFor(code_point, indexes_1.index('euc-kr'));
        // 4. If pointer is null, return error with code point.
        if (pointer === null)
            return encodings_1.encoderError(code_point);
        // 5. Let lead be Math.floor(pointer / 190) + 0x81.
        var lead = Math.floor(pointer / 190) + 0x81;
        // 6. Let trail be pointer % 190 + 0x41.
        var trail = (pointer % 190) + 0x41;
        // 7. Return two bytes whose values are lead and trail.
        return [lead, trail];
    };
    return EUCKREncoder;
}());
exports.EUCKREncoder = EUCKREncoder;
//# sourceMappingURL=EUCKREncoder.js.map