import {
  JsonObject,
  JsonProperty,
  PropertyConvertingMode,
} from "json2typescript";
import CommonModuleMetadata from "./CommonModuleMetadata";
import { NewSplitRecipient } from "./NewSplitRecipient";

@JsonObject("SplitsModuleMetadata")
export class SplitsModuleMetadata extends CommonModuleMetadata {
  recipientSplits: NewSplitRecipient[] = [];

  @JsonProperty("is_royalty", Boolean, PropertyConvertingMode.IGNORE_NULLABLE)
  isRoyalty?: boolean = false;
}

export default SplitsModuleMetadata;
