import { Stream } from "../../common";
/**
 * @constructor
 * @implements {Encoder}
 * @param {boolean} utf16_be True if big-endian, false if little-endian.
 * @param {{fatal: boolean}} options
 */
export declare class UTF16Encoder {
    private utf16_be;
    readonly fatal: boolean;
    constructor(utf16_be: boolean, options: {
        fatal: boolean;
    });
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    handler(stream: Stream, code_point: number): (number | Array<number>);
}
