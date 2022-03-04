import { decoderError } from "../../encoding/encodings";
import { finished } from "../../encoding/finished";
import { end_of_stream } from "../../encoding/terminology";
import { inRange } from "../../encoding/utilities";
import { convertCodeUnitToBytes } from "./converCodeUnitToBytes";
/**
 * @constructor
 * @implements {Decoder}
 * @param {boolean} utf16_be True if big-endian, false if little-endian.
 * @param {{fatal: boolean}} options
 */
var UTF16Decoder = /** @class */ (function () {
    function UTF16Decoder(utf16_be, options) {
        this.utf16_be = utf16_be;
        this.fatal = options.fatal;
        /** @type {?number} */ this.utf16_lead_byte = null;
        /** @type {?number} */ this.utf16_lead_surrogate = null;
    }
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    UTF16Decoder.prototype.handler = function (stream, bite) {
        // 1. If byte is end-of-stream and either utf-16 lead byte or
        // utf-16 lead surrogate is not null, set utf-16 lead byte and
        // utf-16 lead surrogate to null, and return error.
        if (bite === end_of_stream && (this.utf16_lead_byte !== null ||
            this.utf16_lead_surrogate !== null)) {
            return decoderError(this.fatal);
        }
        // 2. If byte is end-of-stream and utf-16 lead byte and utf-16
        // lead surrogate are null, return finished.
        if (bite === end_of_stream && this.utf16_lead_byte === null &&
            this.utf16_lead_surrogate === null) {
            return finished;
        }
        // 3. If utf-16 lead byte is null, set utf-16 lead byte to byte
        // and return continue.
        if (this.utf16_lead_byte === null) {
            this.utf16_lead_byte = bite;
            return null;
        }
        // 4. Let code unit be the result of:
        var code_unit;
        if (this.utf16_be) {
            // utf-16be decoder flag is set
            //   (utf-16 lead byte << 8) + byte.
            code_unit = (this.utf16_lead_byte << 8) + bite;
        }
        else {
            // utf-16be decoder flag is unset
            //   (byte << 8) + utf-16 lead byte.
            code_unit = (bite << 8) + this.utf16_lead_byte;
        }
        // Then set utf-16 lead byte to null.
        this.utf16_lead_byte = null;
        // 5. If utf-16 lead surrogate is not null, let lead surrogate
        // be utf-16 lead surrogate, set utf-16 lead surrogate to null,
        // and then run these substeps:
        if (this.utf16_lead_surrogate !== null) {
            var lead_surrogate = this.utf16_lead_surrogate;
            this.utf16_lead_surrogate = null;
            // 1. If code unit is in the range U+DC00 to U+DFFF,
            // inclusive, return a code point whose value is 0x10000 +
            // ((lead surrogate − 0xD800) << 10) + (code unit − 0xDC00).
            if (inRange(code_unit, 0xDC00, 0xDFFF)) {
                return 0x10000 + (lead_surrogate - 0xD800) * 0x400 +
                    (code_unit - 0xDC00);
            }
            // 2. Prepend the sequence resulting of converting code unit
            // to bytes using utf-16be decoder flag to stream and return
            // error.
            stream.prepend(convertCodeUnitToBytes(code_unit, this.utf16_be));
            return decoderError(this.fatal);
        }
        // 6. If code unit is in the range U+D800 to U+DBFF, inclusive,
        // set utf-16 lead surrogate to code unit and return continue.
        if (inRange(code_unit, 0xD800, 0xDBFF)) {
            this.utf16_lead_surrogate = code_unit;
            return null;
        }
        // 7. If code unit is in the range U+DC00 to U+DFFF, inclusive,
        // return error.
        if (inRange(code_unit, 0xDC00, 0xDFFF))
            return decoderError(this.fatal);
        // 8. Return code point code unit.
        return code_unit;
    };
    return UTF16Decoder;
}());
export { UTF16Decoder };
//# sourceMappingURL=UTF16Decoder.js.map