import { AddressZero } from "@ethersproject/constants";
import {
  ERC20__factory,
  ERC721__factory,
  SignatureMint1155,
  SignatureMint1155__factory,
} from "@3rdweb/contracts";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { TransactionReceipt } from "@ethersproject/providers";
import { BytesLike, ethers, Signer } from "ethers";
import { ModuleType, NATIVE_TOKEN_ADDRESS, Role, RolesMap } from "../common";
import { getTokenMetadata, NFTMetadata } from "../common/nft";
import { ModuleWithRoles } from "../core/module";
import { MetadataURIOrObject } from "../core/types";
import { ITransferable } from "../interfaces/contracts/ITransferable";
import {
  MintRequestStructOutput,
  MintWithSignatureEvent,
} from "@3rdweb/contracts/dist/SignatureMint1155";
import {
  Erc1155SignaturePayload,
  NewErc1155SignaturePayload,
} from "../types/signature-minting";
import { hexlify } from "@ethersproject/bytes";
import { toUtf8Bytes } from "ethers/lib/utils";
import { v4 as uuidv4 } from "uuid";

export interface TokenERC1155Metadata {
  supply: BigNumber;
  metadata: NFTMetadata;
  quantityOwnedByAddress: BigNumber;
}

/**
 * @beta
 */

export interface TokenERC1155CreateAndMintArgs {
  metadata: MetadataURIOrObject;
  supply: BigNumberish;
}

export interface TokenERC1155AlreadyMintedArgs {
  tokenId: BigNumberish;
  amount: BigNumberish;
}

const MintRequest = [
  { name: "to", type: "address" },
  { name: "royaltyRecipient", type: "address" },
  { name: "royaltyBps", type: "uint256" },
  { name: "primarySaleRecipient", type: "address" },
  { name: "tokenId", type: "uint256" },
  { name: "uri", type: "string" },
  { name: "quantity", type: "uint256" },
  { name: "pricePerToken", type: "uint256" },
  { name: "currency", type: "address" },
  { name: "validityStartTimestamp", type: "uint128" },
  { name: "validityEndTimestamp", type: "uint128" },
  { name: "uid", type: "bytes32" },
];

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
export class SignatureMint1155Module
  extends ModuleWithRoles<SignatureMint1155>
  implements ITransferable
{
  public static moduleType: ModuleType = ModuleType.BUNDLE_SIGNATURE;

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
    return SignatureMint1155Module.roles;
  }

  /**
   * @internal
   */
  protected connectContract(): SignatureMint1155 {
    return SignatureMint1155__factory.connect(
      this.address,
      this.providerOrSigner,
    );
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return SignatureMint1155Module.moduleType;
  }

  /**
   *
   * Get a single bundle item by tokenId.
   * @param tokenId - the unique token id of the nft
   * @returns A promise that resolves to a `BundleMetadata`.
   */
  public async get(
    tokenId: string,
    address?: string,
  ): Promise<TokenERC1155Metadata> {
    const [metadata, supply, ownedByAddress] = await Promise.all([
      getTokenMetadata(this.readOnlyContract, tokenId, this.sdk.getStorage()),
      this.readOnlyContract
        .totalSupply(tokenId)
        .catch(() => BigNumber.from("0")),
      address ? (await this.balanceOf(address, tokenId)).toNumber() : 0,
    ]);
    return {
      supply,
      metadata,
      quantityOwnedByAddress: BigNumber.from(ownedByAddress),
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
  public async getAll(address?: string): Promise<TokenERC1155Metadata[]> {
    const maxId = (await this.readOnlyContract.nextTokenIdToMint()).toNumber();
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

  public async createAndMint(args: TokenERC1155CreateAndMintArgs) {
    await this.createAndMintTo(await this.getSignerAddress(), args);
  }

  public async createAndMintTo(
    to: string,
    args: TokenERC1155CreateAndMintArgs,
  ) {
    const uri = await this.sdk.getStorage().uploadMetadata(args.metadata);
    await this.sendTransaction("mintTo", [
      to,
      ethers.constants.MaxUint256,
      uri,
      args.supply,
    ]);
  }

  public async createAndMintBatch(args: TokenERC1155CreateAndMintArgs[]) {
    await this.createAndMintBatchTo(await this.getSignerAddress(), args);
  }

  public async createAndMintBatchTo(
    to: string,
    args: TokenERC1155CreateAndMintArgs[],
  ) {
    const metadatas = args.map((a) => a.metadata);
    const amounts = args.map((a) => a.supply);
    const { metadataUris: uris } = await this.sdk
      .getStorage()
      .uploadMetadataBatch(metadatas);
    const encoded = uris.map((uri, index) =>
      this.readOnlyContract.interface.encodeFunctionData("mintTo", [
        to,
        ethers.constants.MaxUint256,
        uri,
        amounts[index],
      ]),
    );
    await this.sendTransaction("multicall", [encoded]);
  }

  public async mintAdditionalCopiesTo(
    to: string,
    args: TokenERC1155AlreadyMintedArgs,
  ) {
    await this.sendTransaction("mintTo", [to, args.tokenId, "", args.amount]);
  }

  public async mintAdditionalCopiesBatchTo(
    to: string,
    args: TokenERC1155AlreadyMintedArgs[],
  ) {
    const ids = args.map((a) => a.tokenId);
    const amounts = args.map((a) => a.amount);
    const encoded = ids.map((id, index) =>
      this.readOnlyContract.interface.encodeFunctionData("mintTo", [
        to,
        id,
        "",
        amounts[index],
      ]),
    );
    await this.sendTransaction("multicall", [encoded]);
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
  public async burn(
    args: TokenERC1155AlreadyMintedArgs,
  ): Promise<TransactionReceipt> {
    return await this.burnFrom(await this.getSignerAddress(), args);
  }

  public async burnBatch(
    args: TokenERC1155AlreadyMintedArgs[],
  ): Promise<TransactionReceipt> {
    return await this.burnBatchFrom(await this.getSignerAddress(), args);
  }

  public async burnFrom(
    account: string,
    args: TokenERC1155AlreadyMintedArgs,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("burn", [
      account,
      args.tokenId,
      args.amount,
    ]);
  }

  public async burnBatchFrom(
    account: string,
    args: TokenERC1155AlreadyMintedArgs[],
  ): Promise<TransactionReceipt> {
    const ids = args.map((a) => a.tokenId);
    const amounts = args.map((a) => a.amount);
    return await this.sendTransaction("burnBatch", [account, ids, amounts]);
  }

  public async transferFrom(
    from: string,
    to: string,
    args: TokenERC1155AlreadyMintedArgs,
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
    args: TokenERC1155AlreadyMintedArgs[],
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

  /**
   * Set the royalty recipient and fee for this contract
   * @param recipientAddress
   * @param fee
   */
  public async setDefaultRoyaltyInfo(
    recipientAddress: string,
    fee: number,
  ): Promise<TransactionReceipt> {
    // TODO: reduce this duplication and provide common functions around
    // royalties through an interface. Currently this function is
    // duplicated across 4 modules
    const { metadata } = await this.getMetadata(false);
    const encoded: string[] = [];
    if (!metadata) {
      throw new Error("No metadata found, this module might be invalid!");
    }

    metadata.fee_recipient = recipientAddress;
    metadata.seller_fee_basis_points = fee;
    const uri = await this.sdk.getStorage().uploadMetadata(
      {
        ...metadata,
      },
      this.address,
      await this.getSignerAddress(),
    );
    encoded.push(
      this.contract.interface.encodeFunctionData("setDefaultRoyaltyInfo", [
        recipientAddress,
        fee,
      ]),
    );
    encoded.push(
      this.contract.interface.encodeFunctionData("setContractURI", [uri]),
    );
    return await this.sendTransaction("multicall", [encoded]);
  }

  /**
   * Set the royalty recipient and fee for a particular token
   * @param recipientAddress
   * @param fee
   */
  public async setTokenRoyaltyInfo(
    tokenId: BigNumberish,
    recipientAddress: string,
    fee: number,
  ): Promise<TransactionReceipt> {
    return await this.sendTransaction("setRoyaltyInfoForToken", [
      tokenId,
      recipientAddress,
      fee,
    ]);
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
  public async getOwned(_address?: string): Promise<TokenERC1155Metadata[]> {
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
      ownedBalances.map(async (item) => {
        const token = await this.get(item.tokenId.toString());
        return { ...token, ownedByAddress: item.balance };
      }),
    );
  }

  /**
   * Gets the royalty recipient and BPS (basis points) of the contract
   *
   * @returns - The royalty recipient and BPS
   */
  public async getDefaultRoyaltyInfo(): Promise<[string, number]> {
    return await this.readOnlyContract.getDefaultRoyaltyInfo();
  }

  /**
   * Gets the royalty recipient and BPS (basis points) of a particular token
   *
   * @returns - The royalty recipient and BPS
   */
  public async getTokenRoyaltyInfo(
    tokenId: BigNumberish,
  ): Promise<[string, number]> {
    return await this.readOnlyContract.getRoyaltyInfoForToken(tokenId);
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

  // Signature based minting

  public async mintWithSignature(
    req: Erc1155SignaturePayload,
    signature: string,
  ): Promise<BigNumber> {
    const message = { ...this.mapPayload(req), uri: req.uri };
    const overrides = await this.getCallOverrides();
    await this.setAllowance(
      BigNumber.from(message.pricePerToken).mul(req.quantity),
      req.currencyAddress,
      overrides,
    );

    const receipt = await this.sendTransaction(
      "mintWithSignature",
      [message, signature],
      overrides,
    );

    const t = await this.parseLogs<MintWithSignatureEvent>(
      "MintWithSignature",
      receipt.logs,
    );
    if (t.length === 0) {
      throw new Error("No MintWithSignature event found");
    }

    return t[0].args.tokenIdMinted;
  }

  public async verify(
    mintRequest: Erc1155SignaturePayload,
    signature: string,
  ): Promise<boolean> {
    const message = this.mapPayload(mintRequest);
    const v = await this.readOnlyContract.verify(
      { ...message, uri: mintRequest.uri },
      signature,
    );
    return v[0];
  }

  public async generateSignatureBatch(
    payloads: NewErc1155SignaturePayload[],
  ): Promise<{ payload: Erc1155SignaturePayload; signature: string }[]> {
    const resolveId = (mintRequest: NewErc1155SignaturePayload): string => {
      if (mintRequest.id === undefined) {
        const buffer = Buffer.alloc(16);
        uuidv4({}, buffer);
        return hexlify(toUtf8Bytes(buffer.toString("hex")));
      } else {
        return hexlify(mintRequest.id as string);
      }
    };

    await this.onlyRoles(["minter"], await this.getSignerAddress());

    const { metadataUris: uris } = await this.sdk
      .getStorage()
      .uploadMetadataBatch(payloads.map((r) => r.metadata));

    const chainId = await this.getChainID();
    const signer = this.getSigner() as Signer;

    return await Promise.all(
      payloads.map(async (m, i) => {
        const id = resolveId(m);
        const uri = uris[i];
        return {
          payload: {
            ...m,
            id,
            uri,
          },
          signature: (
            await this.signTypedDataEmitEvent(
              signer,
              {
                name: "SignatureMint1155",
                version: "1",
                chainId,
                verifyingContract: this.address,
              },
              { MintRequest },
              {
                uri,
                ...(this.mapPayload(m) as any),
                uid: id,
              },
            )
          ).toString(),
        };
      }),
    );
  }

  public async generateSignature(
    mintRequest: NewErc1155SignaturePayload,
  ): Promise<{ payload: Erc1155SignaturePayload; signature: string }> {
    return (await this.generateSignatureBatch([mintRequest]))[0];
  }

  /**
   * Maps a payload to the format expected by the contract
   *
   * @internal
   *
   * @param mintRequest - The payload to map.
   * @returns - The mapped payload.
   */
  private mapPayload(
    mintRequest: Erc1155SignaturePayload | NewErc1155SignaturePayload,
  ): MintRequestStructOutput {
    return {
      to: mintRequest.to,
      royaltyRecipient: mintRequest.royaltyRecipient,
      royaltyBps: mintRequest.royaltyBps,
      primarySaleRecipient: mintRequest.primarySaleRecipient,
      tokenId: mintRequest.tokenId,
      quantity: mintRequest.quantity,
      pricePerToken: mintRequest.price,
      currency: mintRequest.currencyAddress,
      validityEndTimestamp: mintRequest.mintEndTimeEpochSeconds,
      validityStartTimestamp: mintRequest.mintStartTimeEpochSeconds,
      uid: mintRequest.id,
    } as MintRequestStructOutput;
  }

  // TODO: write in common place and stop duping
  private async setAllowance(
    value: BigNumber,
    currencyAddress: string,
    overrides: any,
  ): Promise<any> {
    if (
      currencyAddress === NATIVE_TOKEN_ADDRESS ||
      currencyAddress === AddressZero
    ) {
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
      return overrides;
    }
  }
}
