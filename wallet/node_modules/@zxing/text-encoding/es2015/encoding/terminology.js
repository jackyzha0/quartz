//
// Implementation of Encoding specification
// https://encoding.spec.whatwg.org/
//
//
// 4. Terminology
//
/**
 * An ASCII byte is a byte in the range 0x00 to 0x7F, inclusive.
 * @param {number} a The number to test.
 * @return {boolean} True if a is in the range 0x00 to 0x7F, inclusive.
 */
export function isASCIIByte(a) {
    return 0x00 <= a && a <= 0x7F;
}
/**
 * An ASCII code point is a code point in the range U+0000 to
 * U+007F, inclusive.
 */
export const isASCIICodePoint = isASCIIByte;
/**
 * End-of-stream is a special token that signifies no more tokens
 * are in the stream.
 * @const
 */ export const end_of_stream = -1;
//# sourceMappingURL=terminology.js.map