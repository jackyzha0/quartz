import { BigNumberish, BytesLike } from "ethers";

export interface ProposalExecutable {
  /**
   * The address of the contract that the proposal will execute a transaction on.
   * If the proposal is sending a token to a wallet, this address should be the address
   * of the wallet that will be receiving the tokens.
   */
  toAddress: string;

  /**
   * The amount of a native token that may be sent if a proposal is executing a token transfer.
   */
  nativeTokenValue: BigNumberish;

  /**
   * The transaction payload that will be executed if the proposal is approved.
   */
  transactionData: BytesLike;
}
