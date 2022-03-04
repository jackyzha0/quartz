declare type TextDecoderOptions = {
    fatal?: boolean;
    ignoreBOM?: boolean;
};
declare type DecodeOptions = {
    stream?: boolean;
};
/**
 * @constructor
 * @param {string=} label The label of the encoding;
 *     defaults to 'utf-8'.
 * @param {Object=} options
 */
export declare class TextDecoder {
    private _encoding;
    private _decoder;
    private _ignoreBOM;
    private _BOMseen;
    private _error_mode;
    private _do_not_flush;
    constructor(label?: string, options?: TextDecoderOptions);
    get encoding(): string;
    get fatal(): boolean;
    get ignoreBOM(): boolean;
    /**
     * @param {BufferSource=} input The buffer of bytes to decode.
     * @param {Object=} options
     * @return {string} The decoded string.
     */
    decode(input?: ArrayBuffer | ArrayLike<number> | Uint8Array, options?: DecodeOptions): string;
    /**
     * @param {!Array.<number>} stream
     * @return {string}
     * @this {TextDecoder}
     */
    private serializeStream;
}
export {};
