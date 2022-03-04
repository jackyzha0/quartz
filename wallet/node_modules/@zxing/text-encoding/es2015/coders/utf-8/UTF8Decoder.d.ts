import { Stream } from "../../common/Stream";
/**
 * @constructor
 * @implements {Decoder}
 * @param {{fatal: boolean}} options
 */
export declare class UTF8Decoder {
    readonly fatal: boolean;
    utf8_code_point: number;
    utf8_bytes_seen: number;
    utf8_bytes_needed: number;
    utf8_lower_boundary: number;
    utf8_upper_boundary: number;
    constructor(options: {
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
