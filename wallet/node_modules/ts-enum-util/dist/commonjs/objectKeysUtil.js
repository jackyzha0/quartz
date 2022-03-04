"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNonNumericKey(key) {
    return key !== String(parseFloat(key));
}
exports.isNonNumericKey = isNonNumericKey;
function getOwnEnumerableNonNumericKeysES6(obj) {
    return Object.getOwnPropertyNames(obj).filter(function (key) {
        return obj.propertyIsEnumerable(key) && isNonNumericKey(key);
    });
}
exports.getOwnEnumerableNonNumericKeysES6 = getOwnEnumerableNonNumericKeysES6;
function getOwnEnumerableNonNumericKeysES5(obj) {
    return Object.keys(obj).filter(isNonNumericKey);
}
exports.getOwnEnumerableNonNumericKeysES5 = getOwnEnumerableNonNumericKeysES5;
function getOwnEnumerableNonNumericKeysES3(obj) {
    var result = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key) &&
            obj.propertyIsEnumerable(key) &&
            isNonNumericKey(key)) {
            result.push(key);
        }
    }
    return result;
}
exports.getOwnEnumerableNonNumericKeysES3 = getOwnEnumerableNonNumericKeysES3;
exports.getOwnEnumerableNonNumericKeys = Object.getOwnPropertyNames
    ? getOwnEnumerableNonNumericKeysES6
    : Object.keys
        ? getOwnEnumerableNonNumericKeysES5
        : getOwnEnumerableNonNumericKeysES3;
//# sourceMappingURL=objectKeysUtil.js.map