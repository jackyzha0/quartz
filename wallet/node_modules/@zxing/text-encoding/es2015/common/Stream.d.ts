/**
 * A stream represents an ordered sequence of tokens.
 */
export declare class Stream {
    tokens: number[];
    /**
     *
     * @constructor
     * @param {!(Array.<number>|Uint8Array)} tokens Array of tokens that provide
     * the stream.
     */
    constructor(tokens: number[] | Uint8Array);
    /**
     * @return {boolean} True if end-of-stream has been hit.
     */
    endOfStream(): boolean;
    /**
     * When a token is read from a stream, the first token in the
     * stream must be returned and subsequently removed, and
     * end-of-stream must be returned otherwise.
     *
     * @return {number} Get the next token from the stream, or
     * end_of_stream.
     */
    read(): number;
    /**
     * When one or more tokens are prepended to a stream, those tokens
     * must be inserted, in given order, before the first token in the
     * stream.
     *
     * @param {(number|!Array.<number>)} token The token(s) to prepend to the
     * stream.
     */
    prepend(token: (number | Array<number>)): void;
    /**
     * When one or more tokens are pushed to a stream, those tokens
     * must be inserted, in given order, after the last token in the
     * stream.
     *
     * @param {(number|!Array.<number>)} token The tokens(s) to push to the
     * stream.
     */
    push(token: (number | Array<number>)): void;
}
