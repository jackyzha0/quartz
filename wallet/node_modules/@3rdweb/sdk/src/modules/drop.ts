import {
  ERC20__factory,
  LazyMintERC721 as DropV2,
  LazyMintERC721__factory as DropV2__factory,
  LazyNFT as Drop,
  LazyNFT__factory as Drop__factory,
} from "@3rdweb/contracts";
import { ClaimConditionStructOutput } from "@3rdweb/contracts/dist/LazyMintERC721";
import { PublicMintConditionStruct } from "@3rdweb/contracts/dist/LazyNFT";
import { hexZeroPad } from "@ethersproject/bytes";
import { AddressZero } from "@ethersproject/constants";
import { TransactionReceipt } from "@ethersproject/providers";
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  Contract,
  ethers,
} from "ethers";
import { JsonConvert } from "json2typescript";
import {
  getCurrencyValue,
  isNativeToken,
  ModuleType,
  NATIVE_TOKEN_ADDRESS,
  Role,
  RolesMap,
} from "../common";
import { invariant } from "../common/invariant";
import { isMetadataEqual } from "../common/isMetadataEqual";
import { getTokenMetadata, NFTMetadata, NFTMetadataOwner } from "../common/nft";
import { ThirdwebSDK } from "../core";
import { ModuleWithRoles } from "../core/module";
import { MetadataURIOrObject, ProviderOrSigner } from "../core/types";
import { ClaimEligibility } from "../enums";
import ClaimConditionFactory from "../factories/ClaimConditionFactory";
import { ITransferable } from "../interfaces/contracts/ITransferable";
import { ISDKOptions } from "../interfaces/ISdkOptions";
import {
  ClaimCondition,
  PublicMintCondition,
} from "../types/claim-conditions/PublicMintCondition";
import { DEFAULT_QUERY_ALL_COUNT, QueryAllParams } from "../types/QueryParams";
import { Snapshot } from "../types/snapshots/Snapshot";

/**
 * @beta
 */
export interface CreatePublicMintCondition {
  startTimestampInSeconds?: BigNumberish;
  maxMintSupply: BigNumberish;
  quantityLimitPerTransaction?: BigNumberish;
  waitTimeSecondsLimitPerTransaction?: BigNumberish;
  pricePerToken?: BigNumberish;
  currency?: string;
  merkleRoot?: BytesLike;
}

/**
 * @internal
 */
const ABI_V1_22_0 = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "claimConditionIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quantityClaimed",
        type: "uint256",
      },
    ],
    name: "ClaimedTokens",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "_proofs",
        type: "bytes32[]",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

/**
 * @internal
 */
const ABI_V1_24_0 = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "startTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "baseURI",
        type: "string",
      },
    ],
    name: "LazyMintedTokens",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_baseURIForTokens",
        type: "string",
      },
    ],
    name: "lazyMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export interface BatchToReveal {
  batchId: BigNumber;
  batchUri: string;
  placeholderMetadata: NFTMetadata;
}

/**
 * Setup a collection of one-of-one NFTs that are minted as users claim them.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@3rdweb/sdk";
 *
 * // You can switch out this provider with any wallet or provider setup you like.
 * const provider = ethers.Wallet.createRandom();
 * const sdk = new ThirdwebSDK(provider);
 * const module = sdk.getDropModule("{{module_address}}");
 * ```
 *
 * @public
 */
export class DropModule
  extends ModuleWithRoles<DropV2>
  implements ITransferable
{
  private _shouldCheckVersion = true;
  private _isV0 = false;
  private _version = 0;
  private v1Module: DropV1Module;

  public static moduleType: ModuleType = ModuleType.DROP;

  public static roles = [
    RolesMap.admin,
    RolesMap.minter,
    RolesMap.transfer,
  ] as const;

  /**
   * @internal
   */
  constructor(
    providerOrSigner: ProviderOrSigner,
    address: string,
    options: ISDKOptions,
    sdk: ThirdwebSDK,
  ) {
    super(providerOrSigner, address, options, sdk);
    this.v1Module = new DropV1Module(providerOrSigner, address, options, sdk);
  }

  /**
   * @internal
   */
  public setProviderOrSigner(providerOrSigner: ProviderOrSigner) {
    super.setProviderOrSigner(providerOrSigner);
    this.v1Module?.setProviderOrSigner(providerOrSigner);
  }

  /**
   * @override
   * @internal
   */
  protected getModuleRoles(): readonly Role[] {
    return DropModule.roles;
  }

  /**
   * @internal
   */
  protected connectContract(): DropV2 {
    return DropV2__factory.connect(this.address, this.providerOrSigner);
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return DropModule.moduleType;
  }

  private async getTokenMetadata(tokenId: string): Promise<NFTMetadata> {
    return await getTokenMetadata(
      this.readOnlyContract,
      tokenId,
      this.sdk.getStorage(),
    );
  }

  public async get(tokenId: string): Promise<NFTMetadataOwner> {
    const [owner, metadata] = await Promise.all([
      this.ownerOf(tokenId).catch(() => AddressZero),
      this.getTokenMetadata(tokenId),
    ]);

    return { owner, metadata };
  }

  /**
   * Get All NFTs
   *
   * @remarks Get all the data associated with every NFT in this module.
   *
   * @example
   * ```javascript
   * const nfts = await module.getAll();
   * console.log(nfts);
   * ```
   *
   * @returns The NFT metadata for all NFTs in the module.
   */
  public async getAll(
    queryParams?: QueryAllParams,
  ): Promise<NFTMetadataOwner[]> {
    // if v1 module then use v1
    if (await this.isV0()) {
      return this.v1Module.getAll(queryParams);
    }
    const start = BigNumber.from(queryParams?.start || 0).toNumber();
    const count = BigNumber.from(
      queryParams?.count || DEFAULT_QUERY_ALL_COUNT,
    ).toNumber();
    const maxId = Math.min(
      (await this.readOnlyContract.nextTokenIdToMint()).toNumber(),
      start + count,
    );
    return await Promise.all(
      Array.from(Array(maxId - start).keys()).map((i) =>
        this.get((start + i).toString()),
      ),
    );
  }

  public async getAllUnclaimed(
    queryParams?: QueryAllParams,
  ): Promise<NFTMetadataOwner[]> {
    if (await this.isV0()) {
      return this.v1Module.getAllUnclaimed();
    }
    const start = BigNumber.from(queryParams?.start || 0).toNumber();
    const count = BigNumber.from(
      queryParams?.count || DEFAULT_QUERY_ALL_COUNT,
    ).toNumber();
    const maxId = BigNumber.from(
      Math.min(
        (await this.readOnlyContract.nextTokenIdToMint()).toNumber(),
        start + count,
      ),
    );
    const unmintedId = await this.readOnlyContract.nextTokenIdToClaim();
    return (
      await Promise.all(
        Array.from(Array(maxId.sub(unmintedId).toNumber()).keys()).map((i) =>
          this.getTokenMetadata(unmintedId.add(i).toString()),
        ),
      )
    ).map((metadata) => ({ owner: AddressZero, metadata }));
  }

  public async getAllClaimed(
    queryParams?: QueryAllParams,
  ): Promise<NFTMetadataOwner[]> {
    if (await this.isV0()) {
      return this.v1Module.getAllClaimed();
    }
    const start = BigNumber.from(queryParams?.start || 0).toNumber();
    const count = BigNumber.from(
      queryParams?.count || DEFAULT_QUERY_ALL_COUNT,
    ).toNumber();
    const maxId = Math.min(
      (await this.readOnlyContract.nextTokenIdToClaim()).toNumber(),
      start + count,
    );
    return await Promise.all(
      Array.from(Array(maxId).keys()).map((i) => this.get(i.toString())),
    );
  }

  public async ownerOf(tokenId: string): Promise<string> {
    return await this.readOnlyContract.ownerOf(tokenId);
  }

  public async getDefaultSaleRecipient(): Promise<string> {
    return await this.readOnlyContract.defaultSaleRecipient();
  }

  public async setDefaultSaleRecipient(
    recipient: string,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("setDefaultSaleRecipient", [recipient]);
  }

  /**
   * Get Owned NFTs
   *
   * @remarks Get all the data associated with the NFTs owned by a specific wallet.
   *
   * @example
   * ```javascript
   * // Address of the wallet to get the NFTs of
   * const address = "{{wallet_address}}";
   * const nfts = await module.getOwned(address);
   * console.log(nfts);
   * ```
   *
   * @returns The NFT metadata for all NFTs in the module.
   */
  public async getOwned(_address?: string): Promise<NFTMetadataOwner[]> {
    const address = _address ? _address : await this.getSignerAddress();
    const balance = await this.readOnlyContract.balanceOf(address);
    const indices = Array.from(Array(balance.toNumber()).keys());
    const tokenIds = await Promise.all(
      indices.map((i) => this.readOnlyContract.tokenOfOwnerByIndex(address, i)),
    );
    return await Promise.all(
      tokenIds.map((tokenId) => this.get(tokenId.toString())),
    );
  }

  /**
   * @deprecated - For backward compatibility reason
   */
  private transformResultToMintCondition(
    pm: ClaimConditionStructOutput,
  ): PublicMintCondition {
    return {
      startTimestamp: pm.startTimestamp,
      maxMintSupply: pm.maxClaimableSupply,
      currentMintSupply: pm.supplyClaimed,
      quantityLimitPerTransaction: pm.quantityLimitPerTransaction,
      waitTimeSecondsLimitPerTransaction: pm.waitTimeInSecondsBetweenClaims,
      pricePerToken: pm.pricePerToken,
      currency: pm.currency,
      merkleRoot: pm.merkleRoot,
    };
  }

  private async transformResultToClaimCondition(
    pm: ClaimConditionStructOutput,
  ): Promise<ClaimCondition> {
    const cv = await getCurrencyValue(
      this.providerOrSigner,
      pm.currency,
      pm.pricePerToken,
    );
    return {
      startTimestamp: new Date(
        BigNumber.from(pm.startTimestamp).toNumber() * 1000,
      ),
      maxMintSupply: pm.maxClaimableSupply.toString(),
      currentMintSupply: pm.supplyClaimed.toString(),
      availableSupply: BigNumber.from(pm.maxClaimableSupply)
        .sub(pm.supplyClaimed)
        .toString(),
      quantityLimitPerTransaction: pm.quantityLimitPerTransaction.toString(),
      waitTimeSecondsLimitPerTransaction:
        pm.waitTimeInSecondsBetweenClaims.toString(),
      price: BigNumber.from(pm.pricePerToken),
      pricePerToken: BigNumber.from(pm.pricePerToken),
      currency: pm.currency,
      currencyContract: pm.currency,
      currencyMetadata: cv,
      merkleRoot: pm.merkleRoot,
    };
  }

  /**
   * @deprecated - Use {@link DropModule.getActiveClaimCondition} instead
   */
  public async getActiveMintCondition(): Promise<PublicMintCondition> {
    if (await this.isV0()) {
      return this.v1Module.getActiveMintCondition();
    }
    const index = await this.readOnlyContract.getIndexOfActiveCondition();
    return this.transformResultToMintCondition(
      await this.readOnlyContract.getClaimConditionAtIndex(index),
    );
  }

  public async getActiveClaimCondition(): Promise<ClaimCondition> {
    if (await this.isV0()) {
      return this.v1Module.getActiveClaimCondition();
    }
    const index = await this.readOnlyContract.getIndexOfActiveCondition();
    const mc = await this.readOnlyContract.getClaimConditionAtIndex(index);
    return await this.transformResultToClaimCondition(mc);
  }

  /**
   * @deprecated - Use {@link DropModule.getAllClaimConditions} instead
   */
  public async getAllMintConditions(): Promise<PublicMintCondition[]> {
    if (await this.isV0()) {
      return this.v1Module.getAllMintConditions();
    }

    const claimCondition = await this.readOnlyContract.claimConditions();
    const count = claimCondition.totalConditionCount.toNumber();
    const conditions = [];

    for (let i = 0; i < count; i++) {
      conditions.push(
        this.transformResultToMintCondition(
          await this.readOnlyContract.getClaimConditionAtIndex(i),
        ),
      );
    }

    return conditions;
  }

  public async getAllClaimConditions(): Promise<ClaimCondition[]> {
    if (await this.isV0()) {
      return this.v1Module.getAllClaimConditions();
    }
    const claimCondition = await this.readOnlyContract.claimConditions();
    const count = claimCondition.totalConditionCount.toNumber();
    const conditions = [];
    for (let i = 0; i < count; i++) {
      conditions.push(await this.readOnlyContract.getClaimConditionAtIndex(i));
    }
    return Promise.all(
      conditions.map((c) => this.transformResultToClaimCondition(c)),
    );
  }

  public async totalSupply(): Promise<BigNumber> {
    if (await this.isV0()) {
      return this.v1Module.totalSupply();
    }
    return await this.readOnlyContract.nextTokenIdToMint();
  }

  /**
   * @internal
   */
  public async maxTotalSupply(): Promise<BigNumber> {
    if (await this.isV0()) {
      return this.v1Module.maxTotalSupply();
    }
    return await this.readOnlyContract.nextTokenIdToMint();
  }

  public async totalUnclaimedSupply(): Promise<BigNumber> {
    if (await this.isV0()) {
      return this.v1Module.totalUnclaimedSupply();
    }
    return (await this.readOnlyContract.nextTokenIdToMint()).sub(
      await this.totalClaimedSupply(),
    );
  }

  public async totalClaimedSupply(): Promise<BigNumber> {
    if (await this.isV0()) {
      return this.v1Module.totalClaimedSupply();
    }
    return await this.readOnlyContract.nextTokenIdToClaim();
  }

  /**
   * Get NFT Balance
   *
   * @remarks Get a wallets NFT balance (number of NFTs in this module owned by the wallet).
   *
   * @example
   * ```javascript
   * // Address of the wallet to check NFT balance
   * const address = "{{wallet_address}}";
   *
   * const balance = await module.balanceOf(address);
   * console.log(balance);
   * ```
   */
  public async balanceOf(address: string): Promise<BigNumber> {
    return await this.readOnlyContract.balanceOf(address);
  }

  public async balance(): Promise<BigNumber> {
    return await this.balanceOf(await this.getSignerAddress());
  }

  public async isApproved(address: string, operator: string): Promise<boolean> {
    return await this.readOnlyContract.isApprovedForAll(address, operator);
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
   * const toAddress = "{{wallet_address}}";
   *
   * // The token ID of the NFT you want to send
   * const tokenId = "0";
   *
   * await module.transfer(toAddress, tokenId);
   * ```
   */
  public async transfer(
    to: string,
    tokenId: string,
  ): Promise<TransactionReceipt> {
    const from = await this.getSignerAddress();
    return await this.sendTransaction(
      "safeTransferFrom(address,address,uint256)",
      [from, to, tokenId],
    );
  }

  /**
   * @deprecated - The function has been deprecated. Use `createBatch` instead.
   */
  public async lazyMint(metadata: MetadataURIOrObject) {
    if (await this.isV0()) {
      await this.v1Module.lazyMint(metadata);
      return;
    }
    await this.createBatch([metadata]);
  }

  /**
   * @deprecated - The function has been deprecated. Use `createBatch` instead.
   */
  public async lazyMintBatch(metadatas: MetadataURIOrObject[]) {
    if (await this.isV0()) {
      await this.v1Module.lazyMintBatch(metadatas);
      return;
    }
    await this.createBatch(metadatas);
  }

  /**
   * @deprecated - Use {@link DropModule.setClaimCondition} instead
   */
  public async setMintConditions(factory: ClaimConditionFactory) {
    if (await this.isV0()) {
      return this.v1Module.setMintConditions(factory);
    }
    return this.setClaimCondition(factory);
  }

  /**
   * @deprecated - Use {@link DropModule.setClaimCondition} instead
   */
  public async setClaimConditions(factory: ClaimConditionFactory) {
    return this.setClaimCondition(factory);
  }

  /**
   * Sets public mint conditions for the next minting using the
   * claim condition factory.
   *
   * @param factory - The claim condition factory.
   */
  public async setClaimCondition(factory: ClaimConditionFactory) {
    if (await this.isV0()) {
      return this.v1Module.setClaimCondition(factory);
    }
    const conditions = (await factory.buildConditions()).map((c) => ({
      startTimestamp: c.startTimestamp,
      maxClaimableSupply: c.maxMintSupply,
      supplyClaimed: 0,
      quantityLimitPerTransaction: c.quantityLimitPerTransaction,
      waitTimeInSecondsBetweenClaims: c.waitTimeSecondsLimitPerTransaction,
      pricePerToken: c.pricePerToken,
      currency: c.currency === AddressZero ? NATIVE_TOKEN_ADDRESS : c.currency,
      merkleRoot: c.merkleRoot,
    }));

    const merkleInfo: { [key: string]: string } = {};
    factory.allSnapshots().forEach((s) => {
      merkleInfo[s.merkleRoot] = s.snapshotUri;
    });

    const { metadata } = await this.getMetadata(false);
    invariant(metadata, "Metadata is not set, this should never happen");
    const oldMerkle = metadata["merkle"];

    const defaultMerkleRoot = hexZeroPad([0], 32).toString();

    if (factory.allSnapshots().length > 0) {
      metadata["merkle"] = merkleInfo;
    } else if (
      conditions.filter((c) => c.merkleRoot !== defaultMerkleRoot).length === 0
    ) {
      metadata["merkle"] = {};
    }

    const encoded = [];
    if (!isMetadataEqual(oldMerkle, metadata["merkle"])) {
      const metadataUri = await this.sdk
        .getStorage()
        .upload(JSON.stringify(metadata));
      encoded.push(
        this.contract.interface.encodeFunctionData("setContractURI", [
          metadataUri,
        ]),
      );
    }
    encoded.push(
      this.contract.interface.encodeFunctionData("setClaimConditions", [
        conditions,
      ]),
    );

    return await this.sendTransaction("multicall", [encoded]);
  }

  public async updateClaimConditions(factory: ClaimConditionFactory) {
    if (await this.isV0()) {
      return this.v1Module.setClaimCondition(factory);
    }
    const conditions = (await factory.buildConditions()).map((c) => ({
      startTimestamp: c.startTimestamp,
      maxClaimableSupply: c.maxMintSupply,
      supplyClaimed: 0,
      quantityLimitPerTransaction: c.quantityLimitPerTransaction,
      waitTimeInSecondsBetweenClaims: c.waitTimeSecondsLimitPerTransaction,
      pricePerToken: c.pricePerToken,
      currency: c.currency === AddressZero ? NATIVE_TOKEN_ADDRESS : c.currency,
      merkleRoot: c.merkleRoot,
    }));

    const merkleInfo: { [key: string]: string } = {};
    factory.allSnapshots().forEach((s) => {
      merkleInfo[s.merkleRoot] = s.snapshotUri;
    });
    const encoded = [];
    const { metadata } = await this.getMetadata(false);
    invariant(metadata, "Metadata is not set, this should never happen");
    const oldMerkle = metadata["merkle"];

    if (factory.allSnapshots().length === 0 && "merkle" in metadata) {
      metadata["merkle"] = {};
    } else {
      metadata["merkle"] = merkleInfo;
    }

    if (!isMetadataEqual(oldMerkle, metadata["merkle"])) {
      const metadataUri = await this.sdk
        .getStorage()
        .upload(JSON.stringify(metadata));
      encoded.push(
        this.contract.interface.encodeFunctionData("setContractURI", [
          metadataUri,
        ]),
      );
    }

    encoded.push(
      this.contract.interface.encodeFunctionData("updateClaimConditions", [
        conditions,
      ]),
    );

    return await this.sendTransaction("multicall", [encoded]);
  }
  /**
   * Creates a claim condition factory
   *
   * @returns - A new claim condition factory
   */
  public getClaimConditionsFactory(): ClaimConditionFactory {
    const createSnapshotFunc = this.sdk.createSnapshot.bind(this.sdk);
    const factory = new ClaimConditionFactory(createSnapshotFunc);
    return factory;
  }

  /**
   * @deprecated - Use the {@link DropModule.getClaimConditionsFactory} instead.
   */
  public getMintConditionsFactory(): ClaimConditionFactory {
    return this.getClaimConditionsFactory();
  }

  /**
   * @deprecated - Use the {@link DropModule.setClaimConditions} instead.
   */
  public async setPublicMintConditions(
    conditions: CreatePublicMintCondition[],
  ) {
    if (await this.isV0()) {
      return this.v1Module.setPublicMintConditions(conditions);
    }
    const now = BigNumber.from(Date.now()).div(1000);
    const _conditions = conditions.map((c) => ({
      startTimestamp: now.add(c.startTimestampInSeconds || 0),
      maxClaimableSupply: c.maxMintSupply,
      supplyClaimed: 0,
      quantityLimitPerTransaction:
        c.quantityLimitPerTransaction || c.maxMintSupply,
      waitTimeInSecondsBetweenClaims: c.waitTimeSecondsLimitPerTransaction || 0,
      pricePerToken: c.pricePerToken || 0,
      currency: c.currency || AddressZero,
      merkleRoot: c.merkleRoot || hexZeroPad([0], 32),
    }));
    await this.sendTransaction("setClaimConditions", [_conditions]);
  }

  /**
   * For any claim conditions that a particular wallet is violating,
   * this function returns human readable information about the
   * breaks in the condition that can be used to inform the user.
   *
   * @param quantity - The desired quantity that would be claimed.
   *
   */
  public async getClaimIneligibilityReasons(
    quantity: BigNumberish,
    addressToCheck?: string,
  ): Promise<ClaimEligibility[]> {
    const reasons: ClaimEligibility[] = [];
    let activeConditionIndex: BigNumber;
    let claimCondition: ClaimCondition;

    if (addressToCheck === undefined) {
      throw new Error("addressToCheck is required");
    }

    try {
      [activeConditionIndex, claimCondition] = await Promise.all([
        this.readOnlyContract.getIndexOfActiveCondition(),
        this.getActiveClaimCondition(),
      ]);
    } catch (err: any) {
      if ((err.message as string).includes("no public mint condition.")) {
        reasons.push(ClaimEligibility.NoActiveClaimPhase);
        return reasons;
      }
      console.error("Failed to get active claim condition", err);
      throw new Error("Failed to get active claim condition");
    }

    if (BigNumber.from(claimCondition.availableSupply).lt(quantity)) {
      reasons.push(ClaimEligibility.NotEnoughSupply);
    }

    // check for merkle root inclusion
    const merkleRootArray = ethers.utils.stripZeros(claimCondition.merkleRoot);
    if (merkleRootArray.length > 0) {
      const merkleLower = claimCondition.merkleRoot.toString();
      const proofs = await this.getClaimerProofs(merkleLower, addressToCheck);
      if (proofs.length === 0) {
        const hashedAddress = ethers.utils
          .keccak256(addressToCheck)
          .toLowerCase();
        if (hashedAddress !== merkleLower) {
          reasons.push(ClaimEligibility.AddressNotAllowed);
        }
      }
      // TODO: compute proofs to root, need browser compatibility
    }

    // check for claim timestamp between claims
    const timestampForNextClaim =
      await this.readOnlyContract.getTimestampForNextValidClaim(
        activeConditionIndex,
        addressToCheck,
      );

    const now = BigNumber.from(Date.now()).div(1000);
    if (now.lt(timestampForNextClaim)) {
      // if waitTimeSecondsLimitPerTransaction equals to timestampForNextClaim, that means that this is the first time this address claims this token
      if (
        BigNumber.from(claimCondition.waitTimeSecondsLimitPerTransaction).eq(
          timestampForNextClaim,
        )
      ) {
        const balance = await this.readOnlyContract.balanceOf(addressToCheck);
        if (balance.gte(1)) {
          reasons.push(ClaimEligibility.AlreadyClaimed);
        }
      } else {
        reasons.push(ClaimEligibility.WaitBeforeNextClaimTransaction);
      }
    }

    // check for wallet balance
    if (claimCondition.pricePerToken.gt(0)) {
      const totalPrice = claimCondition.pricePerToken.mul(quantity);
      if (isNativeToken(claimCondition.currency)) {
        const provider = await this.getProvider();
        const balance = await provider.getBalance(addressToCheck);
        if (balance.lt(totalPrice)) {
          reasons.push(ClaimEligibility.NotEnoughTokens);
        }
      } else {
        const provider = await this.getProvider();
        const balance = await ERC20__factory.connect(
          claimCondition.currency,
          provider,
        ).balanceOf(addressToCheck);
        if (balance.lt(totalPrice)) {
          reasons.push(ClaimEligibility.NotEnoughTokens);
        }
      }
    }

    return reasons;
  }

  /**
   * Can Claim
   *
   * @remarks Check if the drop can currently be claimed.
   *
   * @example
   * ```javascript
   * // Quantity of tokens to check if they are claimable
   * const quantity = 1;
   *
   * await module.canClaim(quantity);
   * ```
   */
  public async canClaim(
    quantity: BigNumberish,
    addressToCheck?: string,
  ): Promise<boolean> {
    if (addressToCheck === undefined) {
      addressToCheck = await this.getSignerAddress();
    }
    if (await this.isV0()) {
      return this.v1Module.canClaim(quantity, []);
    }
    return (
      (await this.getClaimIneligibilityReasons(quantity, addressToCheck))
        .length === 0
    );
  }

  /**
   * Returns proofs and the overrides required for the transaction.
   *
   * @returns - `overrides` and `proofs` as an object.
   */

  private async prepareClaim(
    quantity: BigNumberish,
    proofs: BytesLike[] = [hexZeroPad([0], 32)],
  ): Promise<{
    overrides: ethers.CallOverrides;
    proofs: BytesLike[];
  }> {
    const mintCondition = await this.getActiveClaimCondition();
    const { metadata } = await this.getMetadata();

    const addressToClaim = await this.getSignerAddress();

    if (!mintCondition.merkleRoot.toString().startsWith(AddressZero)) {
      const snapshot = await this.sdk
        .getStorage()
        .get(metadata?.merkle[mintCondition.merkleRoot.toString()]);
      const jsonConvert = new JsonConvert();
      const snapshotData = jsonConvert.deserializeObject(
        JSON.parse(snapshot),
        Snapshot,
      );
      const item = snapshotData.claims.find(
        (c) => c.address.toLowerCase() === addressToClaim.toLowerCase(),
      );
      if (item === undefined) {
        throw new Error("No claim found for this address");
      }
      proofs = item.proof;
    }

    const overrides = (await this.getCallOverrides()) || {};
    if (mintCondition.pricePerToken.gt(0)) {
      if (isNativeToken(mintCondition.currency)) {
        overrides["value"] = BigNumber.from(mintCondition.pricePerToken).mul(
          quantity,
        );
      } else {
        const erc20 = ERC20__factory.connect(
          mintCondition.currency,
          this.providerOrSigner,
        );
        const owner = await this.getSignerAddress();
        const spender = this.address;
        const allowance = await erc20.allowance(owner, spender);
        const totalPrice = BigNumber.from(mintCondition.pricePerToken).mul(
          BigNumber.from(quantity),
        );

        if (allowance.lt(totalPrice)) {
          await this.sendContractTransaction(erc20, "approve", [
            spender,
            allowance.add(totalPrice),
          ]);
        }
      }
    }
    return {
      overrides,
      proofs,
    };
  }

  /**
   * Claim NFTs to Wallet
   *
   * @remarks Let the a specified wallet claim NFTs.
   *
   * @example
   * ```javascript
   * // Address of the wallet you want to claim the NFTs
   * const address = "{{wallet_address}}";
   *
   * // The number of NFTs to claim
   * const quantity = 1;
   *
   * await module.claimTo(quantity, address);
   * ```
   *
   * @param quantity - Quantity of the tokens you want to claim
   * @param addressToClaim - Address you want to send the token to
   * @param proofs - Array of proofs
   *
   * @returns - Receipt for the transaction
   */
  public async claimTo(
    quantity: BigNumberish,
    addressToClaim: string,
    proofs: BytesLike[] = [hexZeroPad([0], 32)],
  ): Promise<TransactionReceipt> {
    const claimData = await this.prepareClaim(quantity, proofs);

    if (await this.isNewClaim()) {
      return await this.sendTransaction(
        "claim",
        [addressToClaim, quantity, claimData.proofs],
        claimData.overrides,
      );
    }

    // backward compatibility for < 1.22.0 claim
    const contract = new Contract(
      this.address,
      ABI_V1_22_0,
      this.providerOrSigner,
    );
    const receipt = await this.sendContractTransaction(
      contract,
      "claim",
      [quantity, claimData.proofs],
      claimData.overrides,
    );

    const encoded = [];
    const events = this.parseLogs("ClaimedTokens", receipt?.logs, contract);
    const startingIndex: BigNumber = events[0].args.startTokenId;
    const endingIndex = startingIndex.add(quantity);
    for (let i = startingIndex; i.lt(endingIndex); i = i.add(1)) {
      encoded.push(
        this.contract.interface.encodeFunctionData("transferFrom", [
          await this.getSignerAddress(),
          addressToClaim,
          i,
        ]),
      );
    }

    return await this.sendTransaction(
      "multicall",
      [encoded],
      claimData.overrides,
    );
  }

  /** Claim NFTs
   *
   * @param quantity - Quantity of the tokens you want to claim
   * @param proofs - Array of proofs
   *
   * @returns - Receipt for the transaction
   */
  public async claim(
    quantity: BigNumberish,
    proofs: BytesLike[] = [hexZeroPad([0], 32)],
  ): Promise<NFTMetadataOwner[]> {
    if (await this.isV0()) {
      return this.v1Module.claim(quantity, proofs);
    }
    const claimData = await this.prepareClaim(quantity, proofs);

    let receipt;
    let contract: BaseContract = this.contract;
    if (await this.isNewClaim()) {
      receipt = await this.sendTransaction(
        "claim",
        [await this.getSignerAddress(), quantity, claimData.proofs],
        claimData.overrides,
      );
    } else {
      // backward compatibility for < 1.22.0 claim
      contract = new Contract(this.address, ABI_V1_22_0, this.providerOrSigner);
      receipt = await this.sendContractTransaction(
        contract,
        "claim",
        [quantity, claimData.proofs],
        claimData.overrides,
      );
    }

    const events = this.parseLogs("ClaimedTokens", receipt?.logs, contract);
    const startingIndex: BigNumber = events[0].args.startTokenId;
    const endingIndex = startingIndex.add(quantity);
    const tokenIds = [];
    for (let i = startingIndex; i.lt(endingIndex); i = i.add(1)) {
      tokenIds.push(BigNumber.from(i.toString()));
    }
    return await Promise.all(
      tokenIds.map(async (t) => await this.get(t.toString())),
    );
  }

  public async burn(tokenId: BigNumberish): Promise<TransactionReceipt> {
    return await this.sendTransaction("burn", [tokenId]);
  }

  public async transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("transferFrom", [from, to, tokenId]);
  }

  // owner functions
  public async setModuleMetadata(
    metadata: MetadataURIOrObject,
  ): Promise<TransactionReceipt> {
    const uri = await this.sdk.getStorage().uploadMetadata(metadata);
    return await this.sendTransaction("setContractURI", [uri]);
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

  /**
   * Create batch allows you to create a batch of tokens
   * in one transaction. This function can only be called
   * once per module at the moment.
   *
   * @beta
   *
   * @param metadatas - The metadata to include in the batch.
   */
  public async createBatch(
    metadatas: MetadataURIOrObject[],
  ): Promise<string[]> {
    if (await this.isV0()) {
      return this.v1Module.createBatch(metadatas);
    }
    const startFileNumber = await this.readOnlyContract.nextTokenIdToMint();
    const { baseUri } = await this.sdk
      .getStorage()
      .uploadMetadataBatch(metadatas, this.address, startFileNumber.toNumber());

    let receipt;
    let contract: BaseContract = this.contract;

    if (await this.hasDelayedReveal()) {
      receipt = await this.sendTransaction("lazyMint", [
        metadatas.length,
        baseUri.endsWith("/") ? baseUri : `${baseUri}/`,
        ethers.utils.toUtf8Bytes(""),
      ]);
    } else {
      contract = new Contract(this.address, ABI_V1_24_0, this.providerOrSigner);
      receipt = await this.sendContractTransaction(contract, "lazyMint", [
        metadatas.length,
        baseUri.endsWith("/") ? baseUri : `${baseUri}/`,
      ]);
    }

    const events = this.parseLogs("LazyMintedTokens", receipt?.logs, contract);
    const [startingIndex, endingIndex]: BigNumber[] = events[0].args;
    const tokenIds = [];
    for (let i = startingIndex; i.lte(endingIndex); i = i.add(1)) {
      tokenIds.push(i.toString());
    }
    return tokenIds;
  }

  /**
   * Algorithm to hash delay reveal password, so we don't broadcast the input password on-chain.
   *
   * @internal
   */
  private async hashDelayRevealPassword(
    batchTokenIndex: BigNumberish,
    password: string,
  ) {
    const chainId = await this.getChainID();
    const contractAddress = this.address;
    return ethers.utils.solidityKeccak256(
      ["string", "uint256", "uint256", "address"],
      [password, chainId, batchTokenIndex, contractAddress],
    );
  }

  /**
   * Create batch allows you to create a batch of tokens
   * in one transaction. This function can only be called
   * once per module at the moment.
   *
   * @param metadatas - The metadata to include in the batch.
   */
  public async createDelayedRevealBatch(
    placeholder: MetadataURIOrObject,
    metadatas: MetadataURIOrObject[],
    password: string,
  ): Promise<string[]> {
    if (!(await this.hasDelayedReveal())) {
      throw new Error("delay reveal unsupported");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    const { baseUri: placeholderUri } = await this.sdk
      .getStorage()
      .uploadMetadataBatch([placeholder], this.address);

    const startFileNumber = await this.readOnlyContract.nextTokenIdToMint();
    const { baseUri } = await this.sdk
      .getStorage()
      .uploadMetadataBatch(metadatas, this.address, startFileNumber.toNumber());

    const baseUriId = await this.readOnlyContract.getBaseURICount();
    const encryptedBaseUri = await this.readOnlyContract.encryptDecrypt(
      ethers.utils.toUtf8Bytes(baseUri.endsWith("/") ? baseUri : `${baseUri}/`),
      await this.hashDelayRevealPassword(baseUriId, password),
    );

    const receipt = await this.sendTransaction("lazyMint", [
      metadatas.length,
      placeholderUri.endsWith("/") ? placeholderUri : `${placeholderUri}/`,
      encryptedBaseUri,
    ]);

    const events = this.parseLogs("LazyMintedTokens", receipt?.logs);
    const [startingIndex, endingIndex]: BigNumber[] = events[0].args;
    const tokenIds = [];
    for (let i = startingIndex; i.lte(endingIndex); i = i.add(1)) {
      tokenIds.push(i.toString());
    }
    return tokenIds;
  }

  public async reveal(batchId: BigNumberish, password: string) {
    if (!(await this.hasDelayedReveal())) {
      throw new Error("delay reveal unsupported");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    const key = await this.hashDelayRevealPassword(batchId, password);

    // performing the reveal locally to make sure it'd succeed before sending the transaction
    try {
      const decryptedUri = await this.contract.callStatic.reveal(batchId, key);

      // basic sanity check for making sure decryptedUri is valid
      // this is optional because invalid decryption key would result in non-utf8 bytes and
      // ethers would throw when trying to decode it
      if (!decryptedUri.includes("://") || !decryptedUri.endsWith("/")) {
        throw new Error(
          `Error revealing batch ${batchId} - make sure your password is correct`,
        );
      }
    } catch (e) {
      console.log(`Error revealing batch ${batchId}`, e);
      throw new Error(
        `Error revealing batch ${batchId} - make sure your password is correct`,
      );
    }

    await this.sendTransaction("reveal", [batchId, key]);
  }

  /**
   * Gets a list of token uris that needs to be revealed.
   */
  public async getBatchesToReveal(): Promise<BatchToReveal[]> {
    if (!(await this.hasDelayedReveal())) {
      throw new Error("Contract does not support delay reveal");
    }

    const count = await this.readOnlyContract.getBaseURICount();
    if (count.isZero()) {
      return [];
    }

    const countRangeArray = Array.from(Array(count.toNumber()).keys());

    // map over to get the base uri indices, which should be the end token id of every batch
    const uriIndices = await Promise.all(
      countRangeArray.map((i) => this.readOnlyContract.baseURIIndices(i)),
    );

    // first batch always start from 0. don't need to fetch the last batch so pop it from the range array
    const uriIndicesWithZeroStart = uriIndices.slice(0, uriIndices.length - 1);

    // returns the token uri for each batches. first batch always starts from token id 0.
    const tokenUris = await Promise.all(
      Array.from([0, ...uriIndicesWithZeroStart]).map((i) =>
        this.readOnlyContract.tokenURI(i),
      ),
    );

    const tokenMetadatas = await Promise.all(
      Array.from([0, ...uriIndicesWithZeroStart]).map((i) =>
        this.getTokenMetadata(i.toString()),
      ),
    );

    // index is the uri indicies, which is end token id. different from uris
    const encryptedBaseUris = await Promise.all(
      Array.from([...uriIndices]).map((i) =>
        this.readOnlyContract.encryptedBaseURI(i),
      ),
    );

    return tokenUris
      .map((uri, index) => ({
        batchId: BigNumber.from(index),
        batchUri: uri,
        placeholderMetadata: tokenMetadatas[index],
      }))
      .filter(
        (_, index) => ethers.utils.hexDataLength(encryptedBaseUris[index]) > 0,
      );
  }

  /**
   * @internal
   *
   * @returns - True if the batch has been created, false otherwise.
   */
  public async canCreateBatch(): Promise<boolean> {
    if (await this.isV0()) {
      return this.v1Module.canCreateBatch();
    }
    return true;
  }

  /**
   * Check if contract is v0 or not. If the contract doesn't have nextTokenIdToMint = v0 contract.
   * @internal
   */
  private async isV0(): Promise<boolean> {
    await this.checkVersion();
    return this._isV0;
  }

  /**
   * @internal
   */
  private async isNewClaim(): Promise<boolean> {
    await this.checkVersion();
    return this._version >= 1;
  }

  /**
   * @internal
   */
  public async hasDelayedReveal(): Promise<boolean> {
    await this.checkVersion();
    return this._version >= 2;
  }

  /**
   * @internal
   */
  private async checkVersion() {
    if (this._shouldCheckVersion) {
      try {
        await this.readOnlyContract.nextTokenIdToMint();
        this._isV0 = false;
      } catch (e) {
        this._isV0 = true;
      }

      try {
        this._version = (await this.readOnlyContract.VERSION()).toNumber();
      } catch (e) {
        this._version = 0;
      }

      this._shouldCheckVersion = false;
    }
  }

  /**
   * Fetches the proof for the current signer for a particular wallet.
   *
   * @param merkleRoot - The merkle root of the condition to check.
   * @returns - The proof for the current signer for the specified condition.
   */
  private async getClaimerProofs(
    merkleRoot: string,
    addressToClaim?: string,
  ): Promise<string[]> {
    if (!addressToClaim) {
      addressToClaim = await this.getSignerAddress();
    }
    const { metadata } = await this.getMetadata();
    const snapshot = await this.sdk
      .getStorage()
      .get(metadata?.merkle[merkleRoot]);
    const jsonConvert = new JsonConvert();
    const snapshotData = jsonConvert.deserializeObject(
      JSON.parse(snapshot),
      Snapshot,
    );
    const item = snapshotData.claims.find(
      (c) => c.address.toLowerCase() === addressToClaim?.toLowerCase(),
    );

    if (item === undefined) {
      return [];
    }
    return item.proof;
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

/**
 * @internal
 * @deprecated - Should use DropV2
 */
class DropV1Module extends ModuleWithRoles<Drop> implements ITransferable {
  public static moduleType: ModuleType = ModuleType.DROP;
  storage = this.sdk.getStorage();

  public static roles = [
    RolesMap.admin,
    RolesMap.minter,
    RolesMap.transfer,
  ] as const;

  /**
   * @override
   * @internal
   */
  protected getModuleRoles(): readonly Role[] {
    return DropModule.roles;
  }

  /**
   * @internal
   */
  protected connectContract(): Drop {
    return Drop__factory.connect(this.address, this.providerOrSigner);
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return DropModule.moduleType;
  }

  private async getTokenMetadata(tokenId: string): Promise<NFTMetadata> {
    return await getTokenMetadata(
      this.readOnlyContract,
      tokenId,
      this.sdk.getStorage(),
    );
  }

  public async get(tokenId: string): Promise<NFTMetadataOwner> {
    const [owner, metadata] = await Promise.all([
      this.ownerOf(tokenId).catch(() => AddressZero),
      this.getTokenMetadata(tokenId),
    ]);

    return { owner, metadata };
  }

  public async getAll(
    queryParams?: QueryAllParams,
  ): Promise<NFTMetadataOwner[]> {
    const start = BigNumber.from(queryParams?.start || 0).toNumber();
    const count = BigNumber.from(
      queryParams?.count || DEFAULT_QUERY_ALL_COUNT,
    ).toNumber();
    const maxId = Math.min(
      (await this.readOnlyContract.nextTokenId()).toNumber(),
      start + count,
    );
    return await Promise.all(
      Array.from(Array(maxId - start).keys()).map((i) =>
        this.get((start + i).toString()),
      ),
    );
  }

  public async getAllUnclaimed(
    queryParams?: QueryAllParams,
  ): Promise<NFTMetadataOwner[]> {
    const start = BigNumber.from(queryParams?.start || 0).toNumber();
    const count = BigNumber.from(
      queryParams?.count || DEFAULT_QUERY_ALL_COUNT,
    ).toNumber();
    const maxId = BigNumber.from(
      Math.min(
        (await this.readOnlyContract.nextTokenId()).toNumber(),
        start + count,
      ),
    );
    const unmintedId = await this.readOnlyContract.nextMintTokenId();
    return (
      await Promise.all(
        Array.from(Array(maxId.sub(unmintedId).toNumber()).keys()).map((i) =>
          this.getTokenMetadata(unmintedId.add(i).toString()),
        ),
      )
    ).map((metadata) => ({ owner: AddressZero, metadata }));
  }

  public async getAllClaimed(
    queryParams?: QueryAllParams,
  ): Promise<NFTMetadataOwner[]> {
    const start = BigNumber.from(queryParams?.start || 0).toNumber();
    const count = BigNumber.from(
      queryParams?.count || DEFAULT_QUERY_ALL_COUNT,
    ).toNumber();
    const maxId = Math.min(
      (await this.readOnlyContract.nextMintTokenId()).toNumber(),
      start + count,
    );
    return await Promise.all(
      Array.from(Array(maxId).keys()).map((i) => this.get(i.toString())),
    );
  }

  public async ownerOf(tokenId: string): Promise<string> {
    return await this.readOnlyContract.ownerOf(tokenId);
  }

  public async getOwned(_address?: string): Promise<NFTMetadataOwner[]> {
    const address = _address ? _address : await this.getSignerAddress();
    const balance = await this.readOnlyContract.balanceOf(address);
    const indices = Array.from(Array(balance.toNumber()).keys());
    const tokenIds = await Promise.all(
      indices.map((i) => this.readOnlyContract.tokenOfOwnerByIndex(address, i)),
    );
    return await Promise.all(
      tokenIds.map((tokenId) => this.get(tokenId.toString())),
    );
  }

  private async transformResultToClaimCondition(
    pm: PublicMintConditionStruct,
  ): Promise<ClaimCondition> {
    const cv = await getCurrencyValue(
      this.providerOrSigner,
      pm.currency,
      pm.pricePerToken,
    );
    return {
      startTimestamp: new Date(
        BigNumber.from(pm.startTimestamp).toNumber() * 1000,
      ),
      maxMintSupply: pm.maxMintSupply.toString(),
      currentMintSupply: pm.currentMintSupply.toString(),
      availableSupply: BigNumber.from(pm.maxMintSupply)
        .sub(pm.currentMintSupply)
        .toString(),
      quantityLimitPerTransaction: pm.quantityLimitPerTransaction.toString(),
      waitTimeSecondsLimitPerTransaction:
        pm.waitTimeSecondsLimitPerTransaction.toString(),
      price: BigNumber.from(pm.pricePerToken),
      pricePerToken: BigNumber.from(pm.pricePerToken),
      currency: pm.currency,
      currencyContract: pm.currency,
      currencyMetadata: cv,
      merkleRoot: pm.merkleRoot,
    };
  }

  /**
   * @deprecated - Use {@link DropModule.getActiveClaimCondition} instead
   */
  public async getActiveMintCondition(): Promise<PublicMintCondition> {
    const index =
      await this.readOnlyContract.getLastStartedMintConditionIndex();
    return await this.readOnlyContract.mintConditions(index);
  }

  public async getActiveClaimCondition(): Promise<ClaimCondition> {
    const index =
      await this.readOnlyContract.getLastStartedMintConditionIndex();
    const mc = await this.readOnlyContract.mintConditions(index);
    return await this.transformResultToClaimCondition(mc);
  }

  /**
   * @deprecated - Use {@link DropModule.getAllClaimConditions} instead
   */
  public async getAllMintConditions(): Promise<PublicMintCondition[]> {
    const conditions = [];
    for (let i = 0; ; i++) {
      try {
        conditions.push(await this.readOnlyContract.mintConditions(i));
      } catch (e) {
        break;
      }
    }
    return conditions;
  }

  public async getAllClaimConditions(): Promise<ClaimCondition[]> {
    const conditions = [];
    for (let i = 0; ; i++) {
      try {
        const mc = await this.readOnlyContract.mintConditions(i);
        conditions.push(await this.transformResultToClaimCondition(mc));
      } catch (e) {
        break;
      }
    }
    return conditions;
  }

  public async totalSupply(): Promise<BigNumber> {
    return await this.readOnlyContract.nextTokenId();
  }

  public async maxTotalSupply(): Promise<BigNumber> {
    return await this.readOnlyContract.maxTotalSupply();
  }

  public async totalUnclaimedSupply(): Promise<BigNumber> {
    return (await this.readOnlyContract.nextTokenId()).sub(
      await this.totalClaimedSupply(),
    );
  }

  public async totalClaimedSupply(): Promise<BigNumber> {
    return await this.readOnlyContract.nextMintTokenId();
  }

  public async balanceOf(address: string): Promise<BigNumber> {
    return await this.readOnlyContract.balanceOf(address);
  }

  public async balance(): Promise<BigNumber> {
    return await this.balanceOf(await this.getSignerAddress());
  }
  public async isApproved(address: string, operator: string): Promise<boolean> {
    return await this.readOnlyContract.isApprovedForAll(address, operator);
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

  public async transfer(
    to: string,
    tokenId: string,
  ): Promise<TransactionReceipt> {
    const from = await this.getSignerAddress();
    return await this.sendTransaction(
      "safeTransferFrom(address,address,uint256)",
      [from, to, tokenId],
    );
  }

  /**
   * @deprecated - The function has been deprecated. Use `createBatch` instead.
   */
  public async lazyMint(metadata: MetadataURIOrObject) {
    await this.lazyMintBatch([metadata]);
  }

  public async pinToIpfs(files: Buffer[]): Promise<string> {
    return await this.storage.uploadBatch(files, this.address);
  }

  /**
   * @deprecated - The function has been deprecated. Use `mintBatch` instead.
   */
  public async lazyMintBatch(metadatas: MetadataURIOrObject[]) {
    const { baseUri } = await this.sdk
      .getStorage()
      .uploadMetadataBatch(metadatas);
    const uris = Array.from(Array(metadatas.length).keys()).map(
      (i) => `${baseUri}${i}/`,
    );
    await this.sendTransaction("lazyMintBatch", [uris]);
  }

  /**
   * @deprecated - The function has been deprecated. Use `mintBatch` instead.
   */
  public async lazyMintAmount(amount: BigNumberish) {
    await this.sendTransaction("lazyMintAmount", [amount]);
  }

  /**
   * @deprecated - Use {@link DropModule.setClaimCondition} instead
   */
  public async setMintConditions(factory: ClaimConditionFactory) {
    return this.setClaimCondition(factory);
  }

  /**
   * @deprecated - Use {@link DropModule.setClaimCondition} instead
   */
  public async setClaimConditions(factory: ClaimConditionFactory) {
    return this.setClaimCondition(factory);
  }

  /**
   * Sets public mint conditions for the next minting using the
   * claim condition factory.
   *
   * @param factory - The claim condition factory.
   */
  public async setClaimCondition(factory: ClaimConditionFactory) {
    const conditions = await factory.buildConditionsForDropV1();

    const merkleInfo: { [key: string]: string } = {};
    factory.allSnapshots().forEach((s) => {
      merkleInfo[s.merkleRoot] = s.snapshotUri;
    });
    const { metadata } = await this.getMetadata(false);
    invariant(metadata, "Metadata is not set, this should never happen");
    if (factory.allSnapshots().length === 0 && "merkle" in metadata) {
      metadata["merkle"] = {};
    } else {
      metadata["merkle"] = merkleInfo;
    }

    const metatdataUri = await this.storage.upload(JSON.stringify(metadata));

    const encoded = [
      this.contract.interface.encodeFunctionData("setContractURI", [
        metatdataUri,
      ]),
      this.contract.interface.encodeFunctionData("setPublicMintConditions", [
        conditions,
      ]),
    ];
    return await this.sendTransaction("multicall", [encoded]);
  }

  /**
   * Creates a claim condition factory
   *
   * @returns - A new claim condition factory
   */
  public getClaimConditionsFactory(): ClaimConditionFactory {
    const createSnapshotFunc = this.sdk.createSnapshot.bind(this.sdk);
    const factory = new ClaimConditionFactory(createSnapshotFunc);
    return factory;
  }

  /**
   * @deprecated - Use the {@link DropModule.getClaimConditionsFactory} instead.
   */
  public getMintConditionsFactory(): ClaimConditionFactory {
    return this.getClaimConditionsFactory();
  }

  /**
   * @deprecated - Use the {@link DropModule.setClaimConditions} instead.
   */
  public async setPublicMintConditions(
    conditions: CreatePublicMintCondition[],
  ) {
    const _conditions = conditions.map((c) => ({
      startTimestamp: c.startTimestampInSeconds || 0,
      maxMintSupply: c.maxMintSupply,
      currentMintSupply: 0,
      quantityLimitPerTransaction:
        c.quantityLimitPerTransaction || c.maxMintSupply,
      waitTimeSecondsLimitPerTransaction:
        c.waitTimeSecondsLimitPerTransaction || 0,
      pricePerToken: c.pricePerToken || 0,
      currency: c.currency || AddressZero,
      merkleRoot: c.merkleRoot || hexZeroPad([0], 32),
    }));
    await this.sendTransaction("setPublicMintConditions", [_conditions]);
  }

  public async canClaim(
    quantity: BigNumberish,
    proofs: BytesLike[] = [hexZeroPad([0], 32)],
  ): Promise<boolean> {
    try {
      const mintCondition = await this.getActiveClaimCondition();
      const overrides = (await this.getCallOverrides()) || {};

      const owner = await this.getSignerAddress();
      if (mintCondition.merkleRoot) {
        proofs = await this.getClaimerProofs(
          mintCondition?.merkleRoot as string,
          owner,
        );
      }

      if (mintCondition.pricePerToken.gt(0)) {
        if (mintCondition.currency === AddressZero) {
          overrides["value"] = BigNumber.from(mintCondition.pricePerToken).mul(
            quantity,
          );
        } else {
          const erc20 = ERC20__factory.connect(
            mintCondition.currency,
            this.providerOrSigner,
          );
          const spender = this.address;
          const allowance = await erc20.allowance(owner, spender);
          const totalPrice = BigNumber.from(mintCondition.pricePerToken).mul(
            BigNumber.from(quantity),
          );

          if (allowance.lt(totalPrice)) {
            // TODO throw allowance error, maybe check balance?
          }
        }
      }
      await this.contract.callStatic.claim(quantity, proofs, overrides);
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * Fetches the proof for the current signer for a particular wallet.
   *
   * @param merkleRoot - The merkle root of the condition to check.
   * @returns - The proof for the current signer for the specified condition.
   */
  private async getClaimerProofs(
    merkleRoot: string,
    addressToClaim?: string,
  ): Promise<string[]> {
    if (!addressToClaim) {
      addressToClaim = await this.getSignerAddress();
    }
    const { metadata } = await this.getMetadata();
    const snapshot = await this.storage.get(metadata?.merkle[merkleRoot]);
    const jsonConvert = new JsonConvert();
    const snapshotData = jsonConvert.deserializeObject(
      JSON.parse(snapshot),
      Snapshot,
    );
    const item = snapshotData.claims.find(
      (c) => c.address.toLowerCase() === addressToClaim?.toLowerCase(),
    );
    if (item === undefined) {
      return [];
    }
    return item.proof;
  }

  public async claim(
    quantity: BigNumberish,
    proofs: BytesLike[] = [hexZeroPad([0], 32)],
  ): Promise<NFTMetadataOwner[]> {
    const mintCondition = await this.getActiveClaimCondition();
    const { metadata } = await this.getMetadata();

    const addressToClaim = await this.getSignerAddress();

    if (!mintCondition.merkleRoot.toString().startsWith(AddressZero)) {
      const snapshot = await this.storage.get(
        metadata?.merkle[mintCondition.merkleRoot.toString()],
      );
      const jsonConvert = new JsonConvert();
      const snapshotData = jsonConvert.deserializeObject(
        JSON.parse(snapshot),
        Snapshot,
      );
      const item = snapshotData.claims.find(
        (c) => c.address.toLowerCase() === addressToClaim.toLowerCase(),
      );
      if (item === undefined) {
        throw new Error("No claim found for this address");
      }
      proofs = item.proof;
    }

    const overrides = (await this.getCallOverrides()) || {};
    if (mintCondition.pricePerToken.gt(0)) {
      if (mintCondition.currency === AddressZero) {
        overrides["value"] = BigNumber.from(mintCondition.pricePerToken).mul(
          quantity,
        );
      } else {
        const erc20 = ERC20__factory.connect(
          mintCondition.currency,
          this.providerOrSigner,
        );
        const owner = await this.getSignerAddress();
        const spender = this.address;
        const allowance = await erc20.allowance(owner, spender);
        const totalPrice = BigNumber.from(mintCondition.pricePerToken).mul(
          BigNumber.from(quantity),
        );

        if (allowance.lt(totalPrice)) {
          await this.sendContractTransaction(erc20, "approve", [
            spender,
            allowance.add(totalPrice),
          ]);
        }
      }
    }

    const receipt = await this.sendTransaction(
      "claim",
      [quantity, proofs],
      overrides,
    );
    const event = this.parseEventLogs("Claimed", receipt?.logs);
    const startingIndex: BigNumber = event.startTokenId;
    const endingIndex = startingIndex.add(quantity);
    const tokenIds = [];
    for (let i = startingIndex; i.lt(endingIndex); i = i.add(1)) {
      tokenIds.push(BigNumber.from(i.toString()));
    }
    return await Promise.all(
      tokenIds.map(async (t) => await this.get(t.toString())),
    );
  }

  public async burn(tokenId: BigNumberish): Promise<TransactionReceipt> {
    return await this.sendTransaction("burn", [tokenId]);
  }

  public async transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("transferFrom", [from, to, tokenId]);
  }

  // owner functions
  public async setModuleMetadata(
    metadata: MetadataURIOrObject,
  ): Promise<TransactionReceipt> {
    const uri = await this.storage.uploadMetadata(metadata);
    return await this.sendTransaction("setContractURI", [uri]);
  }

  public async setRoyaltyBps(amount: number): Promise<TransactionReceipt> {
    // TODO: reduce this duplication and provide common functions around
    // royalties through an interface. Currently this function is
    // duplicated across 4 modules
    const { metadata } = await this.getMetadata();
    const encoded: string[] = [];
    if (!metadata) {
      throw new Error("No metadata found, this module might be invalid!");
    }

    metadata.seller_fee_basis_points = amount;
    const uri = await this.storage.uploadMetadata(
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

  public async setBaseTokenUri(uri: string): Promise<TransactionReceipt> {
    return await this.sendTransaction("setBaseTokenURI", [uri]);
  }

  public async setMaxTotalSupply(
    amount: BigNumberish,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("setMaxTotalSupply", [amount]);
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

  /**
   * Create batch allows you to create a batch of tokens
   * in one transaction. This function can only be called
   * once per module at the moment.
   *
   * @beta
   *
   * @param metadatas - The metadata to include in the batch.
   */
  public async createBatch(
    metadatas: MetadataURIOrObject[],
  ): Promise<string[]> {
    if (!(await this.canCreateBatch())) {
      throw new Error("Batch already created!");
    }

    const startFileNumber = await this.readOnlyContract.nextMintTokenId();
    const { baseUri } = await this.storage.uploadMetadataBatch(
      metadatas,
      this.address,
      startFileNumber.toNumber(),
    );
    const encoded = [
      this.contract.interface.encodeFunctionData("setBaseTokenURI", [baseUri]),
      this.contract.interface.encodeFunctionData("lazyMintAmount", [
        metadatas.length,
      ]),
    ];
    await this.sendTransaction("multicall", [encoded]);
    return [];
  }

  /**
   * @internal
   *
   * @returns - True if the batch has been created, false otherwise.
   */
  public async canCreateBatch(): Promise<boolean> {
    return (await this.readOnlyContract.nextTokenId()).eq(0);
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
// This is a deprecated class, DropV1, see above
