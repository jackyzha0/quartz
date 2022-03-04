import { BaseContract, BytesLike } from "ethers";
import {
  ForwardRequestMessage,
  GaslessTransaction,
  PermitRequestMessage,
} from "../core/types";

/**
 * The optional options that can be passed to the SDK.
 * @public
 */
export interface ISDKOptions {
  /**
   * An optional IPFS Gateway. (Default: `https://cloudflare-ipfs.com/ipfs/`).
   */
  ipfsGatewayUrl: string;

  /**
   * Optional Registry Contract Address
   */
  registryContractAddress: string;

  /**
   * maxGasPrice for transactions
   */
  maxGasPriceInGwei: number;

  /**
   * Optional default speed setting for transactions
   */
  gasSpeed: string;

  /**
   * Optional relayer url to be used for gasless transaction
   */
  transactionRelayerUrl: string;

  /**
   * @deprecated {@link ISDKOptions.gaslessSendFunction}
   *
   * Optional function for sending transaction to relayer
   * @returns transaction hash of relayed transaction.
   */
  transactionRelayerSendFunction: (
    message: ForwardRequestMessage | PermitRequestMessage,
    signature: BytesLike,
  ) => Promise<string>;

  /**
   * Optional trusted forwarder address overwrite
   */
  transactionRelayerForwarderAddress: string;

  /**
   * Optional function for sending transaction to a relayer
   * @returns transaction hash of relayed transaction.
   */
  gaslessSendFunction: (
    contract: BaseContract,
    transaction: GaslessTransaction,
  ) => Promise<string>;

  /**
   * Optional gasless transaction configuration
   * deadlineSeconds is the number of seconds before the transaction is considered expired.
   */
  gasless: {
    biconomy: {
      apiId: string;
      apiKey: string;
      deadlineSeconds?: number;
      gasTier?: "NORMAL" | "FAST" | "RAPID";
    };
  };

  /**
   * Optional read only RPC url
   */
  readOnlyRpcUrl: string;
}
