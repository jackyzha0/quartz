import { SignatureMint1155Module } from "./signature-mint-1155";
import {
  Coin__factory,
  DataStore__factory,
  IERC20__factory,
  LazyMintERC1155__factory,
  LazyMintERC721__factory,
  Marketplace__factory,
  Market__factory,
  NFTCollection__factory,
  Pack__factory,
  ProtocolControl,
  ProtocolControl__factory,
  Royalty__factory,
  SignatureMint1155__factory,
  SignatureMint721__factory,
  Splits__factory,
  VotingGovernor__factory,
} from "@3rdweb/contracts";
import { AddressZero } from "@ethersproject/constants";
import { TransactionReceipt } from "@ethersproject/providers";
import { BigNumber, Contract, ethers, Signer } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { JsonConvert } from "json2typescript";
import {
  ChainlinkVrf,
  CurrencyValue,
  getCurrencyValue,
  isNativeToken,
  Role,
  RolesMap,
} from "../common";
import { SUPPORTED_CHAIN_ID } from "../common/chain";
import { getContractMetadata } from "../common/contract";
import {
  getCurrencyBalance,
  getNativeTokenByChainId,
} from "../common/currency";
import { invariant } from "../common/invariant";
import { ModuleType } from "../common/module-type";
import { ModuleWithRoles } from "../core/module";
import { MetadataURIOrObject } from "../core/types";
import IAppModule from "../interfaces/IAppModule";
import FileOrBuffer from "../types/FileOrBuffer";
import {
  BundleDropModuleMetadata,
  BundleModuleMetadata,
  CommonModuleMetadata,
  CurrencyModuleMetadata,
  DatastoreModuleMetadata,
  DropModuleMetadata,
  MarketModuleMetadata,
  NewSplitRecipient,
  NftModuleMetadata,
  PackModuleMetadata,
  SplitsModuleMetadata,
  TokenModuleMetadata,
  VoteModuleMetadata,
} from "../types/module-deployments";
import MarketplaceModuleMetadata from "../types/module-deployments/MarketplaceModuleMetadata";
import { ModuleMetadata, ModuleMetadataNoType } from "../types/ModuleMetadata";
import { DEFAULT_BLOCK_TIMES_FALLBACK } from "../utils/blockTimeEstimator";
import { BundleDropModule } from "./bundleDrop";
import { CollectionModule } from "./collection";
import { DatastoreModule } from "./datastore";
import { DropModule } from "./drop";
import { MarketModule } from "./market";
import { MarketplaceModule } from "./marketplace";
import { NFTModule } from "./nft";
import { PackModule } from "./pack";
import { SplitsModule } from "./royalty";
import { CurrencyModule, TokenModule } from "./token";
import { VoteModule } from "./vote";

/**
 * Access this module by calling {@link ThirdwebSDK.getAppModule}
 * @public
 */
export class AppModule
  extends ModuleWithRoles<ProtocolControl>
  implements IAppModule
{
  private _shouldCheckVersion = true;
  private _isV1 = false;
  private jsonConvert = new JsonConvert();

  public static roles = [RolesMap.admin] as const;

  /**
   * @override
   * @internal
   */
  protected getModuleRoles(): readonly Role[] {
    return CurrencyModule.roles;
  }

  /**
   * The internal module type for the app module.
   * We do not treat it as a fully fledged module on the contract level, so it does not have a real type.
   * @internal
   * @readonly
   */
  private moduleType: ModuleType = -1;

  /**
   * @internal
   */
  protected connectContract(): ProtocolControl {
    return ProtocolControl__factory.connect(
      this.address,
      this.providerOrSigner,
    );
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return this.moduleType;
  }

  /**
   * @internal
   *
   */
  private async getModuleAddress(moduleType: ModuleType): Promise<string[]> {
    return await this.readOnlyContract.getAllModulesOfType(moduleType);
  }

  private async getNFTAddress(): Promise<string[]> {
    return this.getModuleAddress(ModuleType.NFT);
  }

  private async getBundleAddress(): Promise<string[]> {
    return this.getModuleAddress(ModuleType.BUNDLE);
  }

  private async getPackAddress(): Promise<string[]> {
    return this.getModuleAddress(ModuleType.PACK);
  }

  private async getCurrencyAddress(): Promise<string[]> {
    return this.getModuleAddress(ModuleType.CURRENCY);
  }

  private async getMarketAddress(): Promise<string[]> {
    return this.getModuleAddress(ModuleType.MARKET);
  }

  private async getDropAddress(): Promise<string[]> {
    return this.getModuleAddress(ModuleType.DROP);
  }

  private async getDatastoreAddress(): Promise<string[]> {
    return this.getModuleAddress(ModuleType.DATASTORE);
  }

  public async getRoyaltyTreasury(address?: string): Promise<string> {
    return await this.readOnlyContract.getRoyaltyTreasury(
      address || AddressZero,
    );
  }

  /**
   * @internal
   * @param addresses - The addresses of the modules to get metadata for.
   */
  public async getAllContractMetadata(
    addresses: string[],
    resolveGateway = true,
  ): Promise<ModuleMetadataNoType[]> {
    const metadatas = await Promise.all(
      addresses.map((address) =>
        getContractMetadata(
          this.providerOrSigner,
          address,
          this.sdk.getStorage(),
          resolveGateway,
        ),
      ),
    );
    return addresses
      .filter((d) => d)
      .map((address, i) => {
        return {
          address,
          metadata: metadatas[i],
        };
      });
  }

  /**
   * Method to get a list of pack module metadata.
   * @returns A promise of an array of Pack modules.
   * @deprecated - Use {@link AppModule.getAllModuleMetadata} instead
   */
  public async getPackModules(): Promise<ModuleMetadata[]> {
    return (await this.getAllContractMetadata(await this.getPackAddress())).map(
      (m) => ({
        ...m,
        type: ModuleType.PACK,
      }),
    );
  }

  /**
   * Method to get a list of NFT module metadata.
   * @returns A promise of an array of NFT modules.
   * @deprecated - Use {@link AppModule.getAllModuleMetadata} instead
   */
  public async getNFTModules(): Promise<ModuleMetadata[]> {
    return (await this.getAllContractMetadata(await this.getNFTAddress())).map(
      (m) => ({
        ...m,
        type: ModuleType.NFT,
      }),
    );
  }

  /**
   * Method to get a list of Bundle module metadata.
   * @returns A promise of an array of Bundle modules.
   * @deprecated - Use {@link AppModule.getAllModuleMetadata} instead
   */
  public async getCollectionModules(): Promise<ModuleMetadata[]> {
    return await this.getBundleModules();
  }

  public async getBundleModules(): Promise<ModuleMetadata[]> {
    return (
      await this.getAllContractMetadata(await this.getBundleAddress())
    ).map((m) => ({
      ...m,
      type: ModuleType.BUNDLE,
    }));
  }

  /**
   * Method to get a list of Currency module metadata.
   * @returns A promise of an array of Currency modules.
   * @deprecated - Use {@link AppModule.getAllModuleMetadata} instead
   */
  public async getCurrencyModules(): Promise<ModuleMetadata[]> {
    return (
      await this.getAllContractMetadata(await this.getCurrencyAddress())
    ).map((m) => ({
      ...m,
      type: ModuleType.CURRENCY,
    }));
  }

  /**
   * Method to get a list of Datastore module metadata.
   * @alpha
   * @returns A promise of an array of Datastore modules.
   * @deprecated - Use {@link AppModule.getAllModuleMetadata} instead
   */
  public async getDatastoreModules(): Promise<ModuleMetadata[]> {
    return (
      await this.getAllContractMetadata(await this.getDatastoreAddress())
    ).map((m) => ({
      ...m,
      type: ModuleType.DATASTORE,
    }));
  }

  /**
   * Method to get a list of Market module metadata.
   * @returns A promise of an array of Market modules.
   * @deprecated - Use {@link AppModule.getAllModuleMetadata} instead
   */
  public async getMarketModules(): Promise<ModuleMetadata[]> {
    return (
      await this.getAllContractMetadata(await this.getMarketAddress())
    ).map((m) => ({
      ...m,
      type: ModuleType.MARKET,
    }));
  }

  /**
   * Method to get a list of Drop module metadata.
   * @returns A promise of an array of Drop modules.
   * @deprecated - Use {@link AppModule.getAllModuleMetadata} instead
   */
  public async getDropModules(): Promise<ModuleMetadata[]> {
    return (await this.getAllContractMetadata(await this.getDropAddress())).map(
      (m) => ({
        ...m,
        type: ModuleType.DROP,
      }),
    );
  }

  /**
   * Method to get a list of all module metadata on a given app.
   * @public
   * @param filterByModuleType - Optional array of {@link ModuleType} to filter by.
   * @returns Array of module metadata
   */
  public async getAllModuleMetadata(
    filterByModuleType?: ModuleType[],
    resolveGateway = true,
  ): Promise<ModuleMetadata[]> {
    const moduleTypesToGet = filterByModuleType || [
      ModuleType.NFT,
      ModuleType.BUNDLE,
      ModuleType.PACK,
      ModuleType.TOKEN,
      ModuleType.MARKET,
      ModuleType.DATASTORE,
      ModuleType.DROP,
      ModuleType.BUNDLE_DROP,
      ModuleType.VOTE,
    ];
    return (
      await Promise.all(
        moduleTypesToGet.map(async (moduleType) => {
          const moduleAddresses = await this.getModuleAddress(moduleType);
          return (
            await this.getAllContractMetadata(moduleAddresses, resolveGateway)
          ).map((m) => ({
            ...m,
            type: moduleType,
          }));
        }),
      )
    ).reduce((acc, curr) => acc.concat(curr), []);
  }

  /**
   * Trusted forwarder is used to forward gasless transactions. Trusted Forwarder of each module cannot be changed once it is deployed.
   *
   * @returns The address of the trusted forwarder contract
   */
  public async getForwarder(): Promise<string> {
    return await this.readOnlyContract.getForwarder();
  }

  // owner functions
  /**
   * Set trusted forwarder for the modules. Every module that is deployed after this call will use the new forwarder.
   * Trusted forwarder is used to forward gasless transactions. Trusted Forwarder of each module cannot be changed once it is deployed.
   *
   * @param address - The address of the trusted forwarder contract
   */
  public async setForwarder(address: string): Promise<void> {
    await this.contract.setForwarder(address);
  }

  /**
   * @deprecated - Use setMetadata() instead
   */
  public async setModuleMetadata(
    metadata: MetadataURIOrObject,
  ): Promise<TransactionReceipt> {
    const uri = await this.sdk.getStorage().uploadMetadata(metadata);
    return await this.sendTransaction("setContractURI", [uri]);
  }

  public async setRoyaltyTreasury(
    treasury: string,
  ): Promise<TransactionReceipt> {
    try {
      return await this.sendTransaction("setRoyaltyTreasury", [treasury]);
    } catch (e: any) {
      if (e?.message?.includes("provider shares too low")) {
        throw new Error(
          `Missing thirdweb fees. Please set it to a Royalty Splits address, which can deployed using "deployRoyaltySplitsModule({...})".`,
        );
      }
      throw e;
    }
  }

  public async setModuleRoyaltyTreasury(
    moduleAddress: string,
    treasury: string,
  ): Promise<TransactionReceipt> {
    // Note: connecting module address contract. Only need to access setContractURI abi
    // any Interface with setContractURI can be used.
    const moduleContract = new Contract(
      moduleAddress,
      ProtocolControl__factory.createInterface(),
      this.providerOrSigner,
    );

    const metadata = await getContractMetadata(
      this.providerOrSigner,
      moduleAddress,
      this.sdk.getStorage(),
      false,
    );
    const uri = await this.sdk.getStorage().uploadMetadata({
      ...metadata,
      fee_recipient: treasury,
    });

    // static call to make sure the call won't fail.
    try {
      await this.contract.callStatic.setModuleRoyaltyTreasury(
        moduleAddress,
        treasury,
      );
      await moduleContract.callStatic.setContractURI(uri);
    } catch (e: any) {
      if (e?.message?.includes("provider shares too low")) {
        throw new Error(
          `Missing thirdweb fees. Please set it to a Royalty Splits address, which can deployed using "deployRoyaltySplitsModule({...})".`,
        );
      }
      throw e;
    }

    // can't multicall cause 2 different modules. sad.
    await this.sendContractTransaction(moduleContract, "setContractURI", [uri]);
    return await this.sendTransaction("setModuleRoyaltyTreasury", [
      moduleAddress,
      treasury,
    ]);
  }

  /**
   * Checks to see if an address is either the current protocol
   * control address, or a splits module address.
   *
   * @internal
   * @param address - The address to check.
   * @returns - True if the address is of this protocol control or if its a split module.
   */
  private async isValidRoyaltyRecipient(address: string): Promise<boolean> {
    if (address.toLowerCase() === this.address.toLowerCase()) {
      return true;
    }

    const contract = this.sdk.getSplitsModule(address);
    try {
      await contract.balanceOf(this.address);
      return true;
    } catch (err) {
      return false;
    }
  }

  public async withdrawFunds(
    to: string,
    currency: string,
  ): Promise<TransactionReceipt> {
    const provider = this.readOnlyContract.provider;
    let lastTransaction: TransactionReceipt | null = null;
    const isNative = isNativeToken(currency);
    if (isNative) {
      currency = ethers.constants.AddressZero;
    }

    // should fetch for contract only, not treasury
    const balance = await getCurrencyBalance(provider, currency, this.address);
    const bn = BigNumber.from(balance.value);

    // tries to withdraw from the project
    if (bn.gt(0)) {
      // v1 erc20 doesn't work, so check for v2 or native
      const isV2 = !(await this.isV1());
      if (isV2 || isNative) {
        lastTransaction = await this.sendTransaction("withdrawFunds", [
          to,
          currency,
        ]);
      }
    }

    // tries to withdraw from the splits
    const treasury = await this.getRoyaltyTreasury();
    if (treasury !== this.address) {
      const treasuryBalance = await getCurrencyBalance(
        provider,
        currency,
        treasury,
      );
      if (BigNumber.from(treasuryBalance.value).gt(0)) {
        const royalty = Royalty__factory.connect(
          treasury,
          this.getSigner() as Signer,
        );
        if (isNative) {
          lastTransaction = await this.sendContractTransaction(
            royalty,
            "distribute()",
            [],
          );
        } else {
          lastTransaction = await this.sendContractTransaction(
            royalty,
            "distribute(address)",
            [currency],
          );
        }
      }
    }

    if (!lastTransaction) {
      throw new Error("no funds to withdraw");
    }

    return lastTransaction;
  }

  /**
   * Helper method that handles `image` property uploads if its a file
   *
   * @param metadata - The metadata of the module to be deployed
   * @returns - The sanitized metadata with an uploaded image ipfs hash
   */
  private async _prepareMetadata(metadata: CommonModuleMetadata): Promise<any> {
    if (typeof metadata.image === "string") {
      return Promise.resolve(metadata);
    }
    if (metadata.image === undefined) {
      return Promise.resolve(metadata);
    }

    metadata.image = await this.sdk
      .getStorage()
      .upload(
        metadata.image as FileOrBuffer,
        this.address,
        await this.getSignerAddress(),
      );
    return Promise.resolve(metadata);
  }

  /**
   * Helper method that deploys a module and returns its address
   *
   * @internal
   *
   * @param moduleType - The ModuleType to deploy
   * @param args - Constructor arguments for the module
   * @param factory - The ABI factory used to call the `deploy` method
   * @returns The address of the deployed module
   */
  private async _deployModule<T extends ModuleType>(
    moduleType: T,
    args: any[],
    factory: any,
  ): Promise<string> {
    await this.onlyRoles(["admin"], await this.getSignerAddress());
    const gasPrice = await this.sdk.getGasPrice();
    const txOpts = gasPrice
      ? { gasPrice: ethers.utils.parseUnits(gasPrice.toString(), "gwei") }
      : {};

    const tx = await new ethers.ContractFactory(factory.abi, factory.bytecode)
      .connect(this.signer as Signer)
      .deploy(...args, txOpts);

    await tx.deployed();
    const contractAddress = tx.address;

    const addModuleTx = await this.contract.addModule(
      contractAddress,
      moduleType,
      txOpts,
    );
    await addModuleTx.wait();
    return contractAddress;
  }

  /**
   * Throws an error if metadata is invalid
   *
   * @param metadata - The metadata to validate
   */
  private async verifyMetadata(metadata: {
    feeRecipient?: string;
  }): Promise<void> {
    const shouldUpdateRecipient =
      metadata.feeRecipient && metadata.feeRecipient !== this.address;

    const isValidFeeRecipient = await this.isValidRoyaltyRecipient(
      metadata.feeRecipient ? metadata.feeRecipient : this.address,
    );
    if (shouldUpdateRecipient && !isValidFeeRecipient) {
      throw new Error(
        "Invalid fee recipient, can only be the Project address or a Splits module address",
      );
    }
  }

  /**
   * Deploys a collection module.
   *
   * @param metadata - Metadata about the module.
   * @returns A promise with the newly created module.
   */
  public async deployBundleModule(
    metadata: BundleModuleMetadata,
  ): Promise<CollectionModule> {
    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      BundleModuleMetadata,
    );

    await this.verifyMetadata(metadata);

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const address = await this._deployModule(
      ModuleType.COLLECTION,
      [
        this.address,
        await this.getForwarder(),
        metadataUri,
        BigNumber.from(
          metadata.sellerFeeBasisPoints ? metadata.sellerFeeBasisPoints : 0,
        ),
      ],
      NFTCollection__factory,
    );
    if (
      metadata.feeRecipient &&
      metadata.feeRecipient !== (await this.getRoyaltyTreasury())
    ) {
      await this.setModuleRoyaltyTreasury(address, metadata.feeRecipient);
    }

    return this.sdk.getBundleModule(address);
  }

  /**
   * Deploys a Splits module
   *
   * @param metadata - The module metadata
   * @returns - The deployed splits module
   */
  public async deploySplitsModule(
    metadata: SplitsModuleMetadata,
  ): Promise<SplitsModule> {
    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      SplitsModuleMetadata,
    );

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const address = await this._deployModule(
      ModuleType.SPLITS,
      [
        this.address,
        await this.getForwarder(),
        metadataUri,
        metadata.recipientSplits.map((s) => s.address),
        metadata.recipientSplits.map((s) => s.shares),
      ],
      metadata.isRoyalty ? Royalty__factory : Splits__factory,
    );

    return this.sdk.getSplitsModule(address);
  }

  /**
   * Deploys a Royalty Splits module
   *
   * @param metadata - The module metadata
   * @returns - The deployed splits module
   */
  public async deployRoyaltySplitsModule(
    metadata: SplitsModuleMetadata,
  ): Promise<SplitsModule> {
    metadata.isRoyalty = true;
    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      SplitsModuleMetadata,
    );

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const address = await this._deployModule(
      ModuleType.SPLITS,
      [
        this.address,
        await this.getForwarder(),
        metadataUri,
        metadata.recipientSplits.map((s) => s.address),
        metadata.recipientSplits.map((s) => s.shares),
      ],
      Royalty__factory,
    );

    return this.sdk.getSplitsModule(address);
  }

  /**
   * Deploys a NFT module.
   *
   * @param metadata - The module metadata
   * @returns - The deployed NFT module
   */
  public async deployNftModule(
    metadata: NftModuleMetadata,
  ): Promise<NFTModule> {
    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      NftModuleMetadata,
    );

    await this.verifyMetadata(metadata);

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const nativeTokenWrapperAddress = getNativeTokenByChainId(
      await this.getChainID(),
    ).wrapped.address;

    const address = await this._deployModule(
      ModuleType.NFT,
      [
        metadata.name,
        metadata.symbol ? metadata.symbol : "",
        metadataUri,
        this.address,
        await this.getForwarder(),
        nativeTokenWrapperAddress,
        metadata.defaultSaleRecipientAddress
          ? metadata.defaultSaleRecipientAddress
          : await this.getSignerAddress(),
        metadata.sellerFeeBasisPoints,
        metadata.primarySaleFeeBasisPoints
          ? metadata.primarySaleFeeBasisPoints
          : 0,
      ],
      SignatureMint721__factory,
    );
    if (
      metadata.feeRecipient &&
      metadata.feeRecipient !== (await this.getRoyaltyTreasury())
    ) {
      await this.setModuleRoyaltyTreasury(address, metadata.feeRecipient);
    }
    return this.sdk.getNFTModule(address);
  }

  /**
   * Deploys a currency module.
   *
   * @param metadata - The module metadata
   * @returns - The deployed currency module
   */
  public async deployCurrencyModule(
    metadata: CurrencyModuleMetadata,
  ): Promise<CurrencyModule> {
    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      CurrencyModuleMetadata,
    );

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const address = await this._deployModule(
      ModuleType.CURRENCY,
      [
        this.address,
        metadata.name,
        metadata.symbol ? metadata.symbol : "",
        await this.getForwarder(),
        metadataUri,
      ],
      Coin__factory,
    );

    return this.sdk.getCurrencyModule(address);
  }

  /**
   * Deploys a token module.
   *
   * @param metadata - The module metadata
   * @returns - The deployed currency module
   */
  public async deployTokenModule(
    metadata: TokenModuleMetadata,
  ): Promise<TokenModule> {
    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      CurrencyModuleMetadata,
    );

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const address = await this._deployModule(
      ModuleType.CURRENCY,
      [
        this.address,
        metadata.name,
        metadata.symbol ? metadata.symbol : "",
        await this.getForwarder(),
        metadataUri,
      ],
      Coin__factory,
    );

    return this.sdk.getTokenModule(address);
  }

  /**
   * Deploys a Marketplace module
   *
   * @param metadata - The module metadata
   * @returns - The deployed Marketplace module
   */
  public async deployMarketModule(
    metadata: MarketModuleMetadata,
  ): Promise<MarketModule> {
    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      MarketModuleMetadata,
    );

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const address = await this._deployModule(
      ModuleType.MARKET,
      [
        this.address,
        await this.getForwarder(),
        metadataUri,
        metadata.marketFeeBasisPoints ? metadata.marketFeeBasisPoints : 0,
      ],
      Market__factory,
    );

    return this.sdk.getMarketModule(address);
  }

  /**
   * Deploys a Pack module
   *
   * @param metadata - The module metadata
   * @returns - The deployed Pack module
   */
  public async deployPackModule(
    metadata: PackModuleMetadata,
  ): Promise<PackModule> {
    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      PackModuleMetadata,
    );

    await this.verifyMetadata(metadata);

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const chainId = await this.getChainID();
    const { vrfCoordinator, linkTokenAddress, keyHash, fees } =
      ChainlinkVrf[chainId as keyof typeof ChainlinkVrf];

    const address = await this._deployModule(
      ModuleType.PACK,
      [
        this.address,
        metadataUri,
        vrfCoordinator,
        linkTokenAddress,
        keyHash,
        fees,
        await this.getForwarder(),
        metadata.sellerFeeBasisPoints ? metadata.sellerFeeBasisPoints : 0,
      ],
      Pack__factory,
    );
    if (
      metadata.feeRecipient &&
      metadata.feeRecipient !== (await this.getRoyaltyTreasury())
    ) {
      await this.setModuleRoyaltyTreasury(address, metadata.feeRecipient);
    }
    return this.sdk.getPackModule(address);
  }

  /**
   * Deploys a Drop module
   *
   * @param metadata - The module metadata
   * @returns - The deployed Drop module
   */
  public async deployDropModule(
    metadata: DropModuleMetadata,
  ): Promise<DropModule> {
    invariant(
      metadata.primarySaleRecipientAddress !== "" &&
        isAddress(metadata.primarySaleRecipientAddress),
      "Primary sale recipient address must be specified and must be a valid address",
    );

    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      DropModuleMetadata,
    );

    await this.verifyMetadata(metadata);

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const nativeTokenWrapperAddress = getNativeTokenByChainId(
      await this.getChainID(),
    ).wrapped.address;

    const address = await this._deployModule(
      ModuleType.DROP,
      [
        metadata.name,
        metadata.symbol ? metadata.symbol : "",
        metadataUri,
        this.address,
        await this.getForwarder(),
        nativeTokenWrapperAddress,
        metadata.primarySaleRecipientAddress,
        metadata.sellerFeeBasisPoints ? metadata.sellerFeeBasisPoints : 0,
        metadata.primarySaleFeeBasisPoints
          ? metadata.primarySaleFeeBasisPoints
          : 0,
      ],
      LazyMintERC721__factory,
    );
    if (
      metadata.feeRecipient &&
      metadata.feeRecipient !== (await this.getRoyaltyTreasury())
    ) {
      await this.setModuleRoyaltyTreasury(address, metadata.feeRecipient);
    }
    return this.sdk.getDropModule(address);
  }

  /**
   * Deploys a BundleSignature module
   *
   * @param metadata - The module metadata
   * @returns - The deployed BundleSignature module
   */
  public async deployBundleSignatureModule(
    metadata: DropModuleMetadata,
  ): Promise<SignatureMint1155Module> {
    invariant(
      metadata.primarySaleRecipientAddress !== "" &&
        isAddress(metadata.primarySaleRecipientAddress),
      "Primary sale recipient address must be specified and must be a valid address",
    );

    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      DropModuleMetadata,
    );

    await this.verifyMetadata(metadata);

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const nativeTokenWrapperAddress = getNativeTokenByChainId(
      await this.getChainID(),
    ).wrapped.address;

    const royaltyTreasury = await this.getRoyaltyTreasury();

    const address = await this._deployModule(
      ModuleType.BUNDLE_SIGNATURE,
      [
        metadataUri,
        this.address,
        await this.getForwarder(),
        nativeTokenWrapperAddress,
        metadata.primarySaleRecipientAddress,
        metadata.feeRecipient ? metadata.feeRecipient : royaltyTreasury,
        metadata.sellerFeeBasisPoints ? metadata.sellerFeeBasisPoints : 0,
        metadata.primarySaleFeeBasisPoints
          ? metadata.primarySaleFeeBasisPoints
          : 0,
      ],
      SignatureMint1155__factory,
    );
    if (metadata.feeRecipient && metadata.feeRecipient !== royaltyTreasury) {
      await this.setModuleRoyaltyTreasury(address, metadata.feeRecipient);
    }
    return this.sdk.getBundleSignatureModule(address);
  }

  /**
   * Deploys a Bundle Drop module
   *
   * @param metadata - The module metadata
   * @returns - The deployed Bundle Drop module
   */
  public async deployBundleDropModule(
    metadata: BundleDropModuleMetadata,
  ): Promise<BundleDropModule> {
    invariant(
      metadata.primarySaleRecipientAddress !== "" &&
        isAddress(metadata.primarySaleRecipientAddress),
      "Primary sale recipient address must be specified and must be a valid address",
    );

    await this.verifyMetadata(metadata);

    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      DropModuleMetadata,
    );

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const nativeTokenWrapperAddress = getNativeTokenByChainId(
      await this.getChainID(),
    ).wrapped.address;

    const address = await this._deployModule(
      ModuleType.BUNDLE_DROP,
      [
        metadataUri,
        this.address,
        await this.getForwarder(),
        nativeTokenWrapperAddress,
        metadata.primarySaleRecipientAddress,
        metadata.sellerFeeBasisPoints ? metadata.sellerFeeBasisPoints : 0,
        metadata.primarySaleFeeBasisPoints
          ? metadata.primarySaleFeeBasisPoints
          : 0,
      ],
      LazyMintERC1155__factory,
    );
    if (
      metadata.feeRecipient &&
      metadata.feeRecipient !== (await this.getRoyaltyTreasury())
    ) {
      await this.setModuleRoyaltyTreasury(address, metadata.feeRecipient);
    }
    return this.sdk.getBundleDropModule(address);
  }

  /**
   * Deploys a Datastore module
   *
   * @alpha
   * @param metadata - The module metadata
   * @returns - The deployed Datastore module
   */
  public async deployDatastoreModule(
    metadata: DatastoreModuleMetadata,
  ): Promise<DatastoreModule> {
    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      DatastoreModuleMetadata,
    );

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const address = await this._deployModule(
      ModuleType.DATASTORE,
      [this.address, await this.getForwarder(), metadataUri],
      DataStore__factory,
    );

    return this.sdk.getDatastoreModule(address);
  }

  /**
   * Deploys a Vote module
   *
   * @param metadata - The module metadata
   * @returns - The deployed vote module
   */
  public async deployVoteModule(
    metadata: VoteModuleMetadata,
  ): Promise<VoteModule> {
    invariant(
      metadata.votingTokenAddress !== "" &&
        isAddress(metadata.votingTokenAddress),
      "Voting Token Address must be a valid address",
    );
    invariant(
      metadata.votingQuorumFraction >= 0 &&
        metadata.votingQuorumFraction <= 100,
      "Quofrum Fraction must be in the range of 0-100 representing percentage",
    );

    const chainId = await this.getChainID();
    const timeBetweenBlocks =
      DEFAULT_BLOCK_TIMES_FALLBACK[chainId as SUPPORTED_CHAIN_ID];

    const waitTimeInBlocks =
      metadata.proposalStartWaitTimeInSeconds /
      timeBetweenBlocks.secondsBetweenBlocks;
    const votingTimeInBlocks =
      metadata.proposalVotingTimeInSeconds /
      timeBetweenBlocks.secondsBetweenBlocks;

    metadata.votingDelay = waitTimeInBlocks;
    metadata.votingPeriod = votingTimeInBlocks;

    // verify making sure that the voting token address is valid
    try {
      await Coin__factory.connect(
        metadata.votingTokenAddress,
        this.readOnlyContract.provider,
      ).callStatic.getPastTotalSupply(0);
    } catch (e) {
      invariant(false, "Token is not compatible with the vote module");
    }

    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      VoteModuleMetadata,
    );

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const address = await this._deployModule(
      ModuleType.VOTE,
      [
        metadata.name,
        metadata.votingTokenAddress,
        BigNumber.from(Math.ceil(metadata.votingDelay)),
        BigNumber.from(Math.ceil(metadata.votingPeriod)),
        BigNumber.from(metadata.minimumNumberOfTokensNeededToPropose),
        metadata.votingQuorumFraction,
        await this.getForwarder(),
        metadataUri,
      ],
      VotingGovernor__factory,
    );

    return this.sdk.getVoteModule(address);
  }

  public async shouldUpgradeToV2(): Promise<boolean> {
    if ((await this.isV1()) && this.hasValidSigner()) {
      const isAdmin = await this.readOnlyContract.hasRole(
        ethers.utils.hexZeroPad([0], 32),
        await this.getSignerAddress(),
      );
      if (isAdmin && (await this.getRoyaltyTreasury()) === this.address) {
        return true;
      }
    }
    return false;
  }

  public async shouldUpgradeModuleList(): Promise<ModuleMetadata[]> {
    // if it's v1, we don't want module's fee_recipient to be set to protocol control
    // it should be set to protocol control's `this.getRoyaltyTreasury()`
    if (!(await this.isV1())) {
      return [];
    }

    // not ready for upgrade yet. need to upgrade app first.
    // otherwise royalty of sub-modules may point to wrong royalty treasury
    if ((await this.getRoyaltyTreasury()) === this.address) {
      return [];
    }

    const modules = await this.getAllModuleMetadata(
      [
        ModuleType.NFT,
        ModuleType.BUNDLE,
        ModuleType.PACK,
        ModuleType.DROP,
        ModuleType.BUNDLE_DROP,
      ],
      false,
    );

    return modules.filter(
      (m) =>
        m.metadata?.fee_recipient?.toLowerCase() === this.address.toLowerCase(),
    );
  }

  /**
   * @internal
   */
  public async upgradeModuleList(moduleAddresses: string[]) {
    const signer = this.getSigner();
    invariant(signer, "needs a signer");

    // already filtered to make sure that the fee_recipient is set to the app
    const allUpgradableModules = await this.shouldUpgradeModuleList();

    // this already returns the correct metadata array with non-resolved metadata...
    const moduleMetadatas = allUpgradableModules.filter((m) =>
      moduleAddresses.includes(m.address),
    );

    const royaltyTreasury = await this.getRoyaltyTreasury();

    // map to address, new updated metadata
    const metadataUris = await Promise.all(
      moduleMetadatas.map((m) => {
        return this.sdk.getStorage().uploadMetadata({
          ...m.metadata,
          fee_recipient: royaltyTreasury,
        });
      }),
    );

    const nonce = await signer.getTransactionCount("pending");
    const txData = metadataUris.map((uri) =>
      this.contract.interface.encodeFunctionData("setContractURI", [uri]),
    );
    const txs = txData.map((data, i) => ({
      to: moduleMetadatas[i].address,
      nonce: nonce + i,
      data,
    }));

    // batch send :)
    const txns = await Promise.all(txs.map((tx) => signer.sendTransaction(tx)));

    // have to actually wait for each txn to be confirmed until we're finished
    return await Promise.all(txns.map((tx) => tx.wait()));
  }

  /**
   *  @internal
   * Upgrades the protocol control to v2. In v2, the royalty treasury needs to be set to be set to a splits contract.
   *
   * @param splitsModuleAddress - Optional. By default, it automatically creates a Splits for the project.
   * @param splitsRecipients - Optiional. By default, it is the signer who upgrades.
   */
  public async upgradeToV2(
    upgradeOptions: {
      splitsModuleAddress?: string;
      splitsRecipients?: NewSplitRecipient[];
    } = {},
  ) {
    if (await this.isV1UpgradedOrV2()) {
      return;
    }

    let splitsAddress = "";
    if (upgradeOptions.splitsModuleAddress) {
      splitsAddress = upgradeOptions.splitsModuleAddress;
    } else {
      if (!upgradeOptions.splitsRecipients) {
        upgradeOptions.splitsRecipients = [
          {
            address: await this.getSignerAddress(),
            shares: 100,
          },
        ];
      }

      const metadata = (await this.getMetadata()).metadata;
      splitsAddress = (
        await this.deploySplitsModule({
          name: `${metadata?.name} Royalty Treasury`,
          recipientSplits: upgradeOptions.splitsRecipients,
          isRoyalty: true,
        })
      ).address;
    }

    return await this.setRoyaltyTreasury(splitsAddress);
  }

  /**
   * Check the balance of the project wallet in the native token of the chain
   *
   * @returns - The balance of the project in the native token of the chain
   */
  public async balance(): Promise<BigNumber> {
    const projectBalance = await this.readOnlyContract.provider.getBalance(
      this.address,
    );

    let treasuryBalance = BigNumber.from(0);
    const treasury = await this.getRoyaltyTreasury();
    if (treasury.toLowerCase() !== this.address.toLowerCase()) {
      treasuryBalance = await this.readOnlyContract.provider.getBalance(
        treasury,
      );
    }

    return projectBalance.add(treasuryBalance);
  }

  /**
   * Check the balance of the project wallet in a particular
   * ERC20 token contract
   *
   * @returns - The balance of the project in the native token of the chain
   */
  public async balanceOfToken(tokenAddress: string): Promise<CurrencyValue> {
    let balance = BigNumber.from(0);
    if (isNativeToken(tokenAddress)) {
      balance = await this.balance();
    } else {
      const erc20 = IERC20__factory.connect(
        tokenAddress,
        this.readOnlyContract.provider,
      );

      // TODO: multicall :)
      // only fetch project's erc20 balance if it's not v1
      if (!(await this.isV1())) {
        try {
          balance = balance.add(await erc20.balanceOf(this.address));
        } catch (e) {
          // invalid token address
          console.error(e);
          throw new Error("invalid token address");
        }
      }

      // if it's not upgraded or v2, erc20 balance wont show up
      const treasury = await this.getRoyaltyTreasury();
      if (treasury.toLowerCase() !== this.address.toLowerCase()) {
        try {
          balance = balance.add(await erc20.balanceOf(treasury));
        } catch (e) {
          // invalid token address
          console.error(e);
          throw new Error("invalid token address");
        }
      }
    }

    return await getCurrencyValue(this.providerOrSigner, tokenAddress, balance);
  }

  /**
   * @internal
   * Check if contract is v1 or v2. If the contract doesn't have version = v1 contract.
   */
  async isV1(): Promise<boolean> {
    if (this._shouldCheckVersion) {
      try {
        await this.readOnlyContract.callStatic.version();
        this._isV1 = false;
      } catch (e) {
        this._isV1 = true;
      }
      this._shouldCheckVersion = false;
    }
    return this._isV1;
  }

  /**
   * @internal
   */
  async isV1UpgradedOrV2(): Promise<boolean> {
    return !(await this.isV1()) || !(await this.shouldUpgradeToV2());
  }

  public async deployMarketplaceModule(
    metadata: MarketplaceModuleMetadata,
  ): Promise<MarketplaceModule> {
    const serializedMetadata = this.jsonConvert.serializeObject(
      await this._prepareMetadata(metadata),
      MarketplaceModuleMetadata,
    );

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(
        serializedMetadata,
        this.address,
        await this.getSignerAddress(),
      );

    const nativeTokenWrapperAddress = getNativeTokenByChainId(
      await this.getChainID(),
    ).wrapped.address;

    const address = await this._deployModule(
      ModuleType.MARKETPLACE,
      [
        this.address,
        await this.getForwarder(),
        nativeTokenWrapperAddress,
        metadataUri,
        metadata.marketFeeBasisPoints,
      ],
      Marketplace__factory,
    );

    return this.sdk.getMarketplaceModule(address);
  }
}
