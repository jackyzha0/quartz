import { Stream } from "../../common";
/**
 * @constructor
 * @implements {Encoder}
 * @param {!Array.<?number>} index The encoding index.
 * @param {{fatal: boolean}} options
 */
export declare class SingleByteEncoder {
    private index;
    readonly fatal: boolean;
    constructor(index: (number | null)[], options: {
        fatal: boolean;
    });
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    handler(stream: Stream, code_point: number): (number | Array<number>);
}
