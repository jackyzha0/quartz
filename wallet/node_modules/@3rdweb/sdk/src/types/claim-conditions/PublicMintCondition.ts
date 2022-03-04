import { BigNumber, BigNumberish, BytesLike } from "ethers";
import { CurrencyValue } from "../../common/currency";

/**
 * @beta
 */
export interface PublicClaimCondition {
  startTimestamp: BigNumber;
  maxMintSupply: BigNumberish;
  currentMintSupply: BigNumberish;
  quantityLimitPerTransaction: BigNumberish;
  waitTimeSecondsLimitPerTransaction: BigNumberish;
  pricePerToken: BigNumberish;
  currency: string;
  merkleRoot: BytesLike;
}

/**
 * @beta
 */
export interface ClaimCondition {
  startTimestamp: Date;
  maxMintSupply: string;
  currentMintSupply: string;
  availableSupply: string;
  quantityLimitPerTransaction: string;
  waitTimeSecondsLimitPerTransaction: string;
  price: BigNumber;
  pricePerToken: BigNumber;
  currency: string;
  currencyContract: string;
  currencyMetadata: CurrencyValue | null;
  merkleRoot: BytesLike;
}

/**
 * @beta
 * @deprecated - use {@link PublicClaimCondition}
 */
export interface PublicMintCondition extends PublicClaimCondition {}
