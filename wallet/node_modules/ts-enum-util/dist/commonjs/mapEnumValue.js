"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnumValueMappee_1 = require("./EnumValueMappee");
function mapEnumValue(value) {
    if (value === null) {
        return new EnumValueMappee_1.EnumValueMappeeWithNull();
    }
    else if (value === undefined) {
        return new EnumValueMappee_1.EnumValueMappeeWithUndefined();
    }
    else {
        return new EnumValueMappee_1.EnumValueMappee(value);
    }
}
exports.mapEnumValue = mapEnumValue;
//# sourceMappingURL=mapEnumValue.js.map