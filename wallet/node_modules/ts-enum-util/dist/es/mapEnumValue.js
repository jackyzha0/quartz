import { EnumValueMappee, EnumValueMappeeWithNull, EnumValueMappeeWithUndefined } from "./EnumValueMappee";
export function mapEnumValue(value) {
    if (value === null) {
        return new EnumValueMappeeWithNull();
    }
    else if (value === undefined) {
        return new EnumValueMappeeWithUndefined();
    }
    else {
        return new EnumValueMappee(value);
    }
}
//# sourceMappingURL=mapEnumValue.js.map