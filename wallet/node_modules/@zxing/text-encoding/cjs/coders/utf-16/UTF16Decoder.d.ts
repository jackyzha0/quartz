import { Stream } from "../../common/Stream";
/**
 * @constructor
 * @implements {Decoder}
 * @param {boolean} utf16_be True if big-endian, false if little-endian.
 * @param {{fatal: boolean}} options
 */
export declare class UTF16Decoder {
    private utf16_be;
    readonly fatal: boolean;
    utf16_lead_byte: any;
    utf16_lead_surrogate: any;
    constructor(utf16_be: boolean, options: {
        fatal: boolean;
    });
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    handler(stream: Stream, bite: number): (number | Array<number>) | null;
}
