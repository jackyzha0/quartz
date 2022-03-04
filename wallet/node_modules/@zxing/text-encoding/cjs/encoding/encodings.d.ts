/**
 * @param {boolean} fatal If true, decoding errors raise an exception.
 * @param {number=} opt_code_point Override the standard fallback code point.
 * @return {number} The code point to insert on a decoding error.
 */
export declare function decoderError(fatal: boolean, opt_code_point?: number | undefined): number;
/**
 * @param {number} code_point The code point that could not be encoded.
 * @return {number} Always throws, no value is actually returned.
 */
export declare function encoderError(code_point: number): number;
/**
 * @param {string} label The encoding label.
 * @return {?{name:string,labels:Array.<string>}}
 */
export declare function getEncoding(label: string): {
    name: string;
    labels: Array<string>;
} | null;
/**
 * Encodings table: https://encoding.spec.whatwg.org/encodings.json
 * @const
 * @type {!Array.<{
 *          heading: string,
 *          encodings: Array.<{name:string,labels:Array.<string>}>
 *        }>}
 */
declare const encodings: {
    heading: string;
    encodings: {
        name: string;
        labels: string[];
    }[];
}[];
export { encodings };
