import { JsonObject, JsonProperty } from "json2typescript";

/**
 * The model for a claim proof. Currently we support only an address
 * in the leaf of the merkle tree.
 */
@JsonObject("ClaimProof")
export class ClaimProof {
  /**
   * The address of the account that owns the claim.
   */
  @JsonProperty("address", String)
  address = "";

  /**
   * The proof of the claim (an array of hashes, depending on tree depth)
   */
  @JsonProperty("proof", [String])
  proof: string[] = [];
}
