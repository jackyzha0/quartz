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
 * @param {boolean=} gbk_flag
 */
var GB18030Encoder = /** @class */ (function () {
    function GB18030Encoder(options, gbk_flag) {
        if (gbk_flag === void 0) { gbk_flag = undefined; }
        this.gbk_flag = gbk_flag;
        this.fatal = options.fatal;
        // gb18030's decoder has an associated gbk flag (initially unset).
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    GB18030Encoder.prototype.handler = function (stream, code_point) {
        // 1. If code point is end-of-stream, return finished.
        if (code_point === terminology_1.end_of_stream)
            return finished_1.finished;
        // 2. If code point is an ASCII code point, return a byte whose
        // value is code point.
        if (terminology_1.isASCIICodePoint(code_point))
            return code_point;
        // 3. If code point is U+E5E5, return error with code point.
        if (code_point === 0xE5E5)
            return encodings_1.encoderError(code_point);
        // 4. If the gbk flag is set and code point is U+20AC, return
        // byte 0x80.
        if (this.gbk_flag && code_point === 0x20AC)
            return 0x80;
        // 5. Let pointer be the index pointer for code point in index
        // gb18030.
        var pointer = indexes_1.indexPointerFor(code_point, indexes_1.index('gb18030'));
        // 6. If pointer is not null, run these substeps:
        if (pointer !== null) {
            // 1. Let lead be Math.floor(pointer / 190) + 0x81.
            var lead = Math.floor(pointer / 190) + 0x81;
            // 2. Let trail be pointer % 190.
            var trail = pointer % 190;
            // 3. Let offset be 0x40 if trail is less than 0x3F and 0x41 otherwise.
            var offset = trail < 0x3F ? 0x40 : 0x41;
            // 4. Return two bytes whose values are lead and trail + offset.
            return [lead, trail + offset];
        }
        // 7. If gbk flag is set, return error with code point.
        if (this.gbk_flag)
            return encodings_1.encoderError(code_point);
        // 8. Set pointer to the index gb18030 ranges pointer for code
        // point.
        pointer = indexes_1.indexGB18030RangesPointerFor(code_point);
        // 9. Let byte1 be Math.floor(pointer / 10 / 126 / 10).
        var byte1 = Math.floor(pointer / 10 / 126 / 10);
        // 10. Set pointer to pointer − byte1 × 10 × 126 × 10.
        pointer = pointer - byte1 * 10 * 126 * 10;
        // 11. Let byte2 be Math.floor(pointer / 10 / 126).
        var byte2 = Math.floor(pointer / 10 / 126);
        // 12. Set pointer to pointer − byte2 × 10 × 126.
        pointer = pointer - byte2 * 10 * 126;
        // 13. Let byte3 be Math.floor(pointer / 10).
        var byte3 = Math.floor(pointer / 10);
        // 14. Let byte4 be pointer − byte3 × 10.
        var byte4 = pointer - byte3 * 10;
        // 15. Return four bytes whose values are byte1 + 0x81, byte2 +
        // 0x30, byte3 + 0x81, byte4 + 0x30.
        return [byte1 + 0x81,
            byte2 + 0x30,
            byte3 + 0x81,
            byte4 + 0x30];
    };
    return GB18030Encoder;
}());
exports.GB18030Encoder = GB18030Encoder;
//# sourceMappingURL=GB18030Encoder.js.map