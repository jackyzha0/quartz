import { Stream } from "../../common/Stream";
/**
 * @constructor
 * @implements {Decoder}
 * @param {!Array.<number>} index The encoding index.
 * @param {{fatal: boolean}} options
 */
export declare class SingleByteDecoder {
    private readonly index;
    readonly fatal: boolean;
    constructor(index: Array<number>, options: {
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
