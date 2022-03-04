import { arrayify } from "@ethersproject/bytes";
import { Contract } from "@ethersproject/contracts";
import { Provider } from "@ethersproject/providers";
import { ProviderOrSigner } from "../core/types";
import { IStorage } from "../interfaces/IStorage";
import { recursiveResolveGatewayUrl } from "./ipfs";

/**
 * The typical contract metadata found on the modules.
 * @public
 */
export interface ContractMetadata {
  uri: string;
  name?: string;
  description?: string;
  image?: string;
  external_link?: string;
  seller_fee_basis_points?: number;
  fee_recipient?: string;
  [key: string]: any;
}

/**
 * @internal
 */
export const InterfaceId_IERC721 = arrayify("0x80ac58cd");

/**
 * @internal
 */
export const InterfaceId_IERC1155 = arrayify("0xd9b67a26");

const contractUriABI = [
  {
    inputs: [] as [],
    name: "contractURI",
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
 * @internal
 */
export async function getContractMetadata(
  provider: ProviderOrSigner,
  address: string,
  storage: IStorage,
  resolveGateway = false,
): Promise<ContractMetadata> {
  const contract = new Contract(address, contractUriABI, provider);
  const uri = await contract.contractURI();
  const meta = await storage.get(uri);

  try {
    let json = JSON.parse(meta);
    if (resolveGateway) {
      json = recursiveResolveGatewayUrl(json, storage);
    }
    const entity: ContractMetadata = {
      ...json,
    };
    return entity;
  } catch (e) {
    throw new Error(
      `Failed to parse metadata for contract ${address} with uri ${uri}`,
    );
  }
}

/**
 * @internal
 */
export async function isContract(
  provider: Provider,
  address: string,
): Promise<boolean> {
  return (await provider.getCode(address)) !== "0x";
}
