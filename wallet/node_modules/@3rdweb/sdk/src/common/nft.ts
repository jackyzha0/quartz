import {
  LazyMintERC1155,
  LazyMintERC721,
  LazyNFT,
  NFT,
  NFTCollection,
  SignatureMint1155,
} from "@3rdweb/contracts";
import { Contract } from "@ethersproject/contracts";
import { JSONValue, ProviderOrSigner } from "../core/types";
import { IStorage } from "../interfaces/IStorage";
import { NotFoundError } from "./error";
import { recursiveResolveGatewayUrl } from "./ipfs";

// support erc721 and erc1155
const tokenUriABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

/**
 * The shared NFT metadata.
 * @public
 */
export interface NFTMetadata {
  id: string;
  uri: string;
  name?: string;
  description?: string;
  image?: string;
  external_url?: string;
  animation_url?: string;
  properties?: Record<string, JSONValue>;
}

/**
 * The shared NFT metadata, including the current owner address.
 * @public
 */
export interface NFTMetadataOwner {
  owner: string;
  metadata: NFTMetadata;
}

/**
 * @internal
 */
export type NFTContractTypes =
  | NFT
  | NFTCollection
  | LazyNFT
  | LazyMintERC721
  | LazyMintERC1155
  | SignatureMint1155;

/**
/* @internal
 */
export async function getMetadataWithoutContract(
  provider: ProviderOrSigner,
  contractAddress: string,
  tokenId: string,
  storage: IStorage,
): Promise<NFTMetadata> {
  const contract = new Contract(contractAddress, tokenUriABI, provider) as NFT;
  return getTokenMetadata(contract, tokenId, storage);
}

/**
/* @internal
 */
export async function getTokenMetadata(
  contract: NFTContractTypes,
  tokenId: string,
  storage: IStorage,
): Promise<NFTMetadata> {
  const uri = await getTokenUri(contract, tokenId);
  if (!uri) {
    throw new NotFoundError();
  }

  try {
    const meta = await storage.get(uri);
    const json = recursiveResolveGatewayUrl(JSON.parse(meta), storage);
    const entity: NFTMetadata = {
      ...json,
      id: tokenId,
      uri,
    };
    return entity;
  } catch (e) {
    console.error("failed to fetch nft", e);
    return {
      id: tokenId,
      uri,
    };
  }
}

export async function getTokenMetadataUsingStorage(
  contractAddress: string,
  provider: ProviderOrSigner,
  tokenId: string,
  storage: IStorage,
): Promise<NFTMetadata> {
  const contract = new Contract(contractAddress, tokenUriABI, provider) as NFT;

  const uri = await getTokenUri(contract, tokenId);
  if (!uri) {
    throw new NotFoundError();
  }
  try {
    const json = JSON.parse(await storage.get(uri));
    const entity: NFTMetadata = {
      ...json,
      id: tokenId,
    };
    return entity;
  } catch (e) {
    console.error("failed to fetch nft", e);
    return {
      id: tokenId,
      uri,
    };
  }
}

/**
/* @internal
 */
export async function getTokenUri(
  contract: NFTContractTypes,
  tokenId: string,
): Promise<string> {
  let uri = "";
  try {
    uri = await contract.tokenURI(tokenId);
    // eslint-disable-next-line no-empty
  } catch (e) {}

  if (!uri) {
    try {
      uri = await (contract as NFTCollection).uri(tokenId);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  if (!uri) {
    try {
      uri = await (contract as SignatureMint1155).uri(tokenId);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
  return uri;
}
