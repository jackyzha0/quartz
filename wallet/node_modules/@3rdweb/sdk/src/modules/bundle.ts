import {
  ERC20__factory,
  ERC721__factory,
  NFTCollection as NFTBundleContract,
  NFTCollection__factory,
} from "@3rdweb/contracts";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { TransactionReceipt } from "@ethersproject/providers";
import { BytesLike } from "ethers";
import { ModuleType, Role, RolesMap } from "../common";
import { getTokenMetadata, NFTMetadata } from "../common/nft";
import { ModuleWithRoles } from "../core/module";
import { MetadataURIOrObject } from "../core/types";
import { ITransferable } from "../interfaces/contracts/ITransferable";
import { UnderlyingType } from "./pack";

/**
 * @beta
 */

export interface BundleMetadata {
  creator: string;
  supply: BigNumber;
  metadata: NFTMetadata;
  ownedByAddress: BigNumber;
  underlyingType: UnderlyingType;
}

export interface CollectionMetadata {
  creator: string;
  supply: BigNumber;
  metadata: NFTMetadata;
  ownedByAddress: BigNumber;
}

/**
 * @beta
 */

export interface INFTBundleCreateArgs {
  metadata: MetadataURIOrObject;
  supply: BigNumberish;
}
export interface INFTCollectionCreateArgs {
  metadata: MetadataURIOrObject;
  supply: BigNumberish;
}

/**
 * @beta
 */

export interface INFTCollectionBatchArgs {
  tokenId: BigNumberish;
  amount: BigNumberish;
}

export interface INFTBundleBatchArgs {
  tokenId: BigNumberish;
  amount: BigNumberish;
}

/**
 * Create a collection of NFTs that lets you optionally mint multiple copies of each NFT.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@3rdweb/sdk";
 *
 * // You can switch out this provider with any wallet or provider setup you like.
 * const provider = ethers.Wallet.createRandom();
 * const sdk = new ThirdwebSDK(provider);
 * const module = sdk.getBundleModule("{{module_address}}");
 * ```
 *
 * @public
 */
export class BundleModule
  extends ModuleWithRoles<NFTBundleContract>
  implements ITransferable
{
  public static moduleType: ModuleType = ModuleType.BUNDLE;

  public static roles = [
    RolesMap.admin,
    RolesMap.minter,
    RolesMap.pauser,
    RolesMap.transfer,
  ] as const;

  /**
   * @override
   * @internal
   */
  protected getModuleRoles(): readonly Role[] {
    return BundleModule.roles;
  }

  /**
   * @internal
   */
  protected connectContract(): NFTBundleContract {
    return NFTCollection__factory.connect(this.address, this.providerOrSigner);
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return BundleModule.moduleType;
  }

  /**
   *
   * Get a single bundle item by tokenId.
   * @param tokenId - the unique token id of the nft
   * @returns A promise that resolves to a `BundleMetadata`.
   */
  public async get(tokenId: string, address?: string): Promise<BundleMetadata> {
    const [metadata, supply, ownedByAddress, state] = await Promise.all([
      getTokenMetadata(this.readOnlyContract, tokenId, this.sdk.getStorage()),
      this.readOnlyContract
        .totalSupply(tokenId)
        .catch(() => BigNumber.from("0")),
      address ? (await this.balanceOf(address, tokenId)).toNumber() : 0,
      this.readOnlyContract.tokenState(tokenId),
    ]);
    return {
      creator: state.creator,
      supply,
      metadata,
      ownedByAddress: BigNumber.from(ownedByAddress),
      underlyingType: state.underlyingType,
    };
  }

  /**
   * Get NFT Data
   *
   * @remarks Get data associated with NFTs in this module.
   *
   * @example
   * ```javascript
   * // You can get every NFT in the module
   * const nfts = await module.getAll();
   * console.log(nfts);
   *
   * // Or you can get optionally get the NFTs owned by a specific wallet
   * const address = "{{wallet_address}}"; // The address you want to get the NFTs for;
   * const ownedNfts = await module.getAll(address);
   * console.log(ownedNfts);
   * ```
   *
   * @returns The NFT metadata for all NFTs in the module.
   */
  public async getAll(address?: string): Promise<BundleMetadata[]> {
    const maxId = (await this.readOnlyContract.nextTokenId()).toNumber();
    return await Promise.all(
      Array.from(Array(maxId).keys()).map((i) =>
        this.get(i.toString(), address),
      ),
    );
  }

  /**
   * Get NFT Balance
   *
   * @remarks Get a wallets NFT balance (number of a specific NFT in this module owned by the wallet).
   *
   * @example
   * ```javascript
   * // Address of the wallet to check NFT balance
   * const address = "{{wallet_address}}";
   * // The token ID of the NFT you want to check the wallets balance of
   * const tokenId = "0"
   *
   * const balance = await module.balanceOf(address, tokenId);
   * console.log(balance);
   * ```
   */
  public async balanceOf(address: string, tokenId: string): Promise<BigNumber> {
    return await this.readOnlyContract.balanceOf(address, tokenId);
  }

  public async balance(tokenId: string): Promise<BigNumber> {
    return await this.readOnlyContract.balanceOf(
      await this.getSignerAddress(),
      tokenId,
    );
  }

  public async isApproved(
    address: string,
    operator: string,
    assetContract?: string,
    assetId?: BigNumberish,
  ): Promise<boolean> {
    if (!assetContract) {
      return await this.readOnlyContract.isApprovedForAll(address, operator);
    }
    if (!assetId) {
      throw new Error("tokenId is required");
    }
    const contract = ERC721__factory.connect(
      assetContract,
      this.providerOrSigner,
    );
    const approved = await contract.isApprovedForAll(
      await this.getSignerAddress(),
      this.address,
    );
    const isTokenApproved =
      (await contract.getApproved(assetId)).toLowerCase() ===
      this.address.toLowerCase();
    return approved || isTokenApproved;
  }

  // write functions
  public async setApproval(
    operator: string,
    approved = true,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("setApprovalForAll", [
      operator,
      approved,
    ]);
  }

  /**
   * Transfer NFT
   *
   * @remarks Transfer an NFT from the connected wallet to another wallet.
   *
   * @example
   * ```javascript
   * // Address of the wallet you want to send the NFT to
   * const toAddress = "0x...";
   *
   * // The token ID of the NFT you want to send
   * const tokenId = "0";
   *
   * // The number of NFTs you want to send
   * const amount = 1;
   *
   * await module.transfer(toAddress, tokenId, amount);
   * ```
   */
  public async transfer(
    to: string,
    tokenId: string,
    amount: BigNumberish,
  ): Promise<TransactionReceipt> {
    return await this.transferFrom(
      await this.getSignerAddress(),
      to,
      { tokenId, amount },
      [0],
    );
  }

  // owner functions
  public async create(metadata: MetadataURIOrObject): Promise<BundleMetadata> {
    return (await this.createBatch([metadata]))[0];
  }

  public async createBatch(
    metadatas: MetadataURIOrObject[],
  ): Promise<BundleMetadata[]> {
    const metadataWithSupply = metadatas.map((m) => ({
      metadata: m,
      supply: 0,
    }));
    return this.createAndMintBatch(metadataWithSupply);
  }

  /**
   * Mint NFT
   *
   * @remarks Mint an NFT with a specified supply.
   *
   * @example
   * ```javascript
   * // Custom metadata of the NFT, note that you can fully customize this metadata with other properties.
   * const metadata = {
   *   name: "Cool NFT",
   *   description: "This is a cool NFT",
   *   image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
   * }
   *
   * const metadataWithSupply = {
   *   metadata,
   *   supply: 1, // The number of this NFT you want to mint
   * }
   *
   * await module.createAndMint(metadataWithSupply);
   * ```
   */
  public async createAndMint(
    metadataWithSupply: INFTBundleCreateArgs,
  ): Promise<BundleMetadata> {
    return (await this.createAndMintBatch([metadataWithSupply]))[0];
  }

  /**
   * Mint Many NFTs
   *
   * @remarks Mint many different NFTs with specified supplies.
   *
   * @example
   * ```javascript
   * // Custom metadata and supplies of your NFTs
   * const metadataWithSupply = [{
   *   supply: 1, // The number of this NFT you want to mint
   *   metadata: {
   *     name: "Cool NFT #1",
   *     description: "This is a cool NFT",
   *     image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
   *   },
   * }, {
   *   supply: 1,
   *   metadata: {
   *     name: "Cool NFT #2",
   *     description: "This is a cool NFT",
   *     image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
   *   },
   * }];
   *
   * await module.createAndMintBatch(metadataWithSupply);
   * ```
   */
  public async createAndMintBatch(
    metadataWithSupply: INFTBundleCreateArgs[],
  ): Promise<BundleMetadata[]> {
    const metadatas = metadataWithSupply.map((a) => a.metadata);
    const { metadataUris: uris } = await this.sdk
      .getStorage()
      .uploadMetadataBatch(metadatas);
    const supplies = metadataWithSupply.map((a) => a.supply);
    const to = await this.getSignerAddress();
    const receipt = await this.sendTransaction("createNativeTokens", [
      to,
      uris,
      supplies,
      [0],
    ]);
    const event = this.parseEventLogs("NativeTokens", receipt?.logs);
    const tokenIds = event?.tokenIds;
    return await Promise.all(
      tokenIds.map((tokenId: BigNumber) => this.get(tokenId.toString())),
    );
  }

  public async createWithToken(
    tokenContract: string,
    tokenAmount: BigNumberish,
    args: INFTBundleCreateArgs,
  ) {
    const token = ERC20__factory.connect(tokenContract, this.providerOrSigner);
    const allowance = await token.allowance(
      await this.getSignerAddress(),
      this.address,
    );
    if (allowance < tokenAmount) {
      await token.increaseAllowance(this.address, tokenAmount);
    }
    const uri = await this.sdk.getStorage().uploadMetadata(args.metadata);
    await this.sendTransaction("wrapERC20", [
      tokenContract,
      tokenAmount,
      args.supply,
      uri,
    ]);
  }
  public async createWithErc20(
    tokenContract: string,
    tokenAmount: BigNumberish,
    args: INFTBundleCreateArgs,
  ) {
    return this.createWithToken(tokenContract, tokenAmount, args);
  }

  public async createWithNFT(
    tokenContract: string,
    tokenId: BigNumberish,
    metadata: MetadataURIOrObject,
  ) {
    const asset = ERC721__factory.connect(tokenContract, this.providerOrSigner);

    if (
      !(await asset.isApprovedForAll(
        await this.getSignerAddress(),
        this.address,
      ))
    ) {
      const isTokenApproved =
        (await asset.getApproved(tokenId)).toLowerCase() ===
        this.address.toLowerCase();
      if (!isTokenApproved) {
        await this.sendContractTransaction(asset, "setApprovalForAll", [
          this.address,
        ]);
      }
    }
    const uri = await this.sdk.getStorage().uploadMetadata(metadata);
    await this.sendTransaction("wrapERC721", [tokenContract, tokenId, uri]);
  }
  public async unwrapNFT(tokenId: BigNumberish): Promise<TransactionReceipt> {
    return await this.sendTransaction("redeemERC721", [tokenId]);
  }
  public async unwrapToken(
    tokenId: BigNumberish,
    amount: BigNumberish,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("redeemERC20", [tokenId, amount]);
  }

  public async createWithERC721(
    tokenContract: string,
    tokenId: BigNumberish,
    metadata: MetadataURIOrObject,
  ) {
    return this.createWithNFT(tokenContract, tokenId, metadata);
  }

  public async mint(args: INFTBundleBatchArgs) {
    await this.mintTo(await this.getSignerAddress(), args);
  }

  public async mintTo(
    to: string,
    args: INFTBundleBatchArgs,
    data: BytesLike = [0],
  ) {
    await this.sendTransaction("mint", [to, args.tokenId, args.amount, data]);
  }

  public async mintBatch(args: INFTBundleBatchArgs[]) {
    await this.mintBatchTo(await this.getSignerAddress(), args);
  }

  public async mintBatchTo(
    to: string,
    args: INFTBundleBatchArgs[],
    data: BytesLike = [0],
  ) {
    const ids = args.map((a) => a.tokenId);
    const amounts = args.map((a) => a.amount);
    await this.sendTransaction("mintBatch", [to, ids, amounts, data]);
  }

  /**
   * Burn NFT
   *
   * @remarks Burn an NFT, permanently taking it out of circulation and reducing the supply.
   *
   * @example
   * ```javascript
   * // The token ID of the NFT you want to burn
   * const tokenId = 0;
   * // The number of specified NFTs you want to burn
   * const amount = 1
   *
   * await module.burn({ tokenId, amount });
   * ```
   */
  public async burn(args: INFTBundleBatchArgs): Promise<TransactionReceipt> {
    return await this.burnFrom(await this.getSignerAddress(), args);
  }

  public async burnBatch(
    args: INFTBundleBatchArgs[],
  ): Promise<TransactionReceipt> {
    return await this.burnBatchFrom(await this.getSignerAddress(), args);
  }

  public async burnFrom(
    account: string,
    args: INFTBundleBatchArgs,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("burn", [
      account,
      args.tokenId,
      args.amount,
    ]);
  }

  public async burnBatchFrom(
    account: string,
    args: INFTBundleBatchArgs[],
  ): Promise<TransactionReceipt> {
    const ids = args.map((a) => a.tokenId);
    const amounts = args.map((a) => a.amount);
    return await this.sendTransaction("burnBatch", [account, ids, amounts]);
  }

  public async transferFrom(
    from: string,
    to: string,
    args: INFTBundleBatchArgs,
    data: BytesLike = [0],
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("safeTransferFrom", [
      from,
      to,
      args.tokenId,
      args.amount,
      data,
    ]);
  }

  /**
   * Transfer Many NFTs
   *
   * @remarks Transfer NFTs from the one wallet to another.
   *
   * @example
   * ```javascript
   * // Address of the wallet to send the NFT from
   * const fromAddress = "{{wallet_address}}";
   * // Address of the wallet you want to send the NFT to
   * const toAddress = "0x...";
   *
   * // The data of the NFTs you want to send
   * const data = [{
   *   tokenId: 1, // The token ID of the NFT you want to send
   *   amount: 1, // The number of this NFT you want to send
   * }, {
   *   tokenId: 2,
   *   amount: 1,
   * }]
   *
   * // Note that the connected wallet must have approval to transfer the tokens of the fromAddress
   * await module.transferBatchFrom(fromAddress, toAddress, data);
   * ```
   */

  public async transferBatchFrom(
    from: string,
    to: string,
    args: INFTBundleBatchArgs[],
    data: BytesLike = [0],
  ): Promise<TransactionReceipt> {
    const ids = args.map((a) => a.tokenId);
    const amounts = args.map((a) => a.amount);
    return await this.sendTransaction("safeBatchTransferFrom", [
      from,
      to,
      ids,
      amounts,
      data,
    ]);
  }

  public async setRoyaltyBps(amount: number): Promise<TransactionReceipt> {
    // TODO: reduce this duplication and provide common functions around
    // royalties through an interface. Currently this function is
    // duplicated across 4 modules
    const { metadata } = await this.getMetadata(false);
    const encoded: string[] = [];
    if (!metadata) {
      throw new Error("No metadata found, this module might be invalid!");
    }

    metadata.seller_fee_basis_points = amount;
    const uri = await this.sdk.getStorage().uploadMetadata(
      {
        ...metadata,
      },
      this.address,
      await this.getSignerAddress(),
    );
    encoded.push(
      this.contract.interface.encodeFunctionData("setRoyaltyBps", [amount]),
    );
    encoded.push(
      this.contract.interface.encodeFunctionData("setContractURI", [uri]),
    );
    return await this.sendTransaction("multicall", [encoded]);
  }

  public async setModuleMetadata(
    metadata: MetadataURIOrObject,
  ): Promise<TransactionReceipt> {
    const uri = await this.sdk.getStorage().uploadMetadata(metadata);
    return await this.sendTransaction("setContractURI", [uri]);
  }

  /**
   * `getOwned` is a convenience method for getting all owned tokens
   * for a particular wallet.
   *
   * @param _address - The address to check for token ownership
   * @returns An array of BundleMetadata objects that are owned by the address
   */
  public async getOwned(_address?: string): Promise<BundleMetadata[]> {
    const address = _address ? _address : await this.getSignerAddress();
    const maxId = await this.readOnlyContract.nextTokenId();
    const balances = await this.readOnlyContract.balanceOfBatch(
      Array(maxId.toNumber()).fill(address),
      Array.from(Array(maxId.toNumber()).keys()),
    );

    const ownedBalances = balances
      .map((b, i) => {
        return {
          tokenId: i,
          balance: b,
        };
      })
      .filter((b) => b.balance.gt(0));
    return await Promise.all(
      ownedBalances.map(async (item) => {
        const token = await this.get(item.tokenId.toString());
        return { ...token, ownedByAddress: item.balance };
      }),
    );
  }

  /**
   * Gets the royalty BPS (basis points) of the contract
   *
   * @returns - The royalty BPS
   */
  public async getRoyaltyBps(): Promise<BigNumberish> {
    return await this.readOnlyContract.royaltyBps();
  }

  /**
   * Gets the address of the royalty recipient
   *
   * @returns - The royalty BPS
   */
  public async getRoyaltyRecipientAddress(): Promise<string> {
    const metadata = await this.getMetadata();
    if (metadata.metadata?.fee_recipient !== undefined) {
      return metadata.metadata.fee_recipient;
    }
    return "";
  }

  public async isTransferRestricted(): Promise<boolean> {
    return this.readOnlyContract.transfersRestricted();
  }

  public async setRestrictedTransfer(
    restricted = false,
  ): Promise<TransactionReceipt> {
    await this.onlyRoles(["admin"], await this.getSignerAddress());
    return await this.sendTransaction("setRestrictedTransfer", [restricted]);
  }
}
