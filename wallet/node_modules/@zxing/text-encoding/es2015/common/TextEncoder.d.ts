declare type TextEncoderOptions = {
    NONSTANDARD_allowLegacyEncoding?: boolean;
    fatal?: boolean;
};
declare type EncodeOptions = {
    stream?: boolean;
};
/**
 * @constructor
 * @param {string=} label The label of the encoding. NONSTANDARD.
 * @param {Object=} options NONSTANDARD.
 */
export declare class TextEncoder {
    private _encoding;
    private _encoder;
    private _do_not_flush;
    private _fatal;
    constructor(label?: string, options?: TextEncoderOptions);
    get encoding(): string;
    /**
     * @param {string=} opt_string The string to encode.
     * @param {Object=} options
     * @return {!Uint8Array} Encoded bytes, as a Uint8Array.
     */
    encode(opt_string: string, options?: EncodeOptions): Uint8Array;
}
export {};
