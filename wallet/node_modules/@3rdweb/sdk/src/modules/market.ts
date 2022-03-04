import {
  ERC1155__factory,
  ERC165__factory,
  ERC20__factory,
  ERC721__factory,
  Market,
  Market__factory,
} from "@3rdweb/contracts";
import { AddressZero } from "@ethersproject/constants";
import { TransactionReceipt } from "@ethersproject/providers";
import { BigNumber, BigNumberish } from "ethers";
import {
  ModuleType,
  QuantityAboveLimitError,
  MissingOwnerRoleError,
  Role,
  RolesMap,
  MissingRoleError,
} from "../common";
import { InterfaceId_IERC721 } from "../common/contract";
import { CurrencyValue, getCurrencyValue } from "../common/currency";
import { invariant } from "../common/invariant";
import { getMetadataWithoutContract, NFTMetadata } from "../common/nft";
import { ModuleWithRoles } from "../core/module";
import { MetadataURIOrObject } from "../core/types";

/**
 * Filter options for the Market module.
 * @public
 */
export interface ListingFilter {
  seller?: string;
  tokenContract?: string;
  tokenId?: string;
}

/**
 * Metadata for items listed on a Market module.
 * @public
 */
export interface ListingMetadata {
  id: string;
  seller: string;
  tokenContract: string;
  tokenId: string;
  tokenMetadata?: NFTMetadata;
  quantity: BigNumber;
  tokensPerBuyer: BigNumber;
  currencyContract: string;
  currencyMetadata: CurrencyValue | null;
  price: BigNumber;
  saleStart: Date | null;
  saleEnd: Date | null;
}

/**
 * Access this module by calling {@link ThirdwebSDK.getMarketModule}
 * @public
 *
 * @deprecated
 */
export class MarketModule extends ModuleWithRoles<Market> {
  public static moduleType: ModuleType = ModuleType.MARKET;

  public static roles = [
    RolesMap.admin,
    RolesMap.lister,
    RolesMap.pauser,
  ] as const;

  /**
   * @override
   * @internal
   */
  protected getModuleRoles(): readonly Role[] {
    return MarketModule.roles;
  }

  /**
   * @internal
   */
  protected connectContract(): Market {
    return Market__factory.connect(this.address, this.providerOrSigner);
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return MarketModule.moduleType;
  }

  private async transformResultToListing(
    listing: any,
  ): Promise<ListingMetadata> {
    let currency: CurrencyValue | null = null;

    try {
      currency = await getCurrencyValue(
        this.providerOrSigner,
        listing.currency,
        listing.pricePerToken,
      );
      // eslint-disable-next-line no-empty
    } catch (e) {}

    let metadata: NFTMetadata | undefined = undefined;
    try {
      metadata = await getMetadataWithoutContract(
        this.providerOrSigner,
        listing.assetContract,
        listing.tokenId.toString(),
        this.sdk.getStorage(),
      );
      // eslint-disable-next-line no-empty
    } catch (e) {}

    return {
      id: listing.listingId.toString(),
      seller: listing.seller,
      tokenId: listing.tokenId.toString(),
      tokenContract: listing.assetContract,
      tokenMetadata: metadata,
      quantity: listing.quantity,
      price: listing.pricePerToken,
      currencyContract: listing.currency,
      tokensPerBuyer: listing.tokensPerBuyer,
      currencyMetadata: currency,
      saleStart: listing.saleStart.gt(0)
        ? new Date(listing.saleStart.toNumber() * 1000)
        : null,
      saleEnd:
        listing.saleEnd.gt(0) &&
        listing.saleEnd.lte(Number.MAX_SAFE_INTEGER - 1)
          ? new Date(listing.saleEnd.toNumber() * 1000)
          : null,
    };
  }

  /**
   * @deprecated Use {@link MarketModule.get} instead.
   */
  public async getListing(listingId: string): Promise<ListingMetadata> {
    return await this.get(listingId);
  }

  /**
   * @deprecated Use {@link MarketModule.getAll} instead.
   */
  public async getAllListings(
    filter?: ListingFilter,
  ): Promise<ListingMetadata[]> {
    return await this.getAll(filter);
  }

  public async get(listingId: string): Promise<ListingMetadata> {
    const listing = await this.readOnlyContract.listings(listingId);
    return await this.transformResultToListing(listing);
  }

  public async getAll(filter?: ListingFilter): Promise<ListingMetadata[]> {
    let listings: any[] = [];

    if (!filter) {
      listings = listings.concat(await this.readOnlyContract.getAllListings());
    } else {
      if (filter.tokenContract && filter.tokenId) {
        listings = listings.concat(
          await this.readOnlyContract.getListingsByAsset(
            filter.tokenContract,
            filter.tokenId,
          ),
        );
      } else if (filter.seller) {
        listings = listings.concat(
          await this.readOnlyContract.getListingsBySeller(filter.seller),
        );
      } else if (filter.tokenContract) {
        listings = listings.concat(
          await this.readOnlyContract.getListingsByAssetContract(
            filter.tokenContract,
          ),
        );
      } else {
        listings = listings.concat(
          await this.readOnlyContract.getAllListings(),
        );
      }
    }

    listings = listings
      .filter((l) => {
        if (l.quantity.eq(0)) {
          return false;
        }
        if (filter) {
          const filterSeller = filter?.seller || "";
          const filterTokenContract = filter?.tokenContract || "";
          const filterTokenId = filter?.tokenId || "";

          if (
            filterSeller &&
            filterSeller.toLowerCase() !== l.seller.toLowerCase()
          ) {
            return false;
          }
          if (
            filterTokenContract &&
            filterTokenContract.toLowerCase() !== l.assetContract.toLowerCase()
          ) {
            return false;
          }
          if (
            filterTokenId &&
            filterTokenId.toLowerCase() !== l.tokenId.toString().toLowerCase()
          ) {
            return false;
          }
        }
        return true;
      })
      .map((l) => this.transformResultToListing(l));
    return await Promise.all(listings);
  }

  public async getMarketFeeBps(): Promise<BigNumber> {
    return await this.readOnlyContract.marketFeeBps();
  }

  // write functions
  public async list(
    assetContract: string,
    tokenId: string,
    currencyContract: string,
    price: BigNumberish,
    quantity: BigNumberish,
    tokensPerBuyer: BigNumberish = 0,
    secondsUntilStart: BigNumberish = 0,
    secondsUntilEnd: BigNumberish = 0,
  ): Promise<ListingMetadata> {
    try {
      const from = await this.getSignerAddress();
      const erc165 = ERC165__factory.connect(
        assetContract,
        this.providerOrSigner,
      );
      invariant(quantity > 0, "quantity must be greater than 0");
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

      const receipt = await this.sendTransaction("list", [
        assetContract,
        tokenId,
        currencyContract,
        price,
        quantity,
        tokensPerBuyer,
        secondsUntilStart,
        secondsUntilEnd,
      ]);
      const event = this.parseEventLogs("NewListing", receipt?.logs);
      const listing = event?.listing;
      return await this.transformResultToListing(listing);
    } catch (e) {
      const signer = await this.getSignerAddress();
      if (
        (await this.sdk.getNFTModule(assetContract).ownerOf(tokenId)) !== signer
      ) {
        throw new MissingOwnerRoleError();
      } else if (
        (await this.readOnlyContract.restrictedListerRoleOnly()) &&
        !(signer in (await this.getRoleMembers("lister"))) &&
        !(signer in (await this.getRoleMembers("admin")))
      ) {
        throw new MissingRoleError(signer, "lister");
      }
      throw e;
    }
  }

  public async unlistAll(listingId: string) {
    const maxQuantity = (await this.get(listingId)).quantity;
    await this.unlist(listingId, maxQuantity);
  }

  public async unlist(listingId: string, quantity: BigNumberish) {
    await this.sendTransaction("unlist", [listingId, quantity]);
  }

  public async setRestrictedListerRoleOnly(restricted: boolean) {
    await this.sendTransaction("setRestrictedListerRoleOnly", [restricted]);
  }

  public async buy(
    listingId: string,
    quantity: BigNumberish,
  ): Promise<ListingMetadata> {
    try {
      const listing = await this.get(listingId);
      const owner = await this.getSignerAddress();
      const spender = this.address;
      const totalPrice = listing.price.mul(BigNumber.from(quantity));
      if (
        listing.currencyContract &&
        listing.currencyContract !== AddressZero
      ) {
        const erc20 = ERC20__factory.connect(
          listing.currencyContract,
          this.providerOrSigner,
        );
        const allowance = await erc20.allowance(owner, spender);
        if (allowance.lt(totalPrice)) {
          await this.sendContractTransaction(erc20, "approve", [
            spender,
            allowance.add(totalPrice),
          ]);
        }
      }

      const receipt = await this.sendTransaction("buy", [listingId, quantity]);
      const event = this.parseEventLogs("NewSale", receipt?.logs);
      return await this.transformResultToListing(event?.listing);
    } catch (e) {
      const tokensPerBuyer = (
        await this.get(listingId)
      ).tokensPerBuyer.toNumber();
      if (quantity > tokensPerBuyer) {
        throw new QuantityAboveLimitError(tokensPerBuyer.toString());
      }
      throw e;
    }
  }

  // owner functions
  public async setModuleMetadata(
    metadata: MetadataURIOrObject,
  ): Promise<TransactionReceipt> {
    const uri = await this.sdk.getStorage().uploadMetadata(metadata);
    return await this.sendTransaction("setContractURI", [uri]);
  }

  public async setMarketFeeBps(fee: number): Promise<TransactionReceipt> {
    return await this.sendTransaction("setMarketFeeBps", [fee]);
  }
}
