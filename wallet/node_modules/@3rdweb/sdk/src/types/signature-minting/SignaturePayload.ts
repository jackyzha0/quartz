import { BigNumberish } from "ethers";
import { NewSignaturePayload } from "./NewSignaturePayload";

/**
 * Represents a prepared `SignaturePayload` object, which will be signed
 * by a wallet.
 */
export interface SignaturePayload extends NewSignaturePayload {
  /**
   * The URI of the token metadata corresponding to this signature
   */
  uri: string;
}

export interface NewErc1155SignaturePayload extends NewSignaturePayload {
  /**
   * The token id to mint or ethers.constants.MaxUint256 if not specified
   */
  tokenId: BigNumberish;
  /**
   * The quantity to mint
   */
  quantity: BigNumberish;
  /**
   * The royalty recipient address for this NFT
   */
  royaltyRecipient: string;
  /**
   * The royalty fee in basis points for this NFT
   */
  royaltyBps: BigNumberish;
  /**
   * The primary sale recipient address for this NFT
   */
  primarySaleRecipient: string;
}

export interface Erc1155SignaturePayload extends NewErc1155SignaturePayload {
  uri: string;
}
