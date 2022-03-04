/**
 * @param {number} a The number to test.
 * @param {number} min The minimum value in the range, inclusive.
 * @param {number} max The maximum value in the range, inclusive.
 * @return {boolean} True if a >= min and a <= max.
 */
export declare function inRange(a: number, min: number, max: number): boolean;
/**
 * @param {!Array.<*>} array The array to check.
 * @param {*} item The item to look for in the array.
 * @return {boolean} True if the item appears in the array.
 */
export declare function includes(array: Array<any>, item: any): boolean;
/**
 * @param {*} o
 * @return {Object}
 */
export declare function ToDictionary(o: any): {
    [x: string]: any;
};
/**
 * @param {string} string Input string of UTF-16 code units.
 * @return {!Array.<number>} Code points.
 */
export declare function stringToCodePoints(string: string): Array<number>;
/**
 * @param {!Array.<number>} code_points Array of code points.
 * @return {string} string String of UTF-16 code units.
 */
export declare function codePointsToString(code_points: Array<number>): string;
