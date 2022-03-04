import { DataStore, DataStore__factory } from "@3rdweb/contracts";
import { TransactionReceipt } from "@ethersproject/providers";
import { BigNumberish, ethers } from "ethers";
import { ModuleType, Role, RolesMap } from "../common";
import { ModuleWithRoles } from "../core/module";

/**
 * Access this module by calling {@link ThirdwebSDK.getDatastoreModule}
 * @alpha
 */
export class DatastoreModule extends ModuleWithRoles<DataStore> {
  public static moduleType: ModuleType = ModuleType.DATASTORE;

  public static roles = [RolesMap.admin, RolesMap.editor] as const;

  /**
   * @override
   * @internal
   */
  protected getModuleRoles(): readonly Role[] {
    return DatastoreModule.roles;
  }

  /**
   * @internal
   */
  protected connectContract(): DataStore {
    return DataStore__factory.connect(this.address, this.providerOrSigner);
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return DatastoreModule.moduleType;
  }

  public async getUint(key: string): Promise<BigNumberish | undefined> {
    const keyHash = ethers.utils.id(key.toString());
    return await this.readOnlyContract.getUint(keyHash);
  }

  // write functions
  public async setUint(
    key: string,
    value: BigNumberish,
  ): Promise<TransactionReceipt> {
    const keyHash = ethers.utils.id(key.toString());
    return await this.sendTransaction("setUint", [keyHash, value]);
  }
}
