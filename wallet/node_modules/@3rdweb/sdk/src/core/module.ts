import { AccessControlEnumerable } from "@3rdweb/contracts";
import { Log, TransactionReceipt } from "@ethersproject/providers";
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  ethers,
  Signer,
} from "ethers";
import { getContractMetadata, isContract } from "../common/contract";
import { MissingRoleError } from "../common/error";
import { getGasPriceForChain } from "../common/gas-price";
import { invariant } from "../common/invariant";
import { uploadMetadata } from "../common/ipfs";
import { ModuleType } from "../common/module-type";
import { getRoleHash, Role, SetAllRoles } from "../common/role";
import { signTypedData } from "../common/sign";
import { ISDKOptions } from "../interfaces/ISdkOptions";
import { ModuleMetadata } from "../types/ModuleMetadata";
import { EventType } from "./events";
import { ThirdwebSDK } from "./index";
import type {
  GaslessTransaction,
  MetadataURIOrObject,
  ProviderOrSigner,
} from "./types";

/**
 * The root Module class. All other Modules extend this.
 * @remarks This should never be instantiated directly.
 * @public
 */
export class Module<TContract extends BaseContract = BaseContract> {
  /**
   * @readonly
   */
  public readonly address: string;
  /**
   * @internal
   * @readonly
   */
  protected readonly ipfsGatewayUrl: string;
  /**
   * @internal
   * @readonly
   */
  protected readonly options: ISDKOptions;

  protected readonly sdk: ThirdwebSDK;

  /**
   * @internal
   */
  private _providerOrSigner: ProviderOrSigner | null = null;
  /**
   * @internal
   */
  protected get providerOrSigner(): ProviderOrSigner {
    return this.signer || this._providerOrSigner || this.getProviderOrSigner();
  }

  private set providerOrSigner(value: ProviderOrSigner) {
    this._providerOrSigner = value;
  }

  /**
   * @internal
   */
  private _signer: Signer | null = null;
  /**
   * @internal
   */
  protected get signer(): Signer | null {
    return this._signer;
  }

  private set signer(value: Signer | null) {
    this._signer = value;
  }

  /**
   * Contract connects to the SDK signer or provider
   * @internal
   */
  public contract: TContract;
  /**
   * Contract connects to the {@link ISDKOptions.readOnlyRpcUrl} if provided, otherwise connect to signer or provider
   * @internal
   */
  public readOnlyContract: TContract;

  /**
   * @internal
   */
  constructor(
    providerOrSigner: ProviderOrSigner,
    address: string,
    options: ISDKOptions,
    sdk: ThirdwebSDK,
  ) {
    this.address = address;
    this.options = options;
    this.ipfsGatewayUrl = options.ipfsGatewayUrl;
    this.setProviderOrSigner(providerOrSigner);
    this.contract = this.connectContract();
    this.readOnlyContract = this.options.readOnlyRpcUrl
      ? (this.contract.connect(
          ethers.getDefaultProvider(this.options.readOnlyRpcUrl),
        ) as TContract)
      : this.contract;
    this.sdk = sdk;
  }

  /**
   * @public
   * @returns whether the given contract exists on-chain
   */
  public async exists(): Promise<boolean> {
    const provider = await this.getProvider();
    invariant(provider, "exists() -- No Provider");
    return isContract(provider, this.address);
  }

  /**
   * @public
   * Get the metadata of the contract.
   *
   * @param resolveUrls - Whether to resolve the urls in the metadata to a gateway.
   */
  public async getMetadata(resolveUrls = true): Promise<ModuleMetadata> {
    invariant(await this.exists(), "contract does not exist");
    const contract = this.connectContract();
    const type = this.getModuleType();

    return {
      metadata: await getContractMetadata(
        await this.getProvider(),
        contract.address,
        this.sdk.getStorage(),
        resolveUrls,
      ),
      address: contract.address,
      type,
    };
  }

  /**
   * @public
   * Set new metadata on the contract and return it if successful.
   * @param metadata - The metadata to set.
   */
  public async setMetadata(
    metadata: MetadataURIOrObject,
  ): Promise<ModuleMetadata> {
    invariant(await this.exists(), "contract does not exist");
    const uri = await uploadMetadata(metadata);
    await this.sendTransaction("setContractURI", [uri]);
    return this.getMetadata();
  }

  /**
   * @internal
   */
  public setProviderOrSigner(providerOrSigner: ProviderOrSigner) {
    this.providerOrSigner = providerOrSigner;
    if (Signer.isSigner(providerOrSigner)) {
      this.signer = providerOrSigner;
    }
    this.contract = this.connectContract();
    this.readOnlyContract = this.options.readOnlyRpcUrl
      ? (this.contract.connect(
          ethers.getDefaultProvider(this.options.readOnlyRpcUrl),
        ) as TContract)
      : this.contract;
  }

  /**
   * @internal
   */
  public clearSigner(): void {
    this.signer = null;
  }

  /**
   * @internal
   */
  private getProviderOrSigner(): ProviderOrSigner {
    return this.signer || this.providerOrSigner;
  }

  /**
   * @internal
   */
  protected getSigner(): Signer | null {
    if (Signer.isSigner(this.signer)) {
      return this.signer;
    }
    return null;
  }

  /**
   * @internal
   */
  protected hasValidSigner(): boolean {
    return Signer.isSigner(this.signer);
  }

  /**
   * @internal
   */
  protected async getSignerAddress(): Promise<string> {
    const signer = this.getSigner();
    invariant(signer, "Cannot get signer address without valid signer");
    return await signer.getAddress();
  }

  /**
   * @internal
   */
  protected async getProvider() {
    return this.readOnlyContract.provider;
  }

  /**
   * @internal
   */
  protected async getChainID(): Promise<number> {
    const provider = await this.getProvider();
    invariant(provider, "getChainID() -- No Provider");
    const { chainId } = await provider.getNetwork();
    return chainId;
  }

  /**
   * @virtual
   * @internal
   */
  protected connectContract(): TContract {
    throw new Error("connectContract has to be implemented");
  }

  /**
   * @virtual
   * @internal
   */
  protected getModuleType(): ModuleType {
    throw new Error("getModuleType has to be implemented");
  }

  /**
   * @internal
   */
  protected async getCallOverrides(): Promise<CallOverrides> {
    const chainId = await this.getChainID();
    const speed = this.options.gasSpeed;
    const maxGasPrice = this.options.maxGasPriceInGwei;
    const gasPriceChain = await getGasPriceForChain(
      chainId,
      speed,
      maxGasPrice,
    );
    if (!gasPriceChain) {
      return {};
    }
    // TODO: support EIP-1559 by try-catch, provider.getFeeData();
    return {
      gasPrice: ethers.utils.parseUnits(gasPriceChain.toString(), "gwei"),
    };
  }

  /**
   * @internal
   */
  private emitTransactionEvent(
    status: "submitted" | "completed",
    transactionHash: string,
  ) {
    this.sdk.event.emit(EventType.Transaction, {
      status,
      transactionHash,
    });
  }

  /**
   * @internal
   */
  protected async sendTransaction(
    fn: string,
    args: any[],
    callOverrides?: CallOverrides,
  ): Promise<TransactionReceipt> {
    return this.sendContractTransaction(this.contract, fn, args, callOverrides);
  }

  /**
   * @internal
   */
  protected async sendContractTransaction(
    contract: BaseContract,
    fn: string,
    args: any[],
    callOverrides?: CallOverrides,
  ): Promise<TransactionReceipt> {
    if (!callOverrides) {
      callOverrides = await this.getCallOverrides();
    }

    if (
      this.options.transactionRelayerUrl ||
      this.options.gasless.biconomy.apiKey
    ) {
      const provider = await this.getProvider();
      const txHash = await this.sendGaslessTransaction(
        contract,
        fn,
        args,
        callOverrides,
      );
      this.emitTransactionEvent("submitted", txHash);
      const receipt = await provider.waitForTransaction(txHash);
      this.emitTransactionEvent("completed", txHash);
      return receipt;
    } else {
      const tx = await this.sendTransactionByFunction(
        contract,
        fn,
        args,
        callOverrides,
      );
      this.emitTransactionEvent("submitted", tx.hash);
      const receipt = tx.wait();
      this.emitTransactionEvent("completed", tx.hash);
      return receipt;
    }
  }

  /**
   * @internal
   */
  private async sendTransactionByFunction(
    contract: BaseContract,
    fn: string,
    args: any[],
    callOverrides: CallOverrides,
  ): Promise<ContractTransaction> {
    const func: ethers.ContractFunction = contract.functions[fn];
    if (!func) {
      throw new Error("invalid function");
    }
    return await func(...args, callOverrides);
  }

  /**
   * @internal
   */
  private async sendGaslessTransaction(
    contract: BaseContract,
    fn: string,
    args: any[],
    callOverrides: CallOverrides,
  ): Promise<string> {
    const signer = this.getSigner();
    invariant(
      signer,
      "Cannot execute gasless transaction without valid signer",
    );
    const provider = await this.getProvider();
    invariant(provider, "no provider to execute transaction");
    const chainId = await this.getChainID();
    const from = await this.getSignerAddress();
    const to = this.address;
    const value = callOverrides?.value || 0;

    if (BigNumber.from(value).gt(0)) {
      throw new Error(
        "Cannot send native token value with gasless transaction",
      );
    }

    const data = contract.interface.encodeFunctionData(fn, args);

    const gasEstimate = await contract.estimateGas[fn](...args);
    let gas = gasEstimate.mul(2);

    // in some cases WalletConnect doesn't properly gives an estimate for how much gas it would actually use.
    // it'd estimate ~21740 on polygon.
    // as a fix, we're setting it to a high arbitrary number (500k) as the gas limit that should cover for most function calls.
    if (gasEstimate.lt(25000)) {
      gas = BigNumber.from(500000);
    }

    const tx: GaslessTransaction = {
      from,
      to,
      data,
      chainId,
      gasLimit: gas,
      functionName: fn,
      functionArgs: args,
      callOverrides,
    };

    const txHash = await this.options.gaslessSendFunction(contract, tx);
    return txHash;
  }

  /**
   * @internal
   */
  protected async signTypedDataEmitEvent(
    signer: ethers.Signer,
    domain: {
      name: string;
      version: string;
      chainId: number;
      verifyingContract: string;
    },
    types: any,
    message: any,
  ): Promise<BytesLike> {
    let signature = "";

    this.sdk.event.emit(EventType.Signature, {
      status: "submitted",
      message,
      signature,
    });

    const { signature: sig } = await signTypedData(
      signer,
      domain,
      types,
      message,
    );
    signature = sig;

    this.sdk.event.emit(EventType.Signature, {
      status: "completed",
      message,
      signature,
    });
    return signature;
  }

  protected parseEventLogs(eventName: string, logs?: Log[]): any {
    if (!logs) {
      return null;
    }
    for (const log of logs) {
      try {
        const event = this.contract.interface.decodeEventLog(
          eventName,
          log.data,
          log.topics,
        );
        return event;
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    return null;
  }

  protected parseLogs<T = any>(
    eventName: string,
    logs?: Log[],
    contract: BaseContract = this.contract,
  ): T[] {
    if (!logs || logs.length === 0) {
      return [];
    }
    const topic = contract.interface.getEventTopic(eventName);
    const parsedLogs = logs.filter((x) => x.topics.indexOf(topic) >= 0);
    return parsedLogs.map(
      (l) => contract.interface.parseLog(l) as unknown as T,
    );
  }
}

/**
 * Extends the {@link Module} class to add {@link Role} functionality.
 *
 * @public
 */
export class ModuleWithRoles<
  TContract extends AccessControlEnumerable = AccessControlEnumerable,
> extends Module<TContract> {
  /**
   * @virtual
   * @internal
   */
  protected getModuleRoles(): readonly Role[] {
    throw new Error("getModuleRoles has to be implemented by a subclass");
  }

  /**
   * @internal
   */
  private get roles() {
    return this.getModuleRoles();
  }

  /** @internal */
  constructor(
    providerOrSigner: ProviderOrSigner,
    address: string,
    options: ISDKOptions,
    sdk: ThirdwebSDK,
  ) {
    super(providerOrSigner, address, options, sdk);
  }

  /**
   * Call this to get a list of addresses that are members of a specific role.
   *
   * @param role - The {@link IRoles | role} to to get a memberlist for.
   * @returns The list of addresses that are members of the specific role.
   * @throws If you are requestiong a role that does not exist on the module this will throw an {@link InvariantError}.
   * @see {@link ModuleWithRoles.getAllRoleMembers | getAllRoleMembers} to get get a list of addresses for all supported roles on the module.
   * @example Say you want to get the list of addresses that are members of the {@link IRoles.minter | minter} role.
   * ```typescript
   * const minterAddresses: string[] = await module.getRoleMemberList("minter");
   * ```
   *
   * @public
   */
  public async getRoleMembers(role: Role): Promise<string[]> {
    invariant(
      this.roles.includes(role),
      `this module does not support the "${role}" role`,
    );
    const contract = this.readOnlyContract;
    const roleHash = getRoleHash(role);
    const count = (await contract.getRoleMemberCount(roleHash)).toNumber();
    return await Promise.all(
      Array.from(Array(count).keys()).map((i) =>
        contract.getRoleMember(roleHash, i),
      ),
    );
  }

  /**
   * Call this to get get a list of addresses for all supported roles on the module.
   *
   * @see {@link ModuleWithRoles.getRoleMembers | getRoleMembers} to get a list of addresses that are members of a specific role.
   * @returns A record of {@link Role}s to lists of addresses that are members of the given role.
   * @throws If the module does not support roles this will throw an {@link InvariantError}.
   *
   * @public
   */
  public async getAllRoleMembers(): Promise<Partial<Record<Role, string[]>>> {
    invariant(this.roles.length, "this module has no support for roles");
    const roles: Partial<Record<Role, string[]>> = {};
    for (const role of this.roles) {
      roles[role] = await this.getRoleMembers(role);
    }
    return roles;
  }
  /**
   * Call this to OVERWRITE the list of addresses that are members of specific roles.
   *
   * Every role in the list will be overwritten with the new list of addresses provided with them.
   * If you want to add or remove addresses for a single address use {@link ModuleWithRoles.grantRole | grantRole} and {@link ModuleWithRoles.grantRole | revokeRole} respectively instead.
   * @param rolesWithAddresses - A record of {@link Role}s to lists of addresses that should be members of the given role.
   * @throws If you are requestiong a role that does not exist on the module this will throw an {@link InvariantError}.
   * @example Say you want to overwrite the list of addresses that are members of the {@link IRoles.minter | minter} role.
   * ```typescript
   * const minterAddresses: string[] = await module.getRoleMemberList("minter");
   * await module.setAllRoleMembers({
   *  minter: []
   * });
   * console.log(await module.getRoleMemberList("minter")); // No matter what members had the role before, the new list will be set to []
   * ```
   * @public
   *
   * */
  public async setAllRoleMembers(
    rolesWithAddresses: SetAllRoles,
  ): Promise<any> {
    const roles = Object.keys(rolesWithAddresses);
    invariant(roles.length, "you must provide at least one role to set");
    invariant(
      roles.every((role) => this.roles.includes(role as Role)),
      "this module does not support the given role",
    );
    const currentRoles = await this.getAllRoleMembers();
    const encoded: string[] = [];
    // add / rmove admin role at the end so we don't revoke admin then grant
    roles
      .sort((role) => (role === "admin" ? 1 : -1))
      .forEach(async (role) => {
        const addresses = rolesWithAddresses[role as Role] || [];
        const currentAddresses = currentRoles[role as Role] || [];
        const toAdd = addresses.filter(
          (address) => !currentAddresses.includes(address),
        );
        const toRemove = currentAddresses.filter(
          (address) => !addresses.includes(address),
        );
        if (toAdd.length) {
          toAdd.forEach((address) => {
            encoded.push(
              this.contract.interface.encodeFunctionData("grantRole", [
                getRoleHash(role as Role),
                address,
              ]),
            );
          });
        }
        if (toRemove.length) {
          toRemove.forEach(async (address) => {
            const revokeFunctionName = (await this.getRevokeRoleFunctionName(
              address,
            )) as any;
            encoded.push(
              this.contract.interface.encodeFunctionData(revokeFunctionName, [
                getRoleHash(role as Role),
                address,
              ]),
            );
          });
        }
      });
    return await this.sendTransaction("multicall", [encoded]);
  }
  /**
   *
   * Call this to revoke all roles given to a specific address.
   * @param address - The address to revoke all roles for.
   * @returns A list of roles that were revoked.
   *
   * @public
   *
   */

  public async revokeAllRolesFromAddress(address: string): Promise<Role[]> {
    const currentRoles = await this.getAllRoleMembers();
    const encoded: string[] = [];
    const rolesRemoved: Role[] = [];
    // revoke / renounce admin role at the end
    Object.keys(currentRoles)
      .sort((role) => (role === "admin" ? 1 : -1))
      .forEach(async (role) => {
        if (currentRoles[role as Role]?.includes(address)) {
          const revokeFunctionName = (await this.getRevokeRoleFunctionName(
            address,
          )) as any;
          encoded.push(
            this.contract.interface.encodeFunctionData(revokeFunctionName, [
              getRoleHash(role as Role),
              address,
            ]),
          );
          rolesRemoved.push(role as Role);
        }
      });
    await this.sendTransaction("multicall", [encoded]);
    return rolesRemoved;
  }

  /**
   * Call this to grant a role to a specific address.
   *
   * @remarks
   *
   * Make sure you are sure you want to grant the role to the address.
   *
   * @param role - The {@link IRoles | role} to grant to the address
   * @param address - The address to grant the role to
   * @returns The transaction receipt
   * @throws If you are trying to grant does not exist on the module this will throw an {@link InvariantError}.
   *
   * @public
   */
  public async grantRole(
    role: Role,
    address: string,
  ): Promise<TransactionReceipt> {
    invariant(
      this.roles.includes(role),
      `this module does not support the "${role}" role`,
    );
    return await this.sendTransaction("grantRole", [
      getRoleHash(role),
      address,
    ]);
  }

  /**
   * Call this to revoke a role from a specific address.
   *
   * @remarks
   *
   * -- Caution --
   *
   * This will let you remove yourself from the role, too.
   * If you remove yourself from the {@link IRoles.admin | admin} role, you will no longer be able to administer the module.
   * There is no way to recover from this.
   *
   * @param role - The {@link IRoles | role} to revoke
   * @param address - The address to revoke the role from
   * @returns The transaction receipt
   * @throws If you are trying to revoke does not exist on the module this will throw an {@link InvariantError}.
   *
   * @public
   */
  public async revokeRole(
    role: Role,
    address: string,
  ): Promise<TransactionReceipt> {
    invariant(
      this.roles.includes(role),
      `this module does not support the "${role}" role`,
    );
    const revokeFunctionName = await this.getRevokeRoleFunctionName(address);
    return await this.sendTransaction(revokeFunctionName, [
      getRoleHash(role),
      address,
    ]);
  }

  private async getRevokeRoleFunctionName(address: string): Promise<string> {
    const signerAddress = await this.getSignerAddress();
    if (signerAddress.toLowerCase() === address.toLowerCase()) {
      return "renounceRole";
    }
    return "revokeRole";
  }

  /**
   * Prepares any set of metadata for uploading by recursively converting all Buffer|Blob|File objects
   * into a hash of the object after its been uploaded to distributed storage (e.g. IPFS). After uploading
   * any File|Buffer|Blob, the metadata is serialized to a string.
   *
   * @param metadata - The list of metadata to prepare for upload.
   * @returns - The serialized metadata object.
   */
  public async prepareMetadata(metadata: MetadataURIOrObject): Promise<string> {
    if (typeof metadata === "string") {
      return metadata;
    }

    const _fileHandler = async (object: any) => {
      const keys = Object.keys(object);
      for (const key in keys) {
        const val = object[keys[key]];
        const shouldUpload = val instanceof File || val instanceof Buffer;
        if (shouldUpload) {
          object[keys[key]] = await this.sdk
            .getStorage()
            .upload(object[keys[key]]);
        }
        if (shouldUpload && typeof object[keys[key]] !== "string") {
          throw new Error("Upload to IPFS failed");
        }
        if (typeof val === "object") {
          object[keys[key]] = await _fileHandler(object[keys[key]]);
        }
      }
      return object;
    };

    metadata = await _fileHandler(metadata);
    // TODO: use json2typescript to convert metadata to string
    return JSON.stringify(metadata);
  }

  /**
   * Prepares a list of metadata for uploading.
   *
   * @param metadata - List of metadata to prepare for upload.
   * @returns - List of metadata prepared for upload.
   */
  public async prepareBatchMetadata(
    metadata: MetadataURIOrObject[],
  ): Promise<string[]> {
    return await Promise.all(
      metadata.map(async (m) => await this.prepareMetadata(m)),
    );
  }

  /**
   * Throws an error if an address is missing the roles specified.
   *
   * @param roles - The roles to check
   * @param address - The address to check
   */
  protected async onlyRoles(roles: Role[], address: string): Promise<void> {
    await Promise.all(
      roles.map(async (role) => {
        const members = await this.getRoleMembers(role);
        if (
          !members.map((a) => a.toLowerCase()).includes(address.toLowerCase())
        ) {
          throw new MissingRoleError(address, role);
        }
      }),
    );
  }
}
