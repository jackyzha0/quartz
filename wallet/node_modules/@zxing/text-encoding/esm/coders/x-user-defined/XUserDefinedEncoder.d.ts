import { Stream } from "../../common/Stream";
/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 */
export declare class XUserDefinedEncoder {
    readonly fatal: boolean;
    constructor(options: {
        fatal: boolean;
    });
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    handler(stream: Stream, code_point: number): (number | Array<number>);
}
