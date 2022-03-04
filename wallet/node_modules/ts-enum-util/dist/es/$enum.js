import { EnumWrapper } from "./EnumWrapper";
import * as symbols from "./symbols";
import { visitEnumValue } from "./visitEnumValue";
import { mapEnumValue } from "./mapEnumValue";
var enumWrapperInstancesCache = new WeakMap();
export function $enum(enumObj) {
    var result = enumWrapperInstancesCache.get(enumObj);
    if (!result) {
        result = new EnumWrapper(enumObj);
        enumWrapperInstancesCache.set(enumObj, result);
    }
    return result;
}
$enum.handleNull = symbols.handleNull;
$enum.handleUndefined = symbols.handleUndefined;
$enum.handleUnexpected = symbols.handleUnexpected;
$enum.unhandledEntry = symbols.unhandledEntry;
$enum.visitValue = visitEnumValue;
$enum.mapValue = mapEnumValue;
//# sourceMappingURL=$enum.js.map