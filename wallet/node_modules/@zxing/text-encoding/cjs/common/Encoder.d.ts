import { Stream } from "./Stream";
/** @interface */
export interface Encoder {
    /**
     * @param {Stream} stream The stream of code points being encoded.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit, or |finished|.
     */
    handler(stream: Stream, code_point: number): number | number[];
}
