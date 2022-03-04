import { createUnhandledEntryError } from "./createUnhandledEntryError";
import { handleUnexpected, handleNull, handleUndefined, unhandledEntry } from "./symbols";
var EnumValueMappee = (function () {
    function EnumValueMappee(value) {
        this.value = value;
    }
    EnumValueMappee.prototype.with = function (mapper) {
        if (mapper.hasOwnProperty(this.value)) {
            return processEntry(mapper[this.value], this.value);
        }
        else if (mapper.hasOwnProperty(handleUnexpected)) {
            return processEntry(mapper[handleUnexpected], this.value);
        }
        else {
            throw new Error("Unexpected value: " + this.value);
        }
    };
    return EnumValueMappee;
}());
export { EnumValueMappee };
var EnumValueMappeeWithNull = (function () {
    function EnumValueMappeeWithNull() {
    }
    EnumValueMappeeWithNull.prototype.with = function (mapper) {
        if (mapper.hasOwnProperty(handleNull)) {
            return processEntry(mapper[handleNull], null);
        }
        else if (mapper.hasOwnProperty(handleUnexpected)) {
            return processEntry(mapper[handleUnexpected], null);
        }
        else {
            throw new Error("Unexpected value: null");
        }
    };
    return EnumValueMappeeWithNull;
}());
export { EnumValueMappeeWithNull };
var EnumValueMappeeWithUndefined = (function () {
    function EnumValueMappeeWithUndefined() {
    }
    EnumValueMappeeWithUndefined.prototype.with = function (mapper) {
        if (mapper.hasOwnProperty(handleUndefined)) {
            return processEntry(mapper[handleUndefined], undefined);
        }
        else if (mapper.hasOwnProperty(handleUnexpected)) {
            return processEntry(mapper[handleUnexpected], undefined);
        }
        else {
            throw new Error("Unexpected value: undefined");
        }
    };
    return EnumValueMappeeWithUndefined;
}());
export { EnumValueMappeeWithUndefined };
function processEntry(entry, value) {
    if (entry === unhandledEntry) {
        throw createUnhandledEntryError(value);
    }
    else {
        return entry;
    }
}
//# sourceMappingURL=EnumValueMappee.js.map