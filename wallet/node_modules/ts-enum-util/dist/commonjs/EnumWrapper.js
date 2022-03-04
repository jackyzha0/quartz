"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectKeysUtil_1 = require("./objectKeysUtil");
var EnumWrapper = (function () {
    function EnumWrapper(enumObj) {
        this.enumObj = enumObj;
        this.keysList = Object.freeze(objectKeysUtil_1.getOwnEnumerableNonNumericKeys(enumObj));
        var length = this.keysList.length;
        var valuesList = new Array(length);
        var keysByValueMap = new Map();
        for (var index = 0; index < length; ++index) {
            var key = this.keysList[index];
            var value = enumObj[key];
            valuesList[index] = value;
            keysByValueMap.set(value, key);
            this[index] = Object.freeze([key, value]);
        }
        this.valuesList = Object.freeze(valuesList);
        this.keysByValueMap = keysByValueMap;
        this.size = this.length = length;
        Object.freeze(this);
    }
    EnumWrapper.prototype.toString = function () {
        return "[object EnumWrapper]";
    };
    EnumWrapper.prototype.keys = function () {
        var _a;
        var _this = this;
        var index = 0;
        return _a = {
                next: function () {
                    var isDone = index >= _this.length;
                    var result = {
                        done: isDone,
                        value: _this.keysList[index]
                    };
                    ++index;
                    return result;
                }
            },
            _a[Symbol.iterator] = function () {
                return this;
            },
            _a;
    };
    EnumWrapper.prototype.values = function () {
        var _a;
        var _this = this;
        var index = 0;
        return _a = {
                next: function () {
                    var isDone = index >= _this.length;
                    var result = {
                        done: isDone,
                        value: _this.valuesList[index]
                    };
                    ++index;
                    return result;
                }
            },
            _a[Symbol.iterator] = function () {
                return this;
            },
            _a;
    };
    EnumWrapper.prototype.entries = function () {
        var _a;
        var _this = this;
        var index = 0;
        return _a = {
                next: function () {
                    var isDone = index >= _this.length;
                    var result = {
                        done: isDone,
                        value: _this[index]
                    };
                    ++index;
                    return result;
                }
            },
            _a[Symbol.iterator] = function () {
                return this;
            },
            _a;
    };
    EnumWrapper.prototype[Symbol.iterator] = function () {
        return this.entries();
    };
    EnumWrapper.prototype.forEach = function (iteratee, context) {
        var length = this.length;
        for (var index = 0; index < length; ++index) {
            var entry = this[index];
            iteratee.call(context, entry[1], entry[0], this, index);
        }
    };
    EnumWrapper.prototype.map = function (iteratee, context) {
        var length = this.length;
        var result = new Array(length);
        for (var index = 0; index < length; ++index) {
            var entry = this[index];
            result[index] = iteratee.call(context, entry[1], entry[0], this, index);
        }
        return result;
    };
    EnumWrapper.prototype.getKeys = function () {
        return this.keysList.slice();
    };
    EnumWrapper.prototype.getValues = function () {
        return this.valuesList.slice();
    };
    EnumWrapper.prototype.getEntries = function () {
        return Array.prototype.slice.call(this);
    };
    EnumWrapper.prototype.indexOfKey = function (key) {
        return this.keysList.indexOf(key);
    };
    EnumWrapper.prototype.indexOfValue = function (value) {
        return this.valuesList.indexOf(value);
    };
    EnumWrapper.prototype.isKey = function (key) {
        return (key != null &&
            objectKeysUtil_1.isNonNumericKey(key) &&
            this.enumObj.hasOwnProperty(key));
    };
    EnumWrapper.prototype.asKeyOrThrow = function (key) {
        if (this.isKey(key)) {
            return key;
        }
        else {
            throw new Error("Unexpected key: " + key + ". Expected one of: " + this.getValues());
        }
    };
    EnumWrapper.prototype.asKeyOrDefault = function (key, defaultKey) {
        if (this.isKey(key)) {
            return key;
        }
        else {
            return defaultKey;
        }
    };
    EnumWrapper.prototype.isValue = function (value) {
        return value != null && this.keysByValueMap.has(value);
    };
    EnumWrapper.prototype.asValueOrThrow = function (value) {
        if (this.isValue(value)) {
            return value;
        }
        else {
            throw new Error("Unexpected value: " + value + ". Expected one of: " + this.getValues());
        }
    };
    EnumWrapper.prototype.asValueOrDefault = function (value, defaultValue) {
        if (this.isValue(value)) {
            return value;
        }
        else {
            return defaultValue;
        }
    };
    EnumWrapper.prototype.getKeyOrThrow = function (value) {
        var result = value != null ? this.keysByValueMap.get(value) : undefined;
        if (result != null) {
            return result;
        }
        else {
            throw new Error("Unexpected value: " + value + ". Expected one of: " + this.getValues());
        }
    };
    EnumWrapper.prototype.getKeyOrDefault = function (value, defaultKey) {
        var result = value != null ? this.keysByValueMap.get(value) : undefined;
        if (result != null) {
            return result;
        }
        else {
            return defaultKey;
        }
    };
    EnumWrapper.prototype.getValueOrThrow = function (key) {
        return this.enumObj[this.asKeyOrThrow(key)];
    };
    EnumWrapper.prototype.getValueOrDefault = function (key, defaultValue) {
        if (this.isKey(key)) {
            return this.enumObj[key];
        }
        else {
            return defaultValue;
        }
    };
    return EnumWrapper;
}());
exports.EnumWrapper = EnumWrapper;
EnumWrapper.prototype[Symbol.toStringTag] = "EnumWrapper";
//# sourceMappingURL=EnumWrapper.js.map