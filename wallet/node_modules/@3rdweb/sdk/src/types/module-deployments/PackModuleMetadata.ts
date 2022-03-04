import {
  JsonObject,
  JsonProperty,
  PropertyConvertingMode,
} from "json2typescript";
import CommonModuleMetadata from "./CommonModuleMetadata";

@JsonObject("PackModuleMetadata")
export class PackModuleMetadata extends CommonModuleMetadata {
  /**
   * The amount of royalty collected on all royalties represented as basis points.
   * The default is 0 (no royalties).
   *
   * 1 basis point = 0.01%
   *
   * For example: if this value is 100, then the royalty is 1% of the total sales.
   */
  @JsonProperty(
    "seller_fee_basis_points",
    Number,
    PropertyConvertingMode.IGNORE_NULLABLE,
  )
  sellerFeeBasisPoints = 0;

  /**
   * The address of the royalty recipient. All royalties will be sent
   * to this address.
   */
  @JsonProperty("fee_recipient", String, PropertyConvertingMode.IGNORE_NULLABLE)
  feeRecipient?: string = undefined;
}

export default PackModuleMetadata;
