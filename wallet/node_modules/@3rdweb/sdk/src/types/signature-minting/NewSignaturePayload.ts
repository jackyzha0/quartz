import { BigNumberish } from "ethers";
import { MetadataURIOrObject } from "../../core/types";

/**
 * Represents a new `SignatureMint` request.
 */
export interface NewSignaturePayload {
  /**
   * The metadata of the token to generate a signature for.
   */
  metadata: MetadataURIOrObject;

  /**
   * The receiver of the NFTs being minted when the signature is claimed.
   */
  to: string;

  /**
   * The price per the NFT being minted for this particular signature.
   */
  price: BigNumberish;

  /**
   * The address of the currency used in the event that there is a price set
   * on the token. If this is set to the 0x0 address, then its free to mint.
   */
  currencyAddress: string;

  /**
   * The epoch start time (in seconds) when the signature can be claimed.
   */
  mintStartTimeEpochSeconds: BigNumberish;

  /**
   * The epoch end time (in seconds) that essentially invalidates the signature
   * such that it can no longer be claimed.
   */
  mintEndTimeEpochSeconds: BigNumberish;

  /**
   * A unique identifier for the signature.
   *
   * If this value is an empty string, then a uuid-v4 will be generated.
   */
  id?: string;
}
