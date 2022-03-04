import { JsonObject, JsonProperty } from "json2typescript";
import { ClaimProof } from "./ClaimProof";

@JsonObject("Snapshot")
export class Snapshot {
  @JsonProperty("merkleRoot", String)
  merkleRoot = "";

  @JsonProperty("claims", [ClaimProof])
  claims: ClaimProof[] = [];
}
