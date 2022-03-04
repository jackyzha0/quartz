import { MetadataURIOrObject } from "../core/types";

/* eslint-disable semi */
export default interface IDropModule {
  /**
   * Allows you to mint a batch of tokens by passing in a list of metadata objects.
   * The metadata objects will all be uploaded to a distributed file system in a folder format
   * based on the storage provider set in the SDK.
   *
   * Its important to note that the metadata objects are allowed to contain nested File|Blob|Buffer
   * objects as well as any other data types, so properties like the `image` can be unique for
   * each token that will be minted.
   *
   * @param tokenMetadata - All token metadata objects to be minted.
   */
  mintBatch(tokenMetadata: MetadataURIOrObject[]): Promise<void>;
}
