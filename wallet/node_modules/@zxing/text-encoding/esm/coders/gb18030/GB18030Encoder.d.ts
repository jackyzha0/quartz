import { Stream } from "../../common/Stream";
/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 * @param {boolean=} gbk_flag
 */
export declare class GB18030Encoder {
    private gbk_flag;
    readonly fatal: boolean;
    constructor(options: {
        fatal: boolean;
    }, gbk_flag?: boolean);
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    handler(stream: Stream, code_point: number): (number | Array<number>);
}
