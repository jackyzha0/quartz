"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnumWrapper_1 = require("./EnumWrapper");
var symbols = require("./symbols");
var visitEnumValue_1 = require("./visitEnumValue");
var mapEnumValue_1 = require("./mapEnumValue");
var enumWrapperInstancesCache = new WeakMap();
function $enum(enumObj) {
    var result = enumWrapperInstancesCache.get(enumObj);
    if (!result) {
        result = new EnumWrapper_1.EnumWrapper(enumObj);
        enumWrapperInstancesCache.set(enumObj, result);
    }
    return result;
}
exports.$enum = $enum;
$enum.handleNull = symbols.handleNull;
$enum.handleUndefined = symbols.handleUndefined;
$enum.handleUnexpected = symbols.handleUnexpected;
$enum.unhandledEntry = symbols.unhandledEntry;
$enum.visitValue = visitEnumValue_1.visitEnumValue;
$enum.mapValue = mapEnumValue_1.mapEnumValue;
//# sourceMappingURL=$enum.js.map