"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encodings_1 = require("../../encoding/encodings");
var finished_1 = require("../../encoding/finished");
var indexes_1 = require("../../encoding/indexes");
var terminology_1 = require("../../encoding/terminology");
/**
 * @constructor
 * @implements {Encoder}
 * @param {!Array.<?number>} index The encoding index.
 * @param {{fatal: boolean}} options
 */
var SingleByteEncoder = /** @class */ (function () {
    function SingleByteEncoder(index, options) {
        this.index = index;
        this.fatal = options.fatal;
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    SingleByteEncoder.prototype.handler = function (stream, code_point) {
        // 1. If code point is end-of-stream, return finished.
        if (code_point === terminology_1.end_of_stream)
            return finished_1.finished;
        // 2. If code point is an ASCII code point, return a byte whose
        // value is code point.
        if (terminology_1.isASCIICodePoint(code_point))
            return code_point;
        // 3. Let pointer be the index pointer for code point in index
        // single-byte.
        var pointer = indexes_1.indexPointerFor(code_point, this.index);
        // 4. If pointer is null, return error with code point.
        if (pointer === null)
            encodings_1.encoderError(code_point);
        // 5. Return a byte whose value is pointer + 0x80.
        return pointer + 0x80;
    };
    return SingleByteEncoder;
}());
exports.SingleByteEncoder = SingleByteEncoder;
//# sourceMappingURL=SingleByteEncoder.js.map