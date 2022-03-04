import {
  JsonObject,
  JsonProperty,
  PropertyConvertingMode,
} from "json2typescript";
import CommonModuleMetadata from "./CommonModuleMetadata";

@JsonObject("MarketModuleMetadata")
export class MarketModuleMetadata extends CommonModuleMetadata {
  /**
   * The fee collected on all sales out of this marketplace. This fee
   * only applies to items sold from the marketplace and does not
   * include any resale royalties that occur outside of this marketplace.
   * The default is 0 (no fees).
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
  marketFeeBasisPoints = 0;
}

export default MarketModuleMetadata;
