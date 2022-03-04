import { BigNumberish } from "ethers";

/**
 * Represents a new marketplace auction listing.
 */
export interface NewAuctionListing {
  type?: "NewAuctionListing";

  /**
   * The address of the asset being listed.
   */
  assetContractAddress: string;

  /**
   * The ID of the token to list.
   */
  tokenId: BigNumberish;

  /**
   * The start time of the listing.
   */
  startTimeInSeconds: BigNumberish;

  /**
   * The duration of the listing in seconds.
   */
  listingDurationInSeconds: BigNumberish;

  /**
   * The quantity of tokens to include in the listing.
   *
   * For ERC721s, this value should always be 1 (and will be forced internally regardless of what is passed here).
   */
  quantity: BigNumberish;

  /**
   * The address of the currency to accept for the listing.
   */
  currencyContractAddress: string;

  /**
   * The reserve price is the minimum price that a bid must be in order to be accepted,
   * per token.
   *
   * So if the `quantity = 10` and the `reserve price = 1`, then the minimum bid
   * is 10 coins (of the configured currency).
   */
  reservePricePerToken: BigNumberish;

  /**
   * The buyout price of the listing.
   *
   * So if the `quantity = 10` and the `reserve price = 1`, then the buyout price
   * is 10 coins (of the configured currency).
   */
  buyoutPricePerToken: BigNumberish;
}
