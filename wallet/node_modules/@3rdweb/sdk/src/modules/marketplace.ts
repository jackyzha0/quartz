import {
  ERC1155__factory,
  ERC165__factory,
  ERC20__factory,
  ERC721__factory,
  Marketplace,
  Marketplace__factory,
} from "@3rdweb/contracts";
import {
  ListingParametersStruct,
  ListingStruct,
} from "@3rdweb/contracts/dist/IMarketplace";
import { AddressZero } from "@ethersproject/constants";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import {
  getCurrencyValue,
  getRoleHash,
  getTokenMetadataUsingStorage,
  InterfaceId_IERC721,
  ModuleType,
  Role,
  RolesMap,
} from "../common";
import { isNativeToken } from "../common/currency";
import {
  AuctionAlreadyStartedError,
  AuctionHasNotEndedError,
  ListingNotFoundError,
  WrongListingTypeError,
} from "../common/error";
import { invariant } from "../common/invariant";
import { ModuleWithRoles } from "../core/module";
import { ListingType } from "../enums/marketplace/ListingType";
import { IMarketplace } from "../interfaces/modules";
import {
  AuctionListing,
  NewAuctionListing,
  NewDirectListing,
  Offer,
} from "../types";
import { DirectListing } from "../types/marketplace/DirectListing";

export interface MarketplaceFilter {
  seller?: string;
  tokenContract?: string;
  tokenId?: number;
  start?: number;
  count?: number;
}

const MAX_BPS = 10000;

/**
 * Create your own whitelabel marketplace that enables users to buy and sell any digital assets.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@3rdweb/sdk";
 *
 * // You can switch out this provider with any wallet or provider setup you like.
 * const provider = ethers.Wallet.createRandom();
 * const sdk = new ThirdwebSDK(provider);
 * const module = sdk.getMarketplaceModule("{{module_address}}");
 * ```
 *
 * @public
 */
export class MarketplaceModule
  extends ModuleWithRoles<Marketplace>
  implements IMarketplace
{
  private _shouldCheckVersion = true;
  private _isNewBuy = false;
  public static moduleType: ModuleType = ModuleType.MARKETPLACE;

  public static roles = [
    RolesMap.admin,
    RolesMap.lister,
    RolesMap.asset,
  ] as const;

  /**
   * @override
   * @internal
   */
  protected getModuleRoles(): readonly Role[] {
    return MarketplaceModule.roles;
  }

  /**
   * @internal
   */
  protected connectContract(): Marketplace {
    return Marketplace__factory.connect(this.address, this.providerOrSigner);
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return MarketplaceModule.moduleType;
  }

  /**
   * Create Direct Listing
   *
   * @remarks Create a new listing on the marketplace where people can buy an asset directly.
   *
   * @example
   * ```javascript
   * // Data of the listing you want to create
   * const listing = {
   *   // address of the contract the asset you want to list is on
   *   assetContractAddress: "0x...",
   *   // token ID of the asset you want to list
   *   tokenId: "0",
   *   // in how many seconds with the listing open up
   *   startTimeInSeconds: 0,
   *   // how long the listing will be open for
   *   listingDurationInSeconds: 86400,
   *   // how many of the asset you want to list
   *   quantity: 1,
   *   // address of the currency contract that will be used to pay for the listing
   *   currencyContractAddress: "0x0000000000000000000000000000000000000000",
   *   // how much the asset will be sold for
   *   buyoutPricePerToken: "1",
   * }
   *
   * await module.createDirectListing(listing);
   * ```
   */
  public async createDirectListing(
    listing: NewDirectListing,
  ): Promise<BigNumber> {
    this.validateNewListingParam(listing);

    await this.handleTokenApproval(
      listing.assetContractAddress,
      listing.tokenId,
      await this.getSignerAddress(),
    );

    const receipt = await this.sendTransaction("createListing", [
      {
        assetContract: listing.assetContractAddress,
        tokenId: listing.tokenId,
        buyoutPricePerToken: listing.buyoutPricePerToken,
        currencyToAccept: listing.currencyContractAddress,
        listingType: ListingType.Direct,
        quantityToList: listing.quantity,
        reservePricePerToken: listing.buyoutPricePerToken,
        secondsUntilEndTime: listing.listingDurationInSeconds,
        startTime: listing.startTimeInSeconds,
      } as ListingParametersStruct,
    ]);

    const event = this.parseEventLogs("NewListing", receipt?.logs);
    return event.listingId;
  }

  /**
   * Create Auction
   *
   * @remarks Create a new auction where people can bid on an asset.
   *
   * @example
   * ```javascript
   * // Data of the auction you want to create
   * const auction = {
   *   // address of the contract the asset you want to list is on
   *   assetContractAddress: "0x...",
   *   // token ID of the asset you want to list
   *   tokenId: "0",
   *   // in how many seconds with the listing open up
   *   startTimeInSeconds: 0,
   *   // how long the listing will be open for
   *   listingDurationInSeconds: 86400,
   *   // how many of the asset you want to list
   *   quantity: 1,
   *   // address of the currency contract that will be used to pay for the listing
   *   currencyContractAddress: "0x0000000000000000000000000000000000000000",
   *   // how much people would have to bid to instantly buy the asset
   *   buyoutPricePerToken: "10",
   *   // the minimum bid that will be accepted for the token
   *   reservePricePerToken: "1",
   * }
   *
   * await module.createAuctionListing(auction);
   * ```
   */
  public async createAuctionListing(
    listing: NewAuctionListing,
  ): Promise<BigNumber> {
    this.validateNewListingParam(listing);

    await this.handleTokenApproval(
      listing.assetContractAddress,
      listing.tokenId,
      await this.getSignerAddress(),
    );

    const receipt = await this.sendTransaction("createListing", [
      {
        assetContract: listing.assetContractAddress,
        tokenId: listing.tokenId,
        buyoutPricePerToken: listing.buyoutPricePerToken,
        currencyToAccept: listing.currencyContractAddress,
        listingType: ListingType.Auction,
        quantityToList: listing.quantity,
        reservePricePerToken: listing.reservePricePerToken,
        secondsUntilEndTime: listing.listingDurationInSeconds,
        startTime: listing.startTimeInSeconds,
      } as ListingParametersStruct,
    ]);

    const event = this.parseEventLogs("NewListing", receipt?.logs);
    return event.listingId;
  }

  public async makeDirectListingOffer(offer: {
    listingId: BigNumberish;
    quantityDesired: BigNumberish;
    currencyContractAddress: string;
    pricePerToken: BigNumberish;
  }): Promise<void> {
    if (isNativeToken(offer.currencyContractAddress)) {
      throw new Error(
        "You must use the wrapped native token address when making an offer with a native token",
      );
    }

    try {
      await this.getDirectListing(offer.listingId);
    } catch (err) {
      console.error("Failed to get listing, err =", err);
      throw new Error(`Error getting the listing with id ${offer.listingId}`);
    }

    const quantity = BigNumber.from(offer.quantityDesired);
    const value = BigNumber.from(offer.pricePerToken).mul(quantity);
    const overrides = (await this.getCallOverrides()) || {};
    await this.setAllowance(value, offer.currencyContractAddress, overrides);

    await this.sendTransaction(
      "offer",
      [
        offer.listingId,
        offer.quantityDesired,
        offer.currencyContractAddress,
        offer.pricePerToken,
      ],
      overrides,
    );
  }

  private async setAllowance(
    value: BigNumber,
    currencyAddress: string,
    overrides: any,
  ): Promise<any> {
    if (isNativeToken(currencyAddress)) {
      overrides["value"] = value;
    } else {
      const erc20 = ERC20__factory.connect(
        currencyAddress,
        this.providerOrSigner,
      );
      const owner = await this.getSignerAddress();
      const spender = this.address;
      const allowance = await erc20.allowance(owner, spender);

      if (allowance.lt(value)) {
        await this.sendContractTransaction(erc20, "increaseAllowance", [
          spender,
          value.sub(allowance),
        ]);
      }
    }
    return overrides;
  }

  /**
   * Bid On Auction
   *
   * @remarks Make a bid on an auction listings
   *
   * @example
   * ```javascript
   * // The listing ID of the asset you want to bid on
   * const listingId = 0;
   * // The price you are willing to bid for a single token of the listing
   * const pricePerToken = 1;
   *
   * await module.makeAuctionListingBid({ listingId, pricePerToken });
   * ```
   */
  public async makeAuctionListingBid(bid: {
    listingId: BigNumberish;
    pricePerToken: BigNumberish;
  }): Promise<void> {
    const listing = await this.validateAuctionListing(
      BigNumber.from(bid.listingId),
    );

    const bidBuffer = await this.getBidBufferBps();
    const winningBid = await this.getWinningBid(bid.listingId);
    if (winningBid) {
      const isWinningBid = await this.isWinningBid(
        winningBid.pricePerToken,
        bid.pricePerToken,
        bidBuffer,
      );

      invariant(
        isWinningBid,
        "Bid price is too low based on the current winning bid and the bid buffer",
      );
    } else {
      const pricePerToken = BigNumber.from(bid.pricePerToken);
      const reservePrice = BigNumber.from(listing.reservePrice);
      invariant(
        pricePerToken.gte(reservePrice),
        "Bid price is too low based on reserve price",
      );
    }

    const quantity = BigNumber.from(listing.quantity);
    const value = BigNumber.from(bid.pricePerToken).mul(quantity);

    const overrides = (await this.getCallOverrides()) || {};
    await this.setAllowance(value, listing.currencyContractAddress, overrides);

    await this.sendTransaction(
      "offer",
      [
        bid.listingId,
        listing.quantity,
        listing.currencyContractAddress,
        bid.pricePerToken,
      ],
      overrides,
    );
  }

  public async isWinningBid(
    winningPrice: BigNumberish,
    newBidPrice: BigNumberish,
    bidBuffer: BigNumberish,
  ): Promise<boolean> {
    bidBuffer = BigNumber.from(bidBuffer);
    winningPrice = BigNumber.from(winningPrice);
    newBidPrice = BigNumber.from(newBidPrice);
    const buffer = newBidPrice.sub(winningPrice).mul(MAX_BPS).div(winningPrice);
    return buffer.gte(bidBuffer);
  }

  /**
   * Get Auction Winner
   *
   * @remarks Get the winner of the auction after an auction ends.
   *
   * @example
   * ```javascript
   * // The listing ID of the auction that closed
   * const listingId = 0;
   *
   * module
   *   .getAuctionWinner(listingId)
   *   .then((auctionWinner) => console.log(auctionWinner))
   *   .catch((err) => console.error(err));
   * ```
   */
  public async getAuctionWinner(listingId: BigNumberish): Promise<string> {
    const closedAuctions = await this.readOnlyContract.queryFilter(
      this.contract.filters.AuctionClosed(),
    );

    const auction = closedAuctions.find((a) =>
      a.args.listingId.eq(BigNumber.from(listingId)),
    );

    if (!auction) {
      throw new Error(
        `Could not find auction with listingId ${listingId} in closed auctions`,
      );
    }

    return auction.args.winningBidder;
  }

  public async getDirectListing(
    listingId: BigNumberish,
  ): Promise<DirectListing> {
    const listing = await this.readOnlyContract.listings(listingId);

    if (listing.listingId.toString() !== listingId.toString()) {
      throw new ListingNotFoundError(this.address, listingId.toString());
    }

    if (listing.listingType !== ListingType.Direct) {
      throw new WrongListingTypeError(
        this.address,
        listingId.toString(),
        "Auction",
        "Direct",
      );
    }

    return await this.mapDirectListing(listing);
  }

  public async getAuctionListing(
    listingId: BigNumberish,
  ): Promise<AuctionListing> {
    const listing = await this.readOnlyContract.listings(listingId);

    if (listing.listingId.toString() !== listingId.toString()) {
      throw new ListingNotFoundError(this.address, listingId.toString());
    }

    if (listing.listingType !== ListingType.Auction) {
      throw new WrongListingTypeError(
        this.address,
        listingId.toString(),
        "Direct",
        "Auction",
      );
    }
    return await this.mapAuctionListing(listing);
  }

  /**
   * Helper method maps the auction listing to the direct listing interface.
   *
   * @internal
   * @param listing - The listing to map, as returned from the contract.
   * @returns - The mapped interface.
   */
  private async mapDirectListing(
    listing: ListingStruct,
  ): Promise<DirectListing> {
    return {
      assetContractAddress: listing.assetContract,
      buyoutPrice: listing.buyoutPricePerToken,
      currencyContractAddress: listing.currency,
      buyoutCurrencyValuePerToken: await getCurrencyValue(
        this.providerOrSigner,
        listing.currency,
        listing.buyoutPricePerToken,
      ),
      id: listing.listingId.toString(),
      tokenId: listing.tokenId,
      quantity: listing.quantity,
      startTimeInSeconds: listing.startTime,
      // TODO: fetch the asset
      asset: await getTokenMetadataUsingStorage(
        listing.assetContract,
        this.providerOrSigner,
        listing.tokenId.toString(),
        this.sdk.getStorage(),
      ),
      secondsUntilEnd: listing.endTime,
      sellerAddress: listing.tokenOwner,
      type: ListingType.Direct,
    };
  }

  /**
   * Helper method maps the auction listing to the auction listing interface.
   *
   * @internal
   * @param listing - The listing to map, as returned from the contract.
   * @returns - The mapped interface.
   */
  private async mapAuctionListing(
    listing: ListingStruct,
  ): Promise<AuctionListing> {
    return {
      assetContractAddress: listing.assetContract,
      buyoutPrice: listing.buyoutPricePerToken,
      currencyContractAddress: listing.currency,
      buyoutCurrencyValuePerToken: await getCurrencyValue(
        this.providerOrSigner,
        listing.currency,
        listing.buyoutPricePerToken,
      ),
      id: listing.listingId.toString(),
      tokenId: listing.tokenId,
      quantity: listing.quantity,
      startTimeInEpochSeconds: listing.startTime,
      asset: await getTokenMetadataUsingStorage(
        listing.assetContract,
        this.providerOrSigner,
        listing.tokenId.toString(),
        this.sdk.getStorage(),
      ),
      reservePriceCurrencyValuePerToken: await getCurrencyValue(
        this.providerOrSigner,
        listing.currency,
        listing.reservePricePerToken,
      ),
      reservePrice: listing.reservePricePerToken,
      endTimeInEpochSeconds: listing.endTime,
      sellerAddress: listing.tokenOwner,
      type: ListingType.Auction,
    };
  }

  private async handleTokenApproval(
    assetContract: string,
    tokenId: BigNumberish,
    from: string,
  ): Promise<void> {
    const erc165 = ERC165__factory.connect(
      assetContract,
      this.providerOrSigner,
    );

    // check for token approval
    const isERC721 = await erc165.supportsInterface(InterfaceId_IERC721);
    if (isERC721) {
      const asset = ERC721__factory.connect(
        assetContract,
        this.providerOrSigner,
      );

      const approved = await asset.isApprovedForAll(from, this.address);
      if (!approved) {
        const isTokenApproved =
          (await asset.getApproved(tokenId)).toLowerCase() ===
          this.address.toLowerCase();

        if (!isTokenApproved) {
          await this.sendContractTransaction(asset, "setApprovalForAll", [
            this.address,
            true,
          ]);
        }
      }
    } else {
      const asset = ERC1155__factory.connect(
        assetContract,
        this.providerOrSigner,
      );

      const approved = await asset.isApprovedForAll(from, this.address);
      if (!approved) {
        await this.sendContractTransaction(asset, "setApprovalForAll", [
          this.address,
          true,
        ]);
      }
    }
  }

  /**
   * This method checks if the given token is approved for the marketplace module.
   * This is particularly useful for direct listings where the token
   * being listed may be moved before the listing is actually closed.
   *
   * TODO: Ask Jake/Krishang: do we need to also check the owners balance of the token,
   * based on the listing quantity? I.e. query the balance of the tokenId, and check if
   * the seller holds enough of the token
   *
   * @internal
   * @param assetContract - The address of the asset contract.
   * @param tokenId - The token id of the token.
   * @param from - The address of the account that owns the token.
   * @returns - True if the marketplace is approved on the token, false otherwise.
   */
  private async isTokenApprovedForMarketplace(
    assetContract: string,
    tokenId: BigNumberish,
    from: string,
  ): Promise<boolean> {
    try {
      const erc165 = ERC165__factory.connect(
        assetContract,
        this.providerOrSigner,
      );

      // check for token approval
      const isERC721 = await erc165.supportsInterface(InterfaceId_IERC721);
      if (isERC721) {
        const asset = ERC721__factory.connect(
          assetContract,
          this.providerOrSigner,
        );

        const approved = await asset.isApprovedForAll(from, this.address);
        if (approved) {
          return true;
        }

        return (
          (await asset.getApproved(tokenId)).toLowerCase() ===
          this.address.toLowerCase()
        );
      } else {
        const asset = ERC1155__factory.connect(
          assetContract,
          this.providerOrSigner,
        );

        return await asset.isApprovedForAll(from, this.address);
      }
    } catch (err: any) {
      console.error("Failed to check if token is approved", err);
      return false;
    }
  }

  /**
   * Use this method to check if a direct listing is still valid.
   *
   * Ways a direct listing can become invalid:
   * 1. The asset holder transferred the asset to another wallet
   * 2. The asset holder burned the asset
   * 3. The asset holder removed the approval on the marketplace
   *
   * @internal
   * @param listing - The listing to check.
   * @returns - True if the listing is valid, false otherwise.
   */
  private async isStillValidDirectListing(
    listing: DirectListing,
    quantity?: BigNumberish,
  ): Promise<boolean> {
    const approved = await this.isTokenApprovedForMarketplace(
      listing.assetContractAddress,
      listing.tokenId,
      listing.sellerAddress,
    );

    if (!approved) {
      return false;
    }

    const erc165 = ERC165__factory.connect(
      listing.assetContractAddress,
      this.providerOrSigner,
    );

    // check for token approval
    const isERC721 = await erc165.supportsInterface(InterfaceId_IERC721);
    if (isERC721) {
      const asset = ERC721__factory.connect(
        listing.assetContractAddress,
        this.providerOrSigner,
      );
      // burned token would fail on ownerOf cuz invalid token
      const tokenOwnerAddress = await asset
        .ownerOf(listing.tokenId)
        .catch(() => AddressZero);
      return (
        tokenOwnerAddress.toLowerCase() === listing.sellerAddress.toLowerCase()
      );
    } else {
      const asset = ERC1155__factory.connect(
        listing.assetContractAddress,
        this.providerOrSigner,
      );
      const balance = await asset.balanceOf(
        listing.sellerAddress,
        listing.tokenId,
      );
      return balance.gte(quantity || listing.quantity);
    }
  }

  // TODO: Complete method implementation with subgraph
  // /**
  //  * @beta - This method is not yet complete.
  //  *
  //  * @param listingId
  //  * @returns
  //  */
  // public async getActiveOffers(listingId: BigNumberish): Promise<Offer[]> {
  //   const listing = await this.validateDirectListing(BigNumber.from(listingId));

  //   const offers = await this.readOnlyContract.offers(listing.id, "");

  //   return await Promise.all(
  //     offers.map(async (offer: any) => {
  //       return await this.mapOffer(BigNumber.from(listingId), offer);
  //     }),
  //   );
  // }

  /**
   * Used to verify fields in new listing.
   * @internal
   */
  private validateNewListingParam(param: NewDirectListing | NewAuctionListing) {
    invariant(
      param.assetContractAddress !== undefined &&
        param.assetContractAddress !== null,
      "Asset contract address is required",
    );
    invariant(
      param.buyoutPricePerToken !== undefined &&
        param.buyoutPricePerToken !== null,
      "Buyout price is required",
    );
    invariant(
      param.listingDurationInSeconds !== undefined &&
        param.listingDurationInSeconds !== null,
      "Listing duration is required",
    );
    invariant(
      param.startTimeInSeconds !== undefined &&
        param.startTimeInSeconds !== null,
      "Start time is required",
    );
    invariant(
      param.tokenId !== undefined && param.tokenId !== null,
      "Token ID is required",
    );
    invariant(
      param.quantity !== undefined && param.quantity !== null,
      "Quantity is required",
    );

    switch (param.type) {
      case "NewAuctionListing": {
        invariant(
          param.reservePricePerToken !== undefined &&
            param.reservePricePerToken !== null,
          "Reserve price is required",
        );
      }
    }
  }

  /**
   * Throws error if listing could not be found
   *
   * @param listingId - Listing to check for
   */
  private async validateDirectListing(
    listingId: BigNumber,
  ): Promise<DirectListing> {
    try {
      return await this.getDirectListing(listingId);
    } catch (err) {
      console.error(`Error getting the listing with id ${listingId}`);
      throw err;
    }
  }

  /**
   * Throws error if listing could not be found
   *
   * @param listingId - Listing to check for
   */
  private async validateAuctionListing(
    listingId: BigNumber,
  ): Promise<AuctionListing> {
    try {
      return await this.getAuctionListing(listingId);
    } catch (err) {
      console.error(`Error getting the listing with id ${listingId}`);
      throw err;
    }
  }

  /**
   * Maps a contract offer to the strict interface
   *
   * @internal
   * @param offer
   * @returns - An `Offer` object
   */
  private async mapOffer(listingId: BigNumber, offer: any): Promise<Offer> {
    return {
      quantity: offer.quantityDesired,
      pricePerToken: offer.pricePerToken,
      currencyContractAddress: offer.currency,
      buyerAddress: offer.offeror,
      quantityDesired: offer.quantityWanted,
      currencyValue: await getCurrencyValue(
        this.providerOrSigner,
        offer.currency,
        (offer.quantityWanted as BigNumber).mul(
          offer.pricePerToken as BigNumber,
        ),
      ),
      listingId,
    } as Offer;
  }

  public async getActiveOffer(
    listingId: BigNumberish,
    address: string,
  ): Promise<Offer | undefined> {
    this.validateDirectListing(BigNumber.from(listingId));
    invariant(isAddress(address), "Address must be a valid address");
    const offers = await this.readOnlyContract.offers(listingId, address);
    if (offers.offeror === AddressZero) {
      return undefined;
    }
    return await this.mapOffer(BigNumber.from(listingId), offers);
  }

  /**
   * Get Highest Bid
   *
   * @remarks Get the current highest bid of an active auction.
   *
   * @example
   * ```javascript
   * // The listing ID of the auction that closed
   * const listingId = 0;
   *
   * module
   *   .getWinningBid(listingId)
   *   .then((offer) => console.log(offer))
   *   .catch((err) => console.error(err));
   * ```
   */
  public async getWinningBid(
    listingId: BigNumberish,
  ): Promise<Offer | undefined> {
    this.validateAuctionListing(BigNumber.from(listingId));
    const offers = await this.readOnlyContract.winningBid(listingId);
    if (offers.offeror === AddressZero) {
      return undefined;
    }
    return await this.mapOffer(BigNumber.from(listingId), offers);
  }

  public async getBidBufferBps(): Promise<BigNumber> {
    return this.readOnlyContract.bidBufferBps();
  }

  public async getTimeBufferInSeconds(): Promise<BigNumber> {
    return await this.readOnlyContract.timeBuffer();
  }

  public async acceptDirectListingOffer(
    listingId: BigNumberish,
    addressOfOfferor: string,
  ): Promise<void> {
    /**
     * TODO:
     * - Provide better error handling if offer is too lower.
     */

    this.validateDirectListing(BigNumber.from(listingId));
    await this.sendTransaction("acceptOffer", [listingId, addressOfOfferor]);
  }

  /**
   * Buyout Auction
   *
   * @remarks Buy a specific direct listing from the marketplace.
   *
   * @example
   * ```javascript
   * // The listing ID of the asset you want to buy
   * const listingId = 0;
   *
   * await module.buyoutAuctionListing(listingId);
   * ```
   */
  public async buyoutAuctionListing(listingId: BigNumberish): Promise<void> {
    const listing = await this.validateAuctionListing(
      BigNumber.from(listingId),
    );

    await this.makeAuctionListingBid({
      listingId,
      pricePerToken: listing.buyoutPrice,
    });
  }

  /**
   * Buy Listing
   *
   * @remarks Buy a specific direct listing from the marketplace.
   *
   * @example
   * ```javascript
   * // The listing ID of the asset you want to buy
   * const listingId = 0;
   * // Quantity of the asset you want to buy
   * const quantityDesired = 1;
   *
   * await module.buyoutDirectListing({ listingId, quantityDesired });
   * ```
   */
  public async buyoutDirectListing(_buyout: {
    listingId: BigNumberish;
    quantityDesired: BigNumberish;
  }): Promise<void> {
    const listing = await this.validateDirectListing(
      BigNumber.from(_buyout.listingId),
    );

    const valid = await this.isStillValidDirectListing(
      listing,
      _buyout.quantityDesired,
    );

    if (!valid) {
      throw new Error(
        "The asset on this listing has been moved from the listers wallet, this listing is now invalid",
      );
    }

    const quantity = BigNumber.from(_buyout.quantityDesired);
    const value = BigNumber.from(listing.buyoutPrice).mul(quantity);
    const overrides = (await this.getCallOverrides()) || {};
    await this.setAllowance(value, listing.currencyContractAddress, overrides);

    if (await this.isNewBuy()) {
      await this.sendTransaction(
        "buy",
        [_buyout.listingId, quantity, listing.currencyContractAddress, value],
        overrides,
      );
    } else {
      // backward compatibility with old abi ftw
      await this.sendContractTransaction(
        new ethers.Contract(
          this.address,
          [
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_listingId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_quantityToBuy",
                  type: "uint256",
                },
              ],
              name: "buy",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
          ],
          this.providerOrSigner,
        ),
        "buy",
        [_buyout.listingId, quantity],
        overrides,
      );
    }
  }

  // TODO: Complete method implementation with subgraph
  // /**
  //  *
  //  * @beta - This method is not yet ready for production use
  //  *
  //  * @param _listingId - The listing ID to get active bids for
  //  */
  // public async getActiveBids(_listingId: BigNumberish): Promise<Offer[]> {
  //   throw new Error("Method not implemented.");
  // }

  public async updateDirectListing(listing: DirectListing): Promise<void> {
    await this.sendTransaction("updateListing", [
      listing.id,
      listing.quantity,
      // eslint-disable-next-line line-comment-position
      listing.buyoutPrice, // reserve price, doesn't matter for direct listing
      listing.buyoutPrice,
      listing.currencyContractAddress,
      listing.startTimeInSeconds,
      listing.secondsUntilEnd,
    ]);
  }

  public async updateAuctionListing(listing: AuctionListing): Promise<void> {
    await this.sendTransaction("updateListing", [
      listing.id,
      listing.quantity,
      listing.reservePrice,
      listing.buyoutPrice,
      listing.currencyContractAddress,
      listing.startTimeInEpochSeconds,
      listing.endTimeInEpochSeconds,
    ]);
  }

  /**
   * Cancel Direct Listing
   *
   * @remarks Cancel a direct listing on the marketplace
   *
   * @example
   * ```javascript
   * // The listing ID of the direct listing you want to cancel
   * const listingId = "0"
   *
   * await module.cancelDirectListing(listingId);
   * ```
   */
  public async cancelDirectListing(listingId: BigNumberish): Promise<void> {
    const listing = await this.validateDirectListing(BigNumber.from(listingId));
    listing.quantity = 0;
    await this.updateDirectListing(listing);
  }

  /**
   * Cancel Auction Listing
   *
   * @remarks Cancel an auction listing on the marketplace
   *
   * @example
   * ```javascript
   * // The listing ID of the auction listing you want to cancel
   * const listingId = "0"
   *
   * await module.cancelAuctionListing(listingId);
   * ```
   */
  public async cancelAuctionListing(listingId: BigNumberish): Promise<void> {
    const listing = await this.validateAuctionListing(
      BigNumber.from(listingId),
    );

    const now = BigNumber.from(Math.floor(Date.now() / 1000));
    const startTime = BigNumber.from(listing.startTimeInEpochSeconds);

    const offers = await this.readOnlyContract.winningBid(listingId);
    if (now.gt(startTime) && offers.offeror !== AddressZero) {
      throw new AuctionAlreadyStartedError(listingId.toString());
    }

    await this.sendTransaction("closeAuction", [
      BigNumber.from(listingId),
      await this.getSignerAddress(),
    ]);
  }

  public async closeAuctionListing(
    listingId: BigNumberish,
    closeFor?: string,
  ): Promise<void> {
    if (!closeFor) {
      closeFor = await this.getSignerAddress();
    }

    const listing = await this.validateAuctionListing(
      BigNumber.from(listingId),
    );

    try {
      await this.sendTransaction("closeAuction", [
        BigNumber.from(listingId),
        closeFor,
      ]);
    } catch (err: any) {
      if (err.message.includes("cannot close auction before it has ended")) {
        throw new AuctionHasNotEndedError(
          listingId.toString(),
          listing.endTimeInEpochSeconds.toString(),
        );
      } else {
        throw err;
      }
    }
  }

  public async setBidBufferBps(buffer: BigNumberish): Promise<void> {
    await this.onlyRoles(["admin"], await this.getSignerAddress());

    const timeBuffer = await this.getTimeBufferInSeconds();
    await this.sendTransaction("setAuctionBuffers", [
      timeBuffer,
      BigNumber.from(buffer),
    ]);
  }

  public async setTimeBufferInSeconds(buffer: BigNumberish): Promise<void> {
    await this.onlyRoles(["admin"], await this.getSignerAddress());

    const bidBuffer = await this.getBidBufferBps();
    await this.sendTransaction("setAuctionBuffers", [
      BigNumber.from(buffer),
      bidBuffer,
    ]);
  }

  public async buyoutListing(
    listingId: BigNumberish,
    quantityDesired?: BigNumberish,
  ): Promise<void> {
    const listing = await this.readOnlyContract.listings(listingId);
    if (listing.listingId.toString() !== listingId.toString()) {
      throw new ListingNotFoundError(this.address, listingId.toString());
    }

    switch (listing.listingType) {
      case ListingType.Direct: {
        invariant(
          quantityDesired !== undefined,
          "quantityDesired is required when buying out a direct listing",
        );
        return await this.buyoutDirectListing({ listingId, quantityDesired });
      }
      case ListingType.Auction: {
        return await this.buyoutAuctionListing(listingId);
      }
    }
  }

  public async getListing(
    listingId: BigNumberish,
  ): Promise<AuctionListing | DirectListing> {
    const listing = await this.readOnlyContract.listings(listingId);
    if (listing.listingId.toString() !== listingId.toString()) {
      throw new ListingNotFoundError(this.address, listingId.toString());
    }

    switch (listing.listingType) {
      case ListingType.Auction: {
        return await this.mapAuctionListing(listing);
      }
      case ListingType.Direct: {
        return await this.mapDirectListing(listing);
      }
      default: {
        throw new Error(`Unknown listing type: ${listing.listingType}`);
      }
    }
  }

  public async getAllListings(
    filter?: MarketplaceFilter,
  ): Promise<(AuctionListing | DirectListing)[]> {
    let rawListings = await this.getAllListingsNoFilter();

    if (filter) {
      if (filter.seller) {
        rawListings = rawListings.filter(
          (seller) =>
            seller.sellerAddress.toString().toLowerCase() ===
            filter?.seller?.toString().toLowerCase(),
        );
      }
      if (filter.tokenContract) {
        if (!filter.tokenId) {
          rawListings = rawListings.filter(
            (tokenContract) =>
              tokenContract.assetContractAddress.toString().toLowerCase() ===
              filter?.tokenContract?.toString().toLowerCase(),
          );
        } else {
          rawListings = rawListings.filter(
            (tokenContract) =>
              tokenContract.assetContractAddress.toString().toLowerCase() ===
                filter?.tokenContract?.toString().toLowerCase() &&
              tokenContract.tokenId.toString() === filter?.tokenId?.toString(),
          );
        }
      }
      if (filter.start !== undefined) {
        const start = filter.start;
        rawListings = rawListings.filter((_, index) => index >= start);
        if (filter.count !== undefined && rawListings.length > filter.count) {
          rawListings = rawListings.slice(0, filter.count);
        }
      }
    }
    return rawListings.filter((l) => l !== undefined) as (
      | AuctionListing
      | DirectListing
    )[];
  }

  private async getAllListingsNoFilter(): Promise<
    (AuctionListing | DirectListing)[]
  > {
    const listings = await Promise.all(
      Array.from(
        Array((await this.readOnlyContract.totalListings()).toNumber()).keys(),
      ).map(async (i) => {
        let listing;

        try {
          listing = await this.getListing(i);
        } catch (err) {
          return undefined;
        }

        if (listing.type === ListingType.Auction) {
          return listing;
        }

        const valid = await this.isStillValidDirectListing(listing);
        if (!valid) {
          return undefined;
        }

        return listing;
      }),
    );
    return listings.filter((l) => l !== undefined) as (
      | AuctionListing
      | DirectListing
    )[];
  }

  public async isRestrictedListerRoleOnly(): Promise<boolean> {
    return this.readOnlyContract.restrictedListerRoleOnly();
  }

  public async setRestrictedListerRoleOnly(
    isRestricted: boolean,
  ): Promise<void> {
    await this.sendTransaction("setRestrictedListerRoleOnly", [isRestricted]);
  }

  public async allowListingFromSpecificAssetOnly(contractAddress: string) {
    if (!(await this.isV2())) {
      throw Error(
        "Not supported in this version of the contract, please upgrade",
      );
    }
    const encoded = [];
    const members = await this.getRoleMembers(RolesMap.asset);
    if (AddressZero in members) {
      encoded.push(
        this.contract.interface.encodeFunctionData("revokeRole", [
          getRoleHash(RolesMap.asset as Role),
          AddressZero,
        ]),
      );
    }
    encoded.push(
      this.contract.interface.encodeFunctionData("grantRole", [
        getRoleHash(RolesMap.asset as Role),
        contractAddress,
      ]),
    );

    await this.sendTransaction("multicall", [encoded]);
  }

  public async allowListingFromAnyAsset() {
    if (!(await this.isV2())) {
      throw Error(
        "Not supported in this version of the contract, please upgrade",
      );
    }
    const encoded = [];
    const members = await this.getRoleMembers(RolesMap.asset);
    for (const addr in members) {
      encoded.push(
        this.contract.interface.encodeFunctionData("revokeRole", [
          getRoleHash(RolesMap.asset as Role),
          addr,
        ]),
      );
    }
    encoded.push(
      this.contract.interface.encodeFunctionData("grantRole", [
        getRoleHash(RolesMap.asset as Role),
        AddressZero,
      ]),
    );
    await this.sendTransaction("multicall", [encoded]);
  }

  /**
   * @internal
   */
  private async isV2(): Promise<boolean> {
    const version = await this.readOnlyContract.VERSION();
    return version.toNumber() === 2;
  }

  /**
   * @internal
   */
  private async isNewBuy(): Promise<boolean> {
    await this.checkVersion();
    return this._isNewBuy;
  }

  /**
   * @internal
   */
  private async checkVersion() {
    if (this._shouldCheckVersion) {
      try {
        await this.readOnlyContract.VERSION();
        this._isNewBuy = true;
      } catch (e) {
        this._isNewBuy = false;
      }

      this._shouldCheckVersion = false;
    }
  }
}
