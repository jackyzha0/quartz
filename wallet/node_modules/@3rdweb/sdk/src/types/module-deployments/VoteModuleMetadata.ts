import { JsonObject, JsonProperty } from "json2typescript";
import CommonModuleMetadata from "./CommonModuleMetadata";

@JsonObject("VoteModuleMetadata")
export class VoteModuleMetadata extends CommonModuleMetadata {
  /**
   * The wait time before a proposal can begin being voted on (seconds).
   */
  @JsonProperty("proposal_start_time_in_seconds", Number)
  proposalStartWaitTimeInSeconds = 0;

  /**
   * How long a proposal is open for voting (seconds).
   */
  @JsonProperty("proposal_voting_time_in_seconds", Number)
  proposalVotingTimeInSeconds = 0;

  /**
   * **Do not set this property directly. It will be set by the SDK. Unless you know what you're doing.**
   *
   * Every proposal will wait `votingDelay` number of blocks before it can be voted on.
   */
  @JsonProperty("voting_delay", Number)
  votingDelay? = 0;

  /**
   * **Do not set this property directly. It will be set by the SDK. Unless you know what you're doing.**
   *
   * The voting period is the number of blocks that a proposal will be open for voting.
   * This varies by chain.
   */
  @JsonProperty("voting_period", Number)
  votingPeriod? = 0;

  /**
   * The ERC20 token address that is used in the voting process.
   */
  @JsonProperty("voting_token_address", String)
  votingTokenAddress = "";

  /**
   * Quorum required for a proposal to be successful. This value should be between 0-100 and represents a percentage.
   *
   * By default it is set to 0.
   */
  @JsonProperty("voting_quorum_fraction", Number)
  votingQuorumFraction = 0;

  /**
   * The minimum number of tokens required to propose a proposal.
   */
  @JsonProperty("proposal_token_threshold", String)
  minimumNumberOfTokensNeededToPropose = "0";
}

export default VoteModuleMetadata;
