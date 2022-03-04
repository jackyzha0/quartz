"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createUnhandledEntryError_1 = require("./createUnhandledEntryError");
var symbols_1 = require("./symbols");
var EnumValueMappee = (function () {
    function EnumValueMappee(value) {
        this.value = value;
    }
    EnumValueMappee.prototype.with = function (mapper) {
        if (mapper.hasOwnProperty(this.value)) {
            return processEntry(mapper[this.value], this.value);
        }
        else if (mapper.hasOwnProperty(symbols_1.handleUnexpected)) {
            return processEntry(mapper[symbols_1.handleUnexpected], this.value);
        }
        else {
            throw new Error("Unexpected value: " + this.value);
        }
    };
    return EnumValueMappee;
}());
exports.EnumValueMappee = EnumValueMappee;
var EnumValueMappeeWithNull = (function () {
    function EnumValueMappeeWithNull() {
    }
    EnumValueMappeeWithNull.prototype.with = function (mapper) {
        if (mapper.hasOwnProperty(symbols_1.handleNull)) {
            return processEntry(mapper[symbols_1.handleNull], null);
        }
        else if (mapper.hasOwnProperty(symbols_1.handleUnexpected)) {
            return processEntry(mapper[symbols_1.handleUnexpected], null);
        }
        else {
            throw new Error("Unexpected value: null");
        }
    };
    return EnumValueMappeeWithNull;
}());
exports.EnumValueMappeeWithNull = EnumValueMappeeWithNull;
var EnumValueMappeeWithUndefined = (function () {
    function EnumValueMappeeWithUndefined() {
    }
    EnumValueMappeeWithUndefined.prototype.with = function (mapper) {
        if (mapper.hasOwnProperty(symbols_1.handleUndefined)) {
            return processEntry(mapper[symbols_1.handleUndefined], undefined);
        }
        else if (mapper.hasOwnProperty(symbols_1.handleUnexpected)) {
            return processEntry(mapper[symbols_1.handleUnexpected], undefined);
        }
        else {
            throw new Error("Unexpected value: undefined");
        }
    };
    return EnumValueMappeeWithUndefined;
}());
exports.EnumValueMappeeWithUndefined = EnumValueMappeeWithUndefined;
function processEntry(entry, value) {
    if (entry === symbols_1.unhandledEntry) {
        throw createUnhandledEntryError_1.createUnhandledEntryError(value);
    }
    else {
        return entry;
    }
}
//# sourceMappingURL=EnumValueMappee.js.map