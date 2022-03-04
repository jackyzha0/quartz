"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encodings_1 = require("../../encoding/encodings");
var finished_1 = require("../../encoding/finished");
var indexes_1 = require("../../encoding/indexes");
var terminology_1 = require("../../encoding/terminology");
var states;
(function (states) {
    states[states["ASCII"] = 0] = "ASCII";
    states[states["Roman"] = 1] = "Roman";
    states[states["jis0208"] = 2] = "jis0208";
})(states || (states = {}));
/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 */
var ISO2022JPEncoder = /** @class */ (function () {
    function ISO2022JPEncoder(options) {
        this.fatal = options.fatal;
        // iso-2022-jp's encoder has an associated iso-2022-jp encoder
        // state which is one of ASCII, Roman, and jis0208 (initially
        // ASCII).
        /** @type {number} */ this.iso2022jp_state = states.ASCII;
    }
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    ISO2022JPEncoder.prototype.handler = function (stream, code_point) {
        // 1. If code point is end-of-stream and iso-2022-jp encoder
        // state is not ASCII, prepend code point to stream, set
        // iso-2022-jp encoder state to ASCII, and return three bytes
        // 0x1B 0x28 0x42.
        if (code_point === terminology_1.end_of_stream &&
            this.iso2022jp_state !== states.ASCII) {
            stream.prepend(code_point);
            this.iso2022jp_state = states.ASCII;
            return [0x1B, 0x28, 0x42];
        }
        // 2. If code point is end-of-stream and iso-2022-jp encoder
        // state is ASCII, return finished.
        if (code_point === terminology_1.end_of_stream && this.iso2022jp_state === states.ASCII)
            return finished_1.finished;
        // 3. If ISO-2022-JP encoder state is ASCII or Roman, and code
        // point is U+000E, U+000F, or U+001B, return error with U+FFFD.
        if ((this.iso2022jp_state === states.ASCII ||
            this.iso2022jp_state === states.Roman) &&
            (code_point === 0x000E || code_point === 0x000F ||
                code_point === 0x001B)) {
            return encodings_1.encoderError(0xFFFD);
        }
        // 4. If iso-2022-jp encoder state is ASCII and code point is an
        // ASCII code point, return a byte whose value is code point.
        if (this.iso2022jp_state === states.ASCII &&
            terminology_1.isASCIICodePoint(code_point))
            return code_point;
        // 5. If iso-2022-jp encoder state is Roman and code point is an
        // ASCII code point, excluding U+005C and U+007E, or is U+00A5
        // or U+203E, run these substeps:
        if (this.iso2022jp_state === states.Roman &&
            ((terminology_1.isASCIICodePoint(code_point) &&
                code_point !== 0x005C && code_point !== 0x007E) ||
                (code_point == 0x00A5 || code_point == 0x203E))) {
            // 1. If code point is an ASCII code point, return a byte
            // whose value is code point.
            if (terminology_1.isASCIICodePoint(code_point))
                return code_point;
            // 2. If code point is U+00A5, return byte 0x5C.
            if (code_point === 0x00A5)
                return 0x5C;
            // 3. If code point is U+203E, return byte 0x7E.
            if (code_point === 0x203E)
                return 0x7E;
        }
        // 6. If code point is an ASCII code point, and iso-2022-jp
        // encoder state is not ASCII, prepend code point to stream, set
        // iso-2022-jp encoder state to ASCII, and return three bytes
        // 0x1B 0x28 0x42.
        if (terminology_1.isASCIICodePoint(code_point) &&
            this.iso2022jp_state !== states.ASCII) {
            stream.prepend(code_point);
            this.iso2022jp_state = states.ASCII;
            return [0x1B, 0x28, 0x42];
        }
        // 7. If code point is either U+00A5 or U+203E, and iso-2022-jp
        // encoder state is not Roman, prepend code point to stream, set
        // iso-2022-jp encoder state to Roman, and return three bytes
        // 0x1B 0x28 0x4A.
        if ((code_point === 0x00A5 || code_point === 0x203E) &&
            this.iso2022jp_state !== states.Roman) {
            stream.prepend(code_point);
            this.iso2022jp_state = states.Roman;
            return [0x1B, 0x28, 0x4A];
        }
        // 8. If code point is U+2212, set it to U+FF0D.
        if (code_point === 0x2212)
            code_point = 0xFF0D;
        // 9. Let pointer be the index pointer for code point in index
        // jis0208.
        var pointer = indexes_1.indexPointerFor(code_point, indexes_1.index('jis0208'));
        // 10. If pointer is null, return error with code point.
        if (pointer === null)
            return encodings_1.encoderError(code_point);
        // 11. If iso-2022-jp encoder state is not jis0208, prepend code
        // point to stream, set iso-2022-jp encoder state to jis0208,
        // and return three bytes 0x1B 0x24 0x42.
        if (this.iso2022jp_state !== states.jis0208) {
            stream.prepend(code_point);
            this.iso2022jp_state = states.jis0208;
            return [0x1B, 0x24, 0x42];
        }
        // 12. Let lead be Math.floor(pointer / 94) + 0x21.
        var lead = Math.floor(pointer / 94) + 0x21;
        // 13. Let trail be pointer % 94 + 0x21.
        var trail = pointer % 94 + 0x21;
        // 14. Return two bytes whose values are lead and trail.
        return [lead, trail];
    };
    return ISO2022JPEncoder;
}());
exports.ISO2022JPEncoder = ISO2022JPEncoder;
//# sourceMappingURL=ISO2022JPEncoder.js.map