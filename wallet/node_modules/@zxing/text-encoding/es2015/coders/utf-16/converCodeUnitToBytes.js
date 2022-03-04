/**
 * @param {number} code_unit
 * @param {boolean} utf16be
 * @return {!Array.<number>} bytes
 */
export function convertCodeUnitToBytes(code_unit, utf16be) {
    // 1. Let byte1 be code unit >> 8.
    const byte1 = code_unit >> 8;
    // 2. Let byte2 be code unit & 0x00FF.
    const byte2 = code_unit & 0x00FF;
    // 3. Then return the bytes in order:
    // utf-16be flag is set: byte1, then byte2.
    if (utf16be)
        return [byte1, byte2];
    // utf-16be flag is unset: byte2, then byte1.
    return [byte2, byte1];
}
//# sourceMappingURL=converCodeUnitToBytes.js.map