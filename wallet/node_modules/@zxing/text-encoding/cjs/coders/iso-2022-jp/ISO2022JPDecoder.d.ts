import { Stream } from "../../common/Stream";
export declare class ISO2022JPDecoder {
    readonly fatal: boolean;
    iso2022jp_decoder_state: any;
    iso2022jp_decoder_output_state: any;
    iso2022jp_lead: number;
    iso2022jp_output_flag: boolean;
    /**
     * @constructor
     * @implements {Decoder}
     * @param {{fatal: boolean}} options
     */
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
