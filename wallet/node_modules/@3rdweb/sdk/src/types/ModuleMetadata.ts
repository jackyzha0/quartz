import { ContractMetadata } from "../common/contract";
import { ModuleType } from "../common/module-type";

/**
 * The module metadata, but missing the ModuleType.
 * @public
 * @deprecated - You should rely on the {@link ModuleMetadata} instead, since it includes the type of the module.
 */
export interface ModuleMetadataNoType {
  address: string;
  metadata?: ContractMetadata;
}

/**
 * The module metadata, includes the `address` and the {@link ModuleType}.
 * @public
 */
export interface ModuleMetadata extends ModuleMetadataNoType {
  type: ModuleType;
}
