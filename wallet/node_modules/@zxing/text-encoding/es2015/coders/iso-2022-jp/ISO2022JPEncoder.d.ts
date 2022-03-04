import { Stream } from "../../common/Stream";
declare enum states {
    ASCII = 0,
    Roman = 1,
    jis0208 = 2
}
/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 */
export declare class ISO2022JPEncoder {
    readonly fatal: boolean;
    iso2022jp_state: states;
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
export {};
