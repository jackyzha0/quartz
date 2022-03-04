import type { Network, Provider } from "@ethersproject/providers";
import type { BigNumber, BytesLike, CallOverrides, Signer } from "ethers";

/**
 * A valid "ethers" Provider or Signer.
 * @public
 */
export type ProviderOrSigner = Provider | Signer;

/**
 * A valid "ethers" Provider, Signer or a Network object or url address to create a Provider with.
 * @public
 */
export type ValidProviderInput = ProviderOrSigner | Network | string;

/**
 * A JSON value
 * @public
 */
export type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };

/**
 * A valid URI string or metadata object
 * @public
 */
export type MetadataURIOrObject = string | Record<string, any>;
/**
 * Forward Request Message that's used for gasless transaction
 * @public
 */
export type ForwardRequestMessage = {
  from: string;
  to: string;
  value: string;
  gas: string;
  nonce: string;
  data: BytesLike;
};

/**
 * EIP-2612 token permit message for gasless transaction
 * @public
 */
export type PermitRequestMessage = {
  to: string;
  owner: string;
  spender: string;
  value: number | string;
  nonce: number | string;
  deadline: number | string;
  v: number;
  r: string;
  s: string;
};

/**
 * transaction message contains information that's needed to execute a gasless transaction
 */
export interface GaslessTransaction {
  from: string;
  to: string;
  data: string;
  chainId: number;
  gasLimit: BigNumber;
  functionName: string;
  functionArgs: any[];
  callOverrides: CallOverrides;
}
