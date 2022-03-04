import {
  ERC20__factory,
  LazyMintERC1155 as BundleDrop,
  LazyMintERC1155__factory as BundleDrop__factory,
} from "@3rdweb/contracts";
import { ClaimConditionStruct } from "@3rdweb/contracts/dist/LazyMintERC1155";
import { hexZeroPad } from "@ethersproject/bytes";
import { AddressZero } from "@ethersproject/constants";
import { TransactionReceipt } from "@ethersproject/providers";
import { BigNumber, BigNumberish, BytesLike, Contract, ethers } from "ethers";
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
import { getTokenMetadata, NFTMetadata } from "../common/nft";
import { ModuleWithRoles } from "../core/module";
import { MetadataURIOrObject } from "../core/types";
import { ClaimEligibility } from "../enums";
import ClaimConditionFactory from "../factories/ClaimConditionFactory";
import { ITransferable } from "../interfaces/contracts/ITransferable";
import { ClaimCondition } from "../types/claim-conditions/PublicMintCondition";
import { Snapshot } from "../types/snapshots";

/**
 * @beta
 */
export interface BundleDropCreateClaimCondition {
  startTimestamp?: BigNumberish;
  maxClaimableSupply: BigNumberish;
  quantityLimitPerTransaction?: BigNumberish;
  waitTimeInSecondsBetweenClaims?: BigNumberish;
  pricePerToken?: BigNumberish;
  currency?: string;
  merkleRoot?: BytesLike;
}

/**
 * @beta
 */
export interface BundleDropMetadata {
  supply: BigNumber;
  metadata: NFTMetadata;
}

/**
 * @internal
 */
const OLD_CLAIM_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
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
        internalType: "uint256",
        name: "tokenId",
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
        name: "quantityClaimed",
        type: "uint256",
      },
    ],
    name: "ClaimedTokens",
    type: "event",
  },
];

/**
 * Setup a collection of NFTs with a customizable number of each NFT that are minted as users claim them.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@3rdweb/sdk";
 *
 * // You can switch out this provider with any wallet or provider setup you like.
 * const provider = ethers.Wallet.createRandom();
 * const sdk = new ThirdwebSDK(provider);
 * const module = sdk.getBundleDropModule("{{module_address}}");
 * ```
 *
 * @public
 */
export class BundleDropModule
  extends ModuleWithRoles<BundleDrop>
  implements ITransferable
{
  private _shouldCheckVersion = true;
  private _isNewClaim = false;
  public static moduleType: ModuleType = ModuleType.BUNDLE_DROP;

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
    return BundleDropModule.roles;
  }

  /**
   * @internal
   */
  protected connectContract(): BundleDrop {
    return BundleDrop__factory.connect(this.address, this.providerOrSigner);
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return BundleDropModule.moduleType;
  }

  private async transformResultToClaimCondition(
    pm: ClaimConditionStruct,
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

  private async getTokenMetadata(tokenId: string): Promise<NFTMetadata> {
    return await getTokenMetadata(
      this.readOnlyContract,
      tokenId,
      this.sdk.getStorage(),
    );
  }

  public async get(tokenId: string): Promise<BundleDropMetadata> {
    const [supply, metadata] = await Promise.all([
      this.readOnlyContract.totalSupply(tokenId).catch(() => BigNumber.from(0)),
      this.getTokenMetadata(tokenId),
    ]);

    return {
      supply,
      metadata,
    };
  }

  /**
   * Get NFT Data
   *
   * @remarks Get data associated with NFTs in this module.
   *
   * @example
   * ```javascript
   * // Get data associated with every NFT in the module
   * const nfts = await module.getAll();
   * console.log(nfts);
   * ```
   *
   * @returns The NFT metadata for all NFTs in the module.
   */
  public async getAll(): Promise<BundleDropMetadata[]> {
    const maxId = (await this.readOnlyContract.nextTokenIdToMint()).toNumber();
    return await Promise.all(
      Array.from(Array(maxId).keys()).map((i) => this.get(i.toString())),
    );
  }

  /**
   * `getOwned` is a convenience method for getting all owned tokens
   * for a particular wallet.
   *
   * @param _address - The address to check for token ownership
   * @returns An array of BundleMetadata objects that are owned by the address
   */
  public async getOwned(_address?: string): Promise<BundleDropMetadata[]> {
    const address = _address ? _address : await this.getSignerAddress();
    const maxId = await this.readOnlyContract.nextTokenIdToMint();
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
      ownedBalances.map(async (b) => await this.get(b.tokenId.toString())),
    );
  }

  public async getActiveClaimCondition(
    tokenId: BigNumberish,
  ): Promise<ClaimCondition> {
    const index = await this.readOnlyContract.getIndexOfActiveCondition(
      tokenId,
    );
    return this.transformResultToClaimCondition(
      await this.readOnlyContract.getClaimConditionAtIndex(tokenId, index),
    );
  }

  public async getAllClaimConditions(
    tokenId: BigNumberish,
  ): Promise<ClaimCondition[]> {
    const claimCondition = await this.readOnlyContract.claimConditions(tokenId);
    const count = claimCondition.totalConditionCount.toNumber();
    const conditions = [];
    for (let i = 0; i < count; i++) {
      conditions.push(
        await this.readOnlyContract.getClaimConditionAtIndex(tokenId, i),
      );
    }
    return Promise.all(
      conditions.map((c) => this.transformResultToClaimCondition(c)),
    );
  }

  public async getDefaultSaleRecipient(): Promise<string> {
    return await this.readOnlyContract.defaultSaleRecipient();
  }

  public async getSaleRecipient(tokenId: BigNumberish): Promise<string> {
    const saleRecipient = await this.readOnlyContract.saleRecipient(tokenId);
    if (saleRecipient === AddressZero) {
      return this.readOnlyContract.defaultSaleRecipient();
    }
    return saleRecipient;
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
  public async balanceOf(
    address: string,
    tokenId: BigNumberish,
  ): Promise<BigNumber> {
    return await this.readOnlyContract.balanceOf(address, tokenId);
  }

  public async balance(tokenId: BigNumberish): Promise<BigNumber> {
    return await this.balanceOf(await this.getSignerAddress(), tokenId);
  }
  public async isApproved(address: string, operator: string): Promise<boolean> {
    return await this.readOnlyContract.isApprovedForAll(address, operator);
  }

  // write functions

  /*
   *
   * @deprecated - {@link BundleDropModule.mintBatch}
   */
  public async lazyMintBatch(
    metadatas: MetadataURIOrObject[],
  ): Promise<BundleDropMetadata[]> {
    const tokenIds = await this.createBatch(metadatas);
    return await Promise.all(tokenIds.map((t) => this.get(t.toString())));
  }

  /**
   * Create Many NFTs
   *
   * @remarks Create and mint NFTs.
   *
   * @example
   * ```javascript
   * // Custom metadata of the NFTs to create
   * const metadatas = [{
   *   name: "Cool NFT",
   *   description: "This is a cool NFT",
   *   image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
   * }, {
   *   name: "Cool NFT",
   *   description: "This is a cool NFT",
   *   image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
   * }];
   *
   * await module.createBatch(metadatas);
   * ```
   */
  public async createBatch(
    metadatas: MetadataURIOrObject[],
  ): Promise<string[]> {
    const startFileNumber = await this.readOnlyContract.nextTokenIdToMint();
    const { baseUri } = await this.sdk
      .getStorage()
      .uploadMetadataBatch(metadatas, this.address, startFileNumber.toNumber());
    const receipt = await this.sendTransaction("lazyMint", [
      metadatas.length,
      `${baseUri.endsWith("/") ? baseUri : `${baseUri}/`}`,
    ]);
    const event = this.parseEventLogs("LazyMintedTokens", receipt?.logs);
    const [startingIndex, endingIndex]: BigNumber[] = event;
    const tokenIds = [];
    for (let i = startingIndex; i.lte(endingIndex); i = i.add(1)) {
      tokenIds.push(i.toString());
    }
    return tokenIds;
  }

  public async setSaleRecipient(
    tokenId: BigNumberish,
    recipient: string,
  ): Promise<TransactionReceipt> {
    return this.sendTransaction("setSaleRecipient", [tokenId, recipient]);
  }

  public async setDefaultSaleRecipient(
    recipient: string,
  ): Promise<TransactionReceipt> {
    return this.sendTransaction("setDefaultSaleRecipient", [recipient]);
  }

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
    tokenId: BigNumberish,
    amount: BigNumberish,
    data: BytesLike = [0],
  ): Promise<TransactionReceipt> {
    const from = await this.getSignerAddress();
    return await this.sendTransaction("safeTransferFrom", [
      from,
      to,
      tokenId,
      amount,
      data,
    ]);
  }

  /**
   * Sets public claim conditions for the next minting using the
   * claim condition factory.
   *
   * @param factory - The claim condition factory.
   */
  public async setClaimCondition(
    tokenId: BigNumberish,
    factory: ClaimConditionFactory,
  ) {
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

    const existingMerkle = "merkle" in metadata ? metadata.merkle : {};
    for (const key of Object.keys(existingMerkle)) {
      merkleInfo[key] = existingMerkle[key];
    }
    metadata["merkle"] = merkleInfo;

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
        tokenId,
        conditions,
      ]),
    );

    return await this.sendTransaction("multicall", [encoded]);
  }
  public async updateClaimConditions(
    tokenId: BigNumberish,
    factory: ClaimConditionFactory,
  ) {
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

    const existingMerkle = "merkle" in metadata ? metadata.merkle : {};
    for (const key of Object.keys(existingMerkle)) {
      merkleInfo[key] = existingMerkle[key];
    }
    metadata["merkle"] = merkleInfo;

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
      this.contract.interface.encodeFunctionData("updateClaimConditions", [
        tokenId,
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
  public getClaimConditionFactory(): ClaimConditionFactory {
    const createSnapshotFunc = this.sdk.createSnapshot.bind(this.sdk);
    const factory = new ClaimConditionFactory(createSnapshotFunc);
    return factory;
  }

  /**
   * @deprecated - Use the ClaimConditionFactory instead.
   */
  public async setPublicClaimConditions(
    tokenId: BigNumberish,
    conditions: BundleDropCreateClaimCondition[],
  ) {
    const _conditions = conditions.map((c) => ({
      startTimestamp: c.startTimestamp || 0,
      maxClaimableSupply: c.maxClaimableSupply,
      supplyClaimed: 0,
      quantityLimitPerTransaction:
        c.quantityLimitPerTransaction || c.maxClaimableSupply,
      waitTimeInSecondsBetweenClaims: c.waitTimeInSecondsBetweenClaims || 0,
      pricePerToken: c.pricePerToken || 0,
      currency: c.currency || AddressZero,
      merkleRoot: c.merkleRoot || hexZeroPad([0], 32),
    }));
    await this.sendTransaction("setClaimConditions", [tokenId, _conditions]);
  }

  /**
   * Returns proofs and the overrides required for the transaction.
   *
   * @returns - `overrides` and `proofs` as an object.
   */
  private async prepareClaim(
    tokenId: BigNumberish,
    quantity: BigNumberish,
    proofs: BytesLike[] = [hexZeroPad([0], 32)],
  ) {
    const mintCondition = await this.getActiveClaimCondition(tokenId);
    const overrides = (await this.getCallOverrides()) || {};

    const addressToClaim = await this.getSignerAddress();
    const { metadata } = await this.getMetadata();
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
        (c) => c.address.toLowerCase() === addressToClaim?.toLowerCase(),
      );
      if (item === undefined) {
        throw new Error("No claim found for this address");
      }
      proofs = item.proof;
    }
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
   * Claim a token to yourself
   *
   * @param tokenId - Id of the token you want to claim
   * @param quantity - Quantity of the tokens you want to claim
   * @param proofs - Array of proofs
   *
   * @returns - Receipt for the transaction
   */

  public async claim(
    tokenId: BigNumberish,
    quantity: BigNumberish,
    proofs: BytesLike[] = [hexZeroPad([0], 32)],
  ): Promise<TransactionReceipt> {
    const claimData = await this.prepareClaim(tokenId, quantity, proofs);

    if (await this.isNewClaim()) {
      return await this.sendTransaction(
        "claim",
        [await this.getSignerAddress(), tokenId, quantity, claimData.proofs],
        claimData.overrides,
      );
    } else {
      return await this.sendContractTransaction(
        new Contract(this.address, OLD_CLAIM_ABI, this.providerOrSigner),
        "claim",
        [tokenId, quantity, claimData.proofs],
        claimData.overrides,
      );
    }
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
   * // The token ID of the NFT you want to claim
   * const tokenId = "0"
   *
   * await module.claimTo(tokenId, quantity, address);
   * ```
   *
   * @param tokenId - Id of the token you want to claim
   * @param quantity - Quantity of the tokens you want to claim
   * @param addressToClaim - Address you want to send the token to
   * @param proofs - Array of proofs
   *
   * @returns - Receipt for the transaction
   */
  public async claimTo(
    tokenId: BigNumberish,
    quantity: BigNumberish,
    addressToClaim: string,
    proofs: BytesLike[] = [hexZeroPad([0], 32)],
  ): Promise<TransactionReceipt> {
    const claimData = await this.prepareClaim(tokenId, quantity, proofs);

    if (await this.isNewClaim()) {
      return await this.sendTransaction(
        "claim",
        [addressToClaim, tokenId, quantity, claimData.proofs],
        claimData.overrides,
      );
    }

    const encoded = [];

    // forcing it old version of claim params
    encoded.push(
      new Contract(
        this.address,
        OLD_CLAIM_ABI,
        this.providerOrSigner,
      ).interface.encodeFunctionData("claim", [
        tokenId,
        quantity,
        claimData.proofs,
      ]),
    );
    encoded.push(
      this.contract.interface.encodeFunctionData("safeTransferFrom", [
        await this.getSignerAddress(),
        addressToClaim,
        tokenId,
        quantity,
        [0],
      ]),
    );

    return await this.sendTransaction(
      "multicall",
      [encoded],
      claimData.overrides,
    );
  }

  public async burn(
    tokenId: BigNumberish,
    amount: BigNumberish,
  ): Promise<TransactionReceipt> {
    const account = await this.getSignerAddress();
    return await this.sendTransaction("burn", [account, tokenId, amount]);
  }

  public async transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    amount: BigNumberish,
    data: BytesLike = [0],
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("safeTransferFrom", [
      from,
      to,
      tokenId,
      amount,
      data,
    ]);
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

  public getClaimConditionsFactory(): ClaimConditionFactory {
    const createSnapshotFunc = this.sdk.createSnapshot.bind(this.sdk);
    const factory = new ClaimConditionFactory(createSnapshotFunc);
    return factory;
  }

  /**
   * Returns the total supply of a specific token
   *
   * @param tokenId - The token ID to get the total supply of
   */

  public async totalSupply(tokenId: BigNumberish): Promise<BigNumber> {
    return await this.readOnlyContract.totalSupply(tokenId);
  }

  /**
   * Pulls the list of all addresses that have claimed a particular token
   *
   * @beta - This can be very slow for large numbers of token holders
   *
   * @param tokenId - The token id to get the claimers of
   * @returns - A unique list of addresses that claimed the token
   */
  public async getAllClaimerAddresses(
    tokenId: BigNumberish,
  ): Promise<string[]> {
    const a = await this.contract.queryFilter(
      this.contract.filters.ClaimedTokens(null, BigNumber.from(tokenId)),
    );
    return Array.from(new Set(a.map((b) => b.args.claimer)));
  }

  /**
   * For any claim conditions that a particular wallet is violating,
   * this function returns human readable information about the
   * breaks in the condition that can be used to inform the user.
   *
   * @param tokenId - The token id that would be claimed.
   * @param quantity - The desired quantity that would be claimed.
   * @param addressToCheck - The address that would be claiming the token.
   */
  public async getClaimIneligibilityReasons(
    tokenId: BigNumberish,
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
        this.readOnlyContract.getIndexOfActiveCondition(tokenId),
        this.getActiveClaimCondition(tokenId),
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
        tokenId,
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
        const balance = await this.readOnlyContract.balanceOf(
          addressToCheck,
          tokenId,
        );

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

  /*
   * Checks to see if the current signer can claim the specified number of tokens.
   *
   * @param tokenId - The id of the token to check.
   * @param quantity - The quantity of tokens to check.
   * @param addressToCheck - The wallet address to check.
   * @returns - True if the current signer can claim the specified number of tokens, false otherwise.
   */
  public async canClaim(
    tokenId: BigNumberish,
    quantity: BigNumberish,
    addressToCheck?: string,
  ): Promise<boolean> {
    if (!addressToCheck) {
      addressToCheck = await this.getSignerAddress();
    }
    return (
      (
        await this.getClaimIneligibilityReasons(
          tokenId,
          quantity,
          addressToCheck,
        )
      ).length === 0
    );
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

  /**
   * @internal
   */
  private async isNewClaim(): Promise<boolean> {
    await this.checkVersion();
    return this._isNewClaim;
  }

  /**
   * @internal
   */
  private async checkVersion() {
    if (this._shouldCheckVersion) {
      try {
        await this.readOnlyContract.VERSION();
        this._isNewClaim = true;
      } catch (e) {
        this._isNewClaim = false;
      }

      this._shouldCheckVersion = false;
    }
  }
}
