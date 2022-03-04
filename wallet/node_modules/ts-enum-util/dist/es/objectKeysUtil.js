export function isNonNumericKey(key) {
    return key !== String(parseFloat(key));
}
export function getOwnEnumerableNonNumericKeysES6(obj) {
    return Object.getOwnPropertyNames(obj).filter(function (key) {
        return obj.propertyIsEnumerable(key) && isNonNumericKey(key);
    });
}
export function getOwnEnumerableNonNumericKeysES5(obj) {
    return Object.keys(obj).filter(isNonNumericKey);
}
export function getOwnEnumerableNonNumericKeysES3(obj) {
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
export var getOwnEnumerableNonNumericKeys = Object.getOwnPropertyNames
    ? getOwnEnumerableNonNumericKeysES6
    : Object.keys
        ? getOwnEnumerableNonNumericKeysES5
        : getOwnEnumerableNonNumericKeysES3;
//# sourceMappingURL=objectKeysUtil.js.map