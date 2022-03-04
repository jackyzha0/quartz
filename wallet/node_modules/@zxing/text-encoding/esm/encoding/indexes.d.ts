/**
 * @param {number} pointer The |pointer| to search for.
 * @param {(!Array.<?number>|undefined)} index The |index| to search within.
 * @return {?number} The code point corresponding to |pointer| in |index|,
 *     or null if |code point| is not in |index|.
 */
export declare function indexCodePointFor(pointer: number, index: (Array<number | null> | undefined)): number | null;
/**
 * @param {number} code_point The |code point| to search for.
 * @param {!Array.<?number>} index The |index| to search within.
 * @return {?number} The first pointer corresponding to |code point| in
 *     |index|, or null if |code point| is not in |index|.
 */
export declare function indexPointerFor(code_point: number, index: Array<number | null>): number | null;
/**
 * @param {string} name Name of the index.
 * @return {(!Array.<number>|!Array.<Array.<number>>)}
 *  */
export declare function index(name: string): number[] | number[][];
/**
 * @param {number} pointer The |pointer| to search for in the gb18030 index.
 * @return {?number} The code point corresponding to |pointer| in |index|,
 *     or null if |code point| is not in the gb18030 index.
 */
export declare function indexGB18030RangesCodePointFor(pointer: number): number | null;
/**
 * @param {number} code_point The |code point| to locate in the gb18030 index.
 * @return {number} The first pointer corresponding to |code point| in the
 *     gb18030 index.
 */
export declare function indexGB18030RangesPointerFor(code_point: number): number;
/**
 * @param {number} code_point The |code_point| to search for in the Shift_JIS
 *     index.
 * @return {?number} The code point corresponding to |pointer| in |index|,
 *     or null if |code point| is not in the Shift_JIS index.
 */
export declare function indexShiftJISPointerFor(code_point: number): number | null;
/**
 * @param {number} code_point The |code_point| to search for in the big5
 *     index.
 * @return {?number} The code point corresponding to |pointer| in |index|,
 *     or null if |code point| is not in the big5 index.
 */
export declare function indexBig5PointerFor(code_point: number): number | null;
