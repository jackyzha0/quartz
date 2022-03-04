import { ModuleType } from "../../common/module-type";
import { CollectionModuleMetadata } from "./BundleModuleMetadata";
import CommonModuleMetadata from "./CommonModuleMetadata";

export type AllModuleMetadata = CollectionModuleMetadata | CommonModuleMetadata;

// TODO: Create metadata mapings for all modules
export type ModuleMetadataMap = {
  [ModuleType.COLLECTION]: CollectionModuleMetadata;
  [ModuleType.ACCESS_NFT]: CommonModuleMetadata;
  [ModuleType.CURRENCY]: CommonModuleMetadata;
  [ModuleType.DATASTORE]: CommonModuleMetadata;
  [ModuleType.DROP]: CommonModuleMetadata;
  [ModuleType.DYNAMIC_NFT]: CommonModuleMetadata;
  [ModuleType.MARKET]: CommonModuleMetadata;
  [ModuleType.NFT]: CommonModuleMetadata;
  [ModuleType.PACK]: CommonModuleMetadata;
  [ModuleType.SPLITS]: CommonModuleMetadata;
};
