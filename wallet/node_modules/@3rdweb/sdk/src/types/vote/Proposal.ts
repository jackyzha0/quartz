import { BigNumber } from "ethers";
import { ProposalExecutable } from "./ProposalExecutable";
import { ProposalState } from "../../enums/vote";
import { ProposalVote } from "./ProposalVote";

export interface Proposal {
  /**
   * The unique identifier of the proposal.
   */
  proposalId: string;

  /**
   * The address of the wallet that created the proposal.
   */
  proposer: string;

  /**
   * The description of the proposal.
   */
  description: string;

  startBlock: BigNumber;
  endBlock: BigNumber;

  /**
   * The current state of the proposal.
   */
  state: ProposalState;

  /**
   * All votes that have been casted on the proposal.
   */
  votes: ProposalVote[];

  /**
   * All executions that have been proposed for the proposal.
   */
  executions: ProposalExecutable[];
}
