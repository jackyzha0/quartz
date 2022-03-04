import { EnumValueVisitee, EnumValueVisiteeWithNull, EnumValueVisiteeWithUndefined } from "./EnumValueVisitee";
export function visitEnumValue(value) {
    if (value === null) {
        return new EnumValueVisiteeWithNull();
    }
    else if (value === undefined) {
        return new EnumValueVisiteeWithUndefined();
    }
    else {
        return new EnumValueVisitee(value);
    }
}
//# sourceMappingURL=visitEnumValue.js.map