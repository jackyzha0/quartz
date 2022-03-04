import {
  DuplicateFileNameError,
  FetchError,
  UploadError,
} from "../common/error";
import { MetadataURIOrObject } from "../core/types";
import { IStorage, UploadMetadataBatchResult } from "../interfaces/IStorage";
import FileOrBuffer from "../types/FileOrBuffer";
import { BufferOrStringWithName } from "../types/BufferOrStringWithName";

if (!globalThis.FormData) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  globalThis.FormData = require("form-data");
}

const thirdwebIpfsServerUrl = "https://upload.nftlabs.co";
const pinataIpfsUrl = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
// const thirdwebIpfsServerUrl = "http://localhost:3002";

/**
 * @internal
 */
interface CidWithFileName {
  // base cid of the directory
  cid: string;

  // file name of the file without cid
  fileNames: string[];
}

export class IpfsStorage implements IStorage {
  private gatewayUrl: string;

  constructor(gatewayUrl: string) {
    this.gatewayUrl = `${gatewayUrl.replace(/\/$/, "")}/`;
  }

  public async upload(
    data: string | FileOrBuffer,
    contractAddress?: string,
    signerAddress?: string,
  ): Promise<string> {
    if (typeof data === "string") {
      // always 0 indexed because there's only 1 file
      const cid = await this.uploadBatch([data], contractAddress, 0);
      return `${cid}0`;
    } else if (data instanceof Buffer) {
      // always 0 indexed because there's only 1 file
      const cid = await this.uploadBatch([data], contractAddress, 0);
      return `${cid}0`;
    }

    // if it's file type, we're doing legacy upload

    const headers = {
      "X-App-Name": `CONSOLE-TS-SDK-${contractAddress}`,
      "X-Public-Address": signerAddress || "",
    };
    const formData = new FormData();
    formData.append("file", data as any);
    try {
      const res = await fetch(`${thirdwebIpfsServerUrl}/upload`, {
        method: "POST",
        body: formData as any,
        headers,
      });
      if (res.status !== 200) {
        throw new Error(
          `Failed to upload to IPFS [status code = ${res.status}]`,
        );
      }

      const body = await res.json();
      return body.IpfsUri;
    } catch (e) {
      throw new UploadError(`Failed to upload to IPFS: ${e}`);
    }
  }

  public async uploadBatch(
    files:
      | Buffer[]
      | string[]
      | FileOrBuffer[]
      | File[]
      | BufferOrStringWithName[],
    contractAddress?: string,
    fileStartNumber = 0,
  ): Promise<string> {
    const { cid } = await this.uploadBatchWithCid(
      files,
      contractAddress,
      fileStartNumber,
    );

    return `ipfs://${cid}/`;
  }

  private async uploadBatchWithCid(
    files:
      | Buffer[]
      | string[]
      | FileOrBuffer[]
      | File[]
      | BufferOrStringWithName[],
    contractAddress?: string,
    fileStartNumber = 0,
  ): Promise<CidWithFileName> {
    const token = await this.getUploadToken(contractAddress || "");
    const metadata = {
      name: `CONSOLE-TS-SDK-${contractAddress}`,
    };
    const data = new FormData();
    const fileNames: string[] = [];
    files.forEach((file, i) => {
      let fileName = "";
      let fileData = file;
      // if it is a file, we passthrough the file extensions,
      // if it is a buffer or string, the filename would be fileStartNumber + index
      // if it is a buffer or string with names, the filename would be the name
      if (file instanceof File) {
        let extensions = "";
        if (file.name) {
          const extensionStartIndex = file.name.lastIndexOf(".");
          if (extensionStartIndex > -1) {
            extensions = file.name.substring(extensionStartIndex);
          }
        }
        fileName = `${i + fileStartNumber}${extensions}`;
      } else if (file instanceof Buffer || typeof file === "string") {
        fileName = `${i + fileStartNumber}`;
      } else if (file && file.name && file?.data) {
        fileData = file?.data;
        fileName = `${file.name}`;
      } else {
        // default behavior
        fileName = `${i + fileStartNumber}`;
      }

      const filepath = `files/${fileName}`;
      if (fileNames.indexOf(fileName) > -1) {
        throw new DuplicateFileNameError(fileName);
      }
      fileNames.push(fileName);
      if (typeof window === "undefined") {
        data.append("file", fileData as any, { filepath } as any);
      } else {
        // browser does blob things, filepath is parsed differently on browser vs node.
        // pls pinata?
        data.append("file", new Blob([fileData as any]), filepath);
      }
    });

    data.append("pinataMetadata", JSON.stringify(metadata));
    const res = await fetch(pinataIpfsUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data as any,
    });
    const body = await res.json();
    if (!res.ok) {
      console.log(body);
      throw new UploadError("Failed to upload files to IPFS");
    }
    return {
      cid: body.IpfsHash,
      fileNames,
    };
  }

  public async getUploadToken(contractAddress: string): Promise<string> {
    const headers = {
      "X-App-Name": `CONSOLE-TS-SDK-${contractAddress}`,
    };
    const res = await fetch(`${thirdwebIpfsServerUrl}/grant`, {
      method: "GET",
      headers,
    });
    if (!res.ok) {
      throw new FetchError(`Failed to get upload token`);
    }
    const body = await res.text();
    return body;
  }

  public async get(hash: string): Promise<string> {
    let uri = hash;
    if (hash) {
      uri = this.resolveFullUrl(hash);
    }
    const result = await fetch(uri);
    if (!result.ok) {
      throw new Error(`Status code (!= 200) =${result.status}`);
    }

    return await result.text();
  }

  /**
   * This function recurisely traverses an object and hashes any
   * `Buffer` or `File` objects into the returned map.
   *
   * @param object - The object to recurse over
   * @param files - The running array of files or buffer to upload
   * @returns - The final map of all hashes to files
   */
  public buildFilePropertiesMap(
    object: Record<string, any>,
    files: (File | Buffer)[],
  ): (File | Buffer)[] {
    const keys = Object.keys(object).sort();
    for (const key in keys) {
      const val = object[keys[key]];
      const shouldUpload = val instanceof File || val instanceof Buffer;
      if (shouldUpload) {
        files.push(val);
      }

      if (typeof val === "object") {
        this.buildFilePropertiesMap(val, files);
      }
    }
    return files;
  }

  /**
   * Pre-processes metadata and uploads all file properties
   * to storage in *bulk*, then performs a string replacement of
   * all file properties -> the resulting ipfs uri. This is
   * called internally by `uploadMetadataBatch`.
   *
   * @internal
   *
   * @param metadata - The metadata to recursively process
   * @returns - The processed metadata with properties pointing at ipfs in place of `File | Buffer`
   */
  public async batchUploadProperties(
    metadatas: MetadataURIOrObject[],
  ): Promise<any> {
    if (typeof metadatas === "string") {
      return metadatas;
    }
    const filesToUpload = this.buildFilePropertiesMap(metadatas, []);
    if (filesToUpload.length === 0) {
      return metadatas;
    }
    const { cid, fileNames } = await this.uploadBatchWithCid(
      filesToUpload,
      "",
      0,
    );

    const cids = [];
    // recurse ordered array
    for (const filename of fileNames) {
      cids.push(`${cid}/${filename}`);
    }

    const finalMetadata = await this.replaceFilePropertiesWithHashes(
      metadatas,
      cids,
    );
    return finalMetadata;
  }

  /**
   * Given a map of file hashes to ipfs uris, this function will hash
   * all properties recursively and replace them with the ipfs uris
   * from the map passed in. If a hash is missing from the map, the function
   * will throw an error.
   *
   * @internal
   *
   * @param object - The object to recursively process
   * @param cids - The array of file hashes to ipfs uris in the recurse order
   * @returns - The processed metadata with properties pointing at ipfs in place of `File | Buffer`
   */
  private async replaceFilePropertiesWithHashes(
    object: Record<string, any>,
    cids: string[],
  ) {
    const keys = Object.keys(object).sort();
    for (const key in keys) {
      const val = object[keys[key]];
      const isFile = val instanceof File || val instanceof Buffer;
      if (typeof val === "object" && !isFile) {
        await this.replaceFilePropertiesWithHashes(val, cids);
        continue;
      }

      if (!isFile) {
        continue;
      }

      object[keys[key]] = `ipfs://${cids.splice(0, 1)[0]}`;
    }
    return object;
  }

  public async uploadMetadata(
    metadata: MetadataURIOrObject,
    contractAddress?: string,
    _signerAddress?: string,
  ): Promise<string> {
    if (typeof metadata === "string") {
      return metadata;
    }

    // since there's only single object, always use the first index
    const { metadataUris } = await this.uploadMetadataBatch(
      [metadata],
      contractAddress,
      0,
    );
    return metadataUris[0];
  }

  /**
   * @internal
   */
  public async uploadMetadataBatch(
    metadatas: MetadataURIOrObject[],
    contractAddress?: string,
    startFileNumber?: number,
  ): Promise<UploadMetadataBatchResult> {
    // we only want to upload if the metadata object is not a string
    const metadataObjects = metadatas.filter((m) => typeof m !== "string");
    const metadataToUpload: string[] = (
      await this.batchUploadProperties(metadataObjects)
    ).map((m: any) => JSON.stringify(m));

    // batch upload non-string metadata object
    if (metadataToUpload.length === 0) {
      return {
        baseUri: "",
        metadataUris: metadatas.filter(
          (m) => typeof m === "string",
        ) as string[],
      };
    }

    const { cid, fileNames } = await this.uploadBatchWithCid(
      metadataToUpload,
      contractAddress,
      startFileNumber,
    );

    const baseUri = `ipfs://${cid}/`;
    const uris = [];
    for (const metadata of metadatas) {
      if (typeof metadata === "string") {
        uris.push(metadata);
      } else {
        uris.push(`${baseUri}${fileNames.splice(0, 1)[0]}`);
      }
    }

    return {
      baseUri,
      metadataUris: uris,
    };
  }

  /**
   * Resolves the full url for a file using the configured gateway
   *
   * @param ipfsHash - the ipfs:// uri
   * @returns - The fully formed IPFS url with the gateway url
   * @internal
   */
  resolveFullUrl(ipfsHash: string): string {
    if (typeof ipfsHash !== "string") {
      return "";
    }
    return ipfsHash && ipfsHash.toLowerCase().includes("ipfs://")
      ? ipfsHash.replace("ipfs://", this.gatewayUrl)
      : ipfsHash;
  }

  public canResolve(uri: string): boolean {
    const resolved = this.resolveFullUrl(uri);
    return resolved.toLowerCase() !== uri.toLowerCase();
  }
}
