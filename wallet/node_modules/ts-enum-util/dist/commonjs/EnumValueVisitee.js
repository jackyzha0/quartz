"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var symbols_1 = require("./symbols");
var createUnhandledEntryError_1 = require("./createUnhandledEntryError");
var EnumValueVisitee = (function () {
    function EnumValueVisitee(value) {
        this.value = value;
    }
    EnumValueVisitee.prototype.with = function (visitor) {
        if (visitor.hasOwnProperty(this.value)) {
            var handler = visitor[this.value];
            return processEntry(handler, this.value);
        }
        else if (visitor[symbols_1.handleUnexpected]) {
            return processEntry(visitor[symbols_1.handleUnexpected], this.value);
        }
        else {
            throw new Error("Unexpected value: " + this.value);
        }
    };
    return EnumValueVisitee;
}());
exports.EnumValueVisitee = EnumValueVisitee;
var EnumValueVisiteeWithNull = (function () {
    function EnumValueVisiteeWithNull() {
    }
    EnumValueVisiteeWithNull.prototype.with = function (visitor) {
        if (visitor[symbols_1.handleNull]) {
            return processEntry(visitor[symbols_1.handleNull], null);
        }
        else if (visitor[symbols_1.handleUnexpected]) {
            return processEntry(visitor[symbols_1.handleUnexpected], null);
        }
        else {
            throw new Error("Unexpected value: null");
        }
    };
    return EnumValueVisiteeWithNull;
}());
exports.EnumValueVisiteeWithNull = EnumValueVisiteeWithNull;
var EnumValueVisiteeWithUndefined = (function () {
    function EnumValueVisiteeWithUndefined() {
    }
    EnumValueVisiteeWithUndefined.prototype.with = function (visitor) {
        if (visitor[symbols_1.handleUndefined]) {
            return processEntry(visitor[symbols_1.handleUndefined], undefined);
        }
        else if (visitor[symbols_1.handleUnexpected]) {
            return processEntry(visitor[symbols_1.handleUnexpected], undefined);
        }
        else {
            throw new Error("Unexpected value: undefined");
        }
    };
    return EnumValueVisiteeWithUndefined;
}());
exports.EnumValueVisiteeWithUndefined = EnumValueVisiteeWithUndefined;
function processEntry(entry, value) {
    if (entry === symbols_1.unhandledEntry) {
        throw createUnhandledEntryError_1.createUnhandledEntryError(value);
    }
    else {
        return entry(value);
    }
}
//# sourceMappingURL=EnumValueVisitee.js.map