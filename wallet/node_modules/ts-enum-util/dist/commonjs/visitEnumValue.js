"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnumValueVisitee_1 = require("./EnumValueVisitee");
function visitEnumValue(value) {
    if (value === null) {
        return new EnumValueVisitee_1.EnumValueVisiteeWithNull();
    }
    else if (value === undefined) {
        return new EnumValueVisitee_1.EnumValueVisiteeWithUndefined();
    }
    else {
        return new EnumValueVisitee_1.EnumValueVisitee(value);
    }
}
exports.visitEnumValue = visitEnumValue;
//# sourceMappingURL=visitEnumValue.js.map