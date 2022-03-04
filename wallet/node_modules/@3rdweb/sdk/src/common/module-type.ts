import { $enum } from "ts-enum-util";

/**
 * The type of Modules that are available.
 * @public
 */
export enum ModuleType {
  CURRENCY = 0,
  TOKEN = 0,
  COLLECTION = 1,
  BUNDLE = 1,
  NFT = 2,
  DYNAMIC_NFT = 3,
  ACCESS_NFT = 4,
  PACK = 5,
  MARKET = 6,
  DROP = 7,
  DATASTORE = 8,
  SPLITS = 9,
  VOTE = 10,
  BUNDLE_DROP = 11,
  MARKETPLACE = 12,
  BUNDLE_SIGNATURE = 13,
}
/**
 *
 * @param moduleName - a supported module name
 * @returns The {@link ModuleType} or undefined
 * @public
 */

export function convertNameToModuleType(
  moduleName?: string,
): ModuleType | undefined {
  return $enum(ModuleType).getValueOrDefault(
    moduleName?.toUpperCase(),
    undefined,
  );
}

/**
 *
 * @param moduleType - A {@link ModuleType}
 * @returns The name of the given {@link ModuleType} or undefined
 * @public
 */
export function convertModuleTypeToName(
  moduleType: ModuleType,
): keyof typeof ModuleType | undefined {
  return $enum(ModuleType).getKeyOrDefault(moduleType, undefined);
}
