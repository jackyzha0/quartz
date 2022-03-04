import {
  ERC1155__factory,
  ERC20__factory,
  Pack as PackContract,
  Pack__factory,
} from "@3rdweb/contracts";

import {
  PackCreatedEvent,
  PackOpenRequestEvent,
} from "@3rdweb/contracts/dist/Pack";
import { TransactionReceipt } from "@ethersproject/providers";
import { BigNumber, BigNumberish, BytesLike, Contract, ethers } from "ethers";
import {
  CurrencyValue,
  getCurrencyValue,
  ModuleType,
  Role,
  RolesMap,
} from "../common";
import { ChainlinkVrf } from "../common/chainlink";
import { NotFoundError } from "../common/error";
import { getMetadataWithoutContract, NFTMetadata } from "../common/nft";
import { ModuleWithRoles } from "../core/module";
import { MetadataURIOrObject } from "../core/types";
import { ITransferable } from "../interfaces/contracts/ITransferable";

/**
 * @beta
 */
export interface PackMetadata {
  id: string;
  creator: string;
  currentSupply: BigNumber;
  openStart: Date | null;
  metadata: NFTMetadata;
}

/**
 * @public
 */
export interface PackNFTMetadata {
  supply: BigNumber;
  metadata: NFTMetadata;
}

/**
 * @public
 */
export interface PackMetadataWithBalance extends PackMetadata {
  ownedByAddress: BigNumber;
}

export enum UnderlyingType {
  None = 0,
  ERC20 = 1,
  ERC721 = 2,
}
/**
 * @beta
 */
export interface IPackCreateArgs {
  assetContract: string;
  metadata: MetadataURIOrObject;
  assets: {
    tokenId: BigNumberish;
    amount: BigNumberish;
  }[];
  secondsUntilOpenStart?: BigNumberish;
  rewardsPerOpen?: BigNumberish;
}

/**
 * @beta
 */
export interface IPackBatchArgs {
  tokenId: BigNumberish;
  amount: BigNumberish;
}

/**
 * Create lootboxes of NFTs with rarity based open mechanics.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@3rdweb/sdk";
 *
 * // You can switch out this provider with any wallet or provider setup you like.
 * const provider = ethers.Wallet.createRandom();
 * const sdk = new ThirdwebSDK(provider);
 * const module = sdk.getPackModule("{{module_address}}");
 * ```
 *
 * @public
 */
export class PackModule
  extends ModuleWithRoles<PackContract>
  implements ITransferable
{
  public static moduleType: ModuleType = ModuleType.PACK;

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
    return PackModule.roles;
  }

  /**
   * @internal
   */
  protected connectContract(): PackContract {
    return Pack__factory.connect(this.address, this.providerOrSigner);
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return PackModule.moduleType;
  }

  /**
   * Open Pack
   *
   * @remarks Open a pack to burn it and obtain the reward asset inside.
   *
   * @example
   * ```javascript
   * // The pack ID of the asset you want to buy
   * const packId = "0";
   * const rewards = await module.open(packId);
   * console.log(rewards);
   * ```
   */
  public async open(packId: string): Promise<NFTMetadata[]> {
    const receipt = await this.sendTransaction("openPack", [packId]);
    const logs = this.parseLogs<PackOpenRequestEvent>(
      "PackOpenRequest",
      receipt?.logs,
    );
    if (logs.length === 0) {
      throw new Error("Failed to open pack");
    }
    const event = logs[0];

    const requestId = event.args.requestId;
    const opener = event.args.opener;

    const fulfillEvent: any = await new Promise((resolve) => {
      this.readOnlyContract.once(
        // eslint-disable-next-line new-cap
        this.readOnlyContract.filters.PackOpenFulfilled(null, opener),
        (_packId, _opener, _requestId, rewardContract, rewardIds) => {
          if (requestId === _requestId) {
            resolve({
              packId: _packId,
              opener: _opener,
              requestId,
              rewardContract,
              rewardIds,
            });
          }
        },
      );
    });

    const { rewardIds, rewardContract } = fulfillEvent;
    return await Promise.all(
      rewardIds.map((rewardId: BigNumber) =>
        getMetadataWithoutContract(
          this.providerOrSigner,
          rewardContract,
          rewardId.toString(),
          this.sdk.getStorage(),
        ),
      ),
    );
  }

  public async get(packId: string): Promise<PackMetadata> {
    const [meta, state, supply] = await Promise.all([
      getMetadataWithoutContract(
        this.providerOrSigner,
        this.address,
        packId,
        this.sdk.getStorage(),
      ),
      this.readOnlyContract.getPack(packId),
      this.readOnlyContract
        .totalSupply(packId)
        .catch(() => BigNumber.from("0")),
    ]);
    const entity: PackMetadata = {
      id: packId,
      metadata: meta,
      creator: state.creator,
      currentSupply: supply,
      openStart: state.openStart.gt(0)
        ? new Date(state.openStart.toNumber() * 1000)
        : null,
    };
    return entity;
  }

  /**
   * Get Pack Data
   *
   * @remarks Get data associated with every pack in this module.
   *
   * @example
   * ```javascript
   * const packs = await module.getAll();
   * console.log(packs);
   * ```
   *
   * @returns The NFT metadata for all NFTs in the module.
   */
  public async getAll(): Promise<PackMetadata[]> {
    const maxId = (await this.readOnlyContract.nextTokenId()).toNumber();
    return await Promise.all(
      Array.from(Array(maxId).keys()).map((i) => this.get(i.toString())),
    );
  }

  /**
   * Get Pack Reward Data
   *
   * @remarks Get data associated with the rewards inside a specified pack
   *
   * @example
   * ```javascript
   * // The pack ID of the pack whos rewards you want to get
   * const packId = 0;
   *
   * const nfts = await module.getNFTs(packId);
   * console.log(nfts);
   * ```
   *
   * @returns The NFT metadata for all NFTs in the module.
   */
  public async getNFTs(packId: string): Promise<PackNFTMetadata[]> {
    const packReward = await this.readOnlyContract.getPackWithRewards(packId);
    if (!packReward.source) {
      throw new NotFoundError();
    }
    const rewards = await Promise.all(
      packReward.tokenIds.map((tokenId) =>
        getMetadataWithoutContract(
          this.providerOrSigner,
          packReward.source,
          tokenId.toString(),
          this.sdk.getStorage(),
        ),
      ),
    );
    return rewards.map((reward, i) => ({
      supply: packReward.amountsPacked[i],
      metadata: reward,
    }));
  }

  /**
   * Get Pack Balance
   *
   * @remarks Get a wallets pack balance (number of a specific packs in this module owned by the wallet).
   *
   * @example
   * ```javascript
   * // Address of the wallet to check pack balance
   * const address = "{{wallet_address}}"";
   * // The token ID of the pack you want to check the wallets balance of
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
    return await this.balanceOf(await this.getSignerAddress(), tokenId);
  }

  public async isApproved(address: string, operator: string): Promise<boolean> {
    return await this.readOnlyContract.isApprovedForAll(address, operator);
  }

  public async setApproval(operator: string, approved = true) {
    await this.sendTransaction("setApprovalForAll", [operator, approved]);
  }

  /**
   * Transfer Pack
   *
   * @remarks Transfer a pack from the connected wallet to another wallet.
   *
   * @example
   * ```javascript
   * // Address of the wallet you want to send the pack to
   * const toAddress = "0x...";
   *
   * // The token ID of the pack you want to send
   * const tokenId = "0";
   *
   * // The number of packs you want to send
   * const amount = 1;
   *
   * await module.transfer(toAddress, tokenId, amount);
   * ```
   */
  public async transfer(to: string, tokenId: string, amount: BigNumber) {
    await this.sendTransaction("safeTransferFrom", [
      await this.getSignerAddress(),
      to,
      tokenId,
      amount,
      [0],
    ]);
  }

  // owner functions
  /**
   * Create Pack
   *
   * @remarks Create a new pack with its own rewards.
   *
   * @example
   * ```javascript
   * // Data to create the pack
   * const pack = {
   *   // The address of the contract that holds the rewards you want to include
   *   assetContract: "0x...",
   *   // The metadata of the pack
   *   metadata: {
   *     name: "Cool Pack",
   *     description: "This is a cool pack",
   *     // This can be an image url or image file
   *     image: readFileSync("path/to/image.png"),
   *   },
   *   // The NFTs you want to include in the pack
   *   assets: [
   *     {
   *       tokenId: 0, // The token ID of the asset you want to add
   *       amount: 1, // The amount of the asset you want to add
   *     }, {
   *       tokenId: 1,
   *       amount: 1,
   *     }
   *   ],
   * };
   *
   * await module.create(pack);
   * ```
   *
   * @param args - Args for the pack creation
   * @returns - The newly created pack metadata
   */
  public async create(args: IPackCreateArgs): Promise<PackMetadata> {
    const asset = ERC1155__factory.connect(
      args.assetContract,
      this.providerOrSigner,
    );

    const from = await this.getSignerAddress();
    const ids = args.assets.map((a) => a.tokenId);
    const amounts = args.assets.map((a) => a.amount);
    const uri = await this.sdk.getStorage().uploadMetadata(args.metadata);

    const packParams = ethers.utils.defaultAbiCoder.encode(
      ["string", "uint256", "uint256"],
      [uri, args.secondsUntilOpenStart || 0, args.rewardsPerOpen || 1],
    );

    // TODO: make it gasless
    const tx = await asset.safeBatchTransferFrom(
      from,
      this.address,
      ids,
      amounts,
      packParams,
      await this.getCallOverrides(),
    );

    const receipt = await tx.wait();
    const log = this.parseLogs<PackCreatedEvent>("PackCreated", receipt.logs);
    if (log.length === 0) {
      throw new Error("PackCreated event not found");
    }
    const packId = log[0].args.packId;
    return await this.get(packId.toString());
  }

  public async transferFrom(
    from: string,
    to: string,
    args: IPackBatchArgs,
    data: BytesLike = [0],
  ) {
    await this.sendTransaction("safeTransferFrom", [
      from,
      to,
      args.tokenId,
      args.amount,
      data,
    ]);
  }

  public async transferBatchFrom(
    from: string,
    to: string,
    args: IPackBatchArgs[],
    data: BytesLike = [0],
  ) {
    const ids = args.map((a) => a.tokenId);
    const amounts = args.map((a) => a.amount);
    await this.sendTransaction("safeBatchTransferFrom", [
      from,
      to,
      ids,
      amounts,
      data,
    ]);
  }

  public async getLinkBalance(): Promise<CurrencyValue> {
    const chainId = await this.getChainID();
    const chainlink = ChainlinkVrf[chainId];
    const erc20 = ERC20__factory.connect(
      chainlink.linkTokenAddress,
      this.providerOrSigner,
    );
    return await getCurrencyValue(
      this.providerOrSigner,
      chainlink.linkTokenAddress,
      await erc20.balanceOf(this.address),
    );
  }

  public async depositLink(amount: BigNumberish) {
    const chainId = await this.getChainID();
    const chainlink = ChainlinkVrf[chainId];
    const erc20 = ERC20__factory.connect(
      chainlink.linkTokenAddress,
      this.providerOrSigner,
    );
    // TODO: make it gasless
    const tx = await erc20.transfer(
      this.address,
      amount,
      await this.getCallOverrides(),
    );
    await tx.wait();
  }

  public async withdrawLink(to: string, amount: BigNumberish) {
    try {
      // old version of the contract
      const _contract = new Contract(
        this.address,
        [
          {
            inputs: [
              {
                internalType: "address",
                name: "_to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
            ],
            name: "transferLink",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        this.providerOrSigner,
      );
      await this.sendContractTransaction(_contract, "transferLink", [
        to,
        amount,
      ]);
    } catch (e) {
      // new version of the contract
      const chainId = await this.getChainID();
      const chainlink = ChainlinkVrf[chainId];
      await this.sendTransaction("transferERC20", [
        chainlink.linkTokenAddress,
        to,
        amount,
      ]);
    }
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

  public async setModuleMetadata(metadata: MetadataURIOrObject) {
    const uri = await this.sdk.getStorage().uploadMetadata(metadata);
    await this.sendTransaction("setContractURI", [uri]);
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

  /**
   * `getOwned` is a convenience method for getting all owned tokens
   * for a particular wallet.
   *
   * @param _address - The address to check for token ownership
   * @returns An array of PackMetadataWithBalance objects that are owned by the address
   */
  public async getOwned(_address?: string): Promise<PackMetadataWithBalance[]> {
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
      ownedBalances.map(async ({ tokenId, balance }) => {
        const token = await this.get(tokenId.toString());
        return { ...token, ownedByAddress: balance };
      }),
    );
  }
}
