import { MetadataURIOrObject } from "../core/types";
import { IStorage } from "../interfaces/IStorage";
import FileOrBuffer from "../types/FileOrBuffer";
import { UploadError } from "./error";

if (!globalThis.FormData) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  globalThis.FormData = require("form-data");
}

if (!globalThis.File) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  globalThis.File = require("@web-std/file").File;
}

/**
 *
 * @param ipfsUrl - the ipfs:// uri
 * @param gatewayUrl - the gateway url
 * @returns the fully formed IPFS url
 * @internal
 */
export function replaceIpfsWithGateway(ipfsUrl: string, gatewayUrl: string) {
  if (!ipfsUrl || typeof ipfsUrl !== "string") {
    return "";
  }
  if (!gatewayUrl.endsWith("/")) {
    gatewayUrl = `${gatewayUrl}/`;
  }
  return ipfsUrl.replace("ipfs://", gatewayUrl);
}
export function recursiveResolveGatewayUrl(json: any, storage: IStorage) {
  if (typeof json === "object") {
    const keylist = Object.keys(json);
    keylist.forEach((key: string) => {
      if (typeof json[key] === "object") {
        json[key] = recursiveResolveGatewayUrl(json[key], storage);
      } else if (typeof json[key] === "string") {
        json[key] = storage.resolveFullUrl(json[key]);
      }
    });
  }
  return json;
}

/**
 * A helper function to upload arbitrary data to IPFS and return the resulting IPFS uri.
 * @param data - stringified JSON || File
 * @param contractAddress - (Optional) the contract address to associate the data with
 * @param signerAddress - (Optional) the wallet address of the actor that is uploading the file
 * @returns The `ipfs://<hash>` uri of the uploaded file
 * @public
 */
export async function uploadToIPFS(
  data: string | File | FileOrBuffer,
  contractAddress?: string,
  signerAddress?: string,
): Promise<string> {
  const headers = {
    "X-App-Name": `CONSOLE-TS-SDK-${contractAddress}`,
    "X-Public-Address": signerAddress || "",
  };
  const formData = new FormData();
  formData.append("file", data as any);
  const res = await fetch("https://upload.nftlabs.co/upload", {
    method: "POST",
    body: formData as any,
    headers,
  });
  try {
    const body = await res.json();
    return body.IpfsUri;
  } catch (e) {
    throw new UploadError(`Failed to upload to IPFS: ${e}`);
  }
}

/**
 * @internal
 */
export async function uploadMetadata(
  metadata: MetadataURIOrObject,
  contractAddress?: string,
  signerAddress?: string,
): Promise<string> {
  if (typeof metadata === "string") {
    return metadata;
  }
  async function _fileHandler(object: any) {
    const keys = Object.keys(object);
    for (const key in keys) {
      const val = object[keys[key]];
      const shouldUpload = val instanceof File || val instanceof Buffer;

      if (shouldUpload) {
        object[keys[key]] = await uploadToIPFS(
          object[keys[key]],
          contractAddress,
          signerAddress,
        );
      }
      if (shouldUpload && typeof object[keys[key]] !== "string") {
        throw new Error("Upload to IPFS failed");
      }
      if (typeof val === "object") {
        object[keys[key]] = await _fileHandler(object[keys[key]]);
      }
    }
    return object;
  }

  metadata = await _fileHandler(metadata);

  return await uploadToIPFS(
    JSON.stringify(metadata),
    contractAddress,
    signerAddress,
  );
}
