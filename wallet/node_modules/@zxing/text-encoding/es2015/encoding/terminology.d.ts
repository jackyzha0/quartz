/**
 * An ASCII byte is a byte in the range 0x00 to 0x7F, inclusive.
 * @param {number} a The number to test.
 * @return {boolean} True if a is in the range 0x00 to 0x7F, inclusive.
 */
export declare function isASCIIByte(a: number): boolean;
/**
 * An ASCII code point is a code point in the range U+0000 to
 * U+007F, inclusive.
 */
export declare const isASCIICodePoint: typeof isASCIIByte;
/**
 * End-of-stream is a special token that signifies no more tokens
 * are in the stream.
 * @const
 */ export declare const end_of_stream = -1;
