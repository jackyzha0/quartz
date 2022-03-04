import { getArrayVal } from "../helper/getArrayVal";
import { inRange } from "./utilities";
import { getEncodingIndexes } from "./encoding-indexes-provider";
/**
 * @param {number} pointer The |pointer| to search for.
 * @param {(!Array.<?number>|undefined)} index The |index| to search within.
 * @return {?number} The code point corresponding to |pointer| in |index|,
 *     or null if |code point| is not in |index|.
 */
export function indexCodePointFor(pointer, index) {
    if (!index)
        return null;
    return index[pointer] || null;
}
/**
 * @param {number} code_point The |code point| to search for.
 * @param {!Array.<?number>} index The |index| to search within.
 * @return {?number} The first pointer corresponding to |code point| in
 *     |index|, or null if |code point| is not in |index|.
 */
export function indexPointerFor(code_point, index) {
    var pointer = index.indexOf(code_point);
    return pointer === -1 ? null : pointer;
}
/**
 * @param {string} name Name of the index.
 * @return {(!Array.<number>|!Array.<Array.<number>>)}
 *  */
export function index(name) {
    var encodingIndexes = getEncodingIndexes();
    if (!encodingIndexes) {
        throw Error("Indexes missing." +
            " Did you forget to include encoding-indexes.js first?");
    }
    return encodingIndexes[name];
}
/**
 * @param {number} pointer The |pointer| to search for in the gb18030 index.
 * @return {?number} The code point corresponding to |pointer| in |index|,
 *     or null if |code point| is not in the gb18030 index.
 */
export function indexGB18030RangesCodePointFor(pointer) {
    // 1. If pointer is greater than 39419 and less than 189000, or
    // pointer is greater than 1237575, return null.
    if ((pointer > 39419 && pointer < 189000) || (pointer > 1237575))
        return null;
    // 2. If pointer is 7457, return code point U+E7C7.
    if (pointer === 7457)
        return 0xE7C7;
    // 3. Let offset be the last pointer in index gb18030 ranges that
    // is equal to or less than pointer and let code point offset be
    // its corresponding code point.
    var offset = 0;
    var code_point_offset = 0;
    var idx = index('gb18030-ranges');
    for (var i = 0; i < idx.length; ++i) {
        /** @type {!Array.<number>} */
        var entry = getArrayVal(idx[i]);
        if (entry[0] <= pointer) {
            offset = entry[0];
            code_point_offset = entry[1];
        }
        else {
            break;
        }
    }
    // 4. Return a code point whose value is code point offset +
    // pointer − offset.
    return code_point_offset + pointer - offset;
}
/**
 * @param {number} code_point The |code point| to locate in the gb18030 index.
 * @return {number} The first pointer corresponding to |code point| in the
 *     gb18030 index.
 */
export function indexGB18030RangesPointerFor(code_point) {
    // 1. If code point is U+E7C7, return pointer 7457.
    if (code_point === 0xE7C7)
        return 7457;
    // 2. Let offset be the last code point in index gb18030 ranges
    // that is equal to or less than code point and let pointer offset
    // be its corresponding pointer.
    var offset = 0;
    var pointer_offset = 0;
    var idx = index('gb18030-ranges');
    for (var i = 0; i < idx.length; ++i) {
        var idxVal = idx[i];
        /** @type {!Array.<number>} */
        var entry = getArrayVal(idxVal);
        if (entry[1] <= code_point) {
            offset = entry[1];
            pointer_offset = entry[0];
        }
        else {
            break;
        }
    }
    // 3. Return a pointer whose value is pointer offset + code point
    // − offset.
    return pointer_offset + code_point - offset;
}
/**
 * @param {number} code_point The |code_point| to search for in the Shift_JIS
 *     index.
 * @return {?number} The code point corresponding to |pointer| in |index|,
 *     or null if |code point| is not in the Shift_JIS index.
 */
export function indexShiftJISPointerFor(code_point) {
    // 1. Let index be index jis0208 excluding all entries whose
    // pointer is in the range 8272 to 8835, inclusive.
    shift_jis_index = shift_jis_index ||
        index('jis0208').map(function (code_point, pointer) {
            return inRange(pointer, 8272, 8835) ? null : code_point;
        });
    var index_ = shift_jis_index;
    // 2. Return the index pointer for code point in index.
    return index_.indexOf(code_point);
}
var shift_jis_index;
/**
 * @param {number} code_point The |code_point| to search for in the big5
 *     index.
 * @return {?number} The code point corresponding to |pointer| in |index|,
 *     or null if |code point| is not in the big5 index.
 */
export function indexBig5PointerFor(code_point) {
    // 1. Let index be index Big5 excluding all entries whose pointer
    big5_index_no_hkscs = big5_index_no_hkscs ||
        index('big5').map(function (code_point, pointer) {
            return (pointer < (0xA1 - 0x81) * 157) ? null : code_point;
        });
    var index_ = big5_index_no_hkscs;
    // 2. If code point is U+2550, U+255E, U+2561, U+256A, U+5341, or
    // U+5345, return the last pointer corresponding to code point in
    // index.
    if (code_point === 0x2550 || code_point === 0x255E ||
        code_point === 0x2561 || code_point === 0x256A ||
        code_point === 0x5341 || code_point === 0x5345) {
        return index_.lastIndexOf(code_point);
    }
    // 3. Return the index pointer for code point in index.
    return indexPointerFor(code_point, index_);
}
var big5_index_no_hkscs;
//# sourceMappingURL=indexes.js.map