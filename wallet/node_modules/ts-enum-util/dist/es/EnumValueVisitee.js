import { handleUnexpected, handleNull, handleUndefined, unhandledEntry } from "./symbols";
import { createUnhandledEntryError } from "./createUnhandledEntryError";
var EnumValueVisitee = (function () {
    function EnumValueVisitee(value) {
        this.value = value;
    }
    EnumValueVisitee.prototype.with = function (visitor) {
        if (visitor.hasOwnProperty(this.value)) {
            var handler = visitor[this.value];
            return processEntry(handler, this.value);
        }
        else if (visitor[handleUnexpected]) {
            return processEntry(visitor[handleUnexpected], this.value);
        }
        else {
            throw new Error("Unexpected value: " + this.value);
        }
    };
    return EnumValueVisitee;
}());
export { EnumValueVisitee };
var EnumValueVisiteeWithNull = (function () {
    function EnumValueVisiteeWithNull() {
    }
    EnumValueVisiteeWithNull.prototype.with = function (visitor) {
        if (visitor[handleNull]) {
            return processEntry(visitor[handleNull], null);
        }
        else if (visitor[handleUnexpected]) {
            return processEntry(visitor[handleUnexpected], null);
        }
        else {
            throw new Error("Unexpected value: null");
        }
    };
    return EnumValueVisiteeWithNull;
}());
export { EnumValueVisiteeWithNull };
var EnumValueVisiteeWithUndefined = (function () {
    function EnumValueVisiteeWithUndefined() {
    }
    EnumValueVisiteeWithUndefined.prototype.with = function (visitor) {
        if (visitor[handleUndefined]) {
            return processEntry(visitor[handleUndefined], undefined);
        }
        else if (visitor[handleUnexpected]) {
            return processEntry(visitor[handleUnexpected], undefined);
        }
        else {
            throw new Error("Unexpected value: undefined");
        }
    };
    return EnumValueVisiteeWithUndefined;
}());
export { EnumValueVisiteeWithUndefined };
function processEntry(entry, value) {
    if (entry === unhandledEntry) {
        throw createUnhandledEntryError(value);
    }
    else {
        return entry(value);
    }
}
//# sourceMappingURL=EnumValueVisitee.js.map