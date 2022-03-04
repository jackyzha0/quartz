import {
  ERC20__factory,
  VotingGovernor,
  VotingGovernor__factory,
} from "@3rdweb/contracts";
import { TransactionReceipt } from "@ethersproject/providers";
import { BigNumber, ethers } from "ethers";
import {
  Currency,
  CurrencyValue,
  getCurrencyMetadata,
  getCurrencyValue,
  ModuleType,
} from "../common";
import { Module } from "../core/module";
import { MetadataURIOrObject } from "../core/types";
import { VoteType } from "../enums";
import { Proposal, ProposalExecutable } from "../types/vote";

export interface VoteSettings {
  votingDelay: string;
  votingPeriod: string;
  votingTokenAddress: string;
  votingTokenMetadata: Currency;
  votingQuorumFraction: string;
  proposalTokenThreshold: string;
}

/**
 * Create a decentralized organization for token holders to vote on proposals.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@3rdweb/sdk";
 *
 * // You can switch out this provider with any wallet or provider setup you like.
 * const provider = ethers.Wallet.createRandom();
 * const sdk = new ThirdwebSDK(provider);
 * const module = sdk.getVoteModule("{{module_address}}");
 * ```
 *
 * @public
 */
export class VoteModule extends Module<VotingGovernor> {
  public static moduleType: ModuleType = ModuleType.VOTE as const;

  /**
   * @internal
   */
  protected connectContract(): VotingGovernor {
    return VotingGovernor__factory.connect(this.address, this.providerOrSigner);
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return VoteModule.moduleType;
  }

  public async settings(): Promise<VoteSettings> {
    const [
      votingDelay,
      votingPeriod,
      votingTokenAddress,
      votingQuorumFraction,
      proposalTokenThreshold,
    ] = await Promise.all([
      this.readOnlyContract.votingDelay(),
      this.readOnlyContract.votingPeriod(),
      this.readOnlyContract.token(),
      this.readOnlyContract.quorumNumerator(),
      this.readOnlyContract.proposalThreshold(),
    ]);
    const votingTokenMetadata = await getCurrencyMetadata(
      this.providerOrSigner,
      votingTokenAddress,
    );
    return {
      votingDelay: votingDelay.toString(),
      votingPeriod: votingPeriod.toString(),
      votingTokenAddress,
      votingTokenMetadata,
      votingQuorumFraction: votingQuorumFraction.toString(),
      proposalTokenThreshold: proposalTokenThreshold.toString(),
    };
  }

  /**
   * Get a proposal by id.
   *
   * @param proposalId - The proposal id to get.
   * @returns - The proposal.
   */
  public async get(proposalId: string): Promise<Proposal> {
    await this.ensureExists(proposalId);

    const all = await this.getAll();
    const proposals = all.filter(
      (p) => p.proposalId.toLowerCase() === proposalId.toLowerCase(),
    );
    if (proposals.length === 0) {
      throw new Error("proposal not found");
    }
    return proposals[0];
  }

  /**
   * Get All Proposals
   *
   * @remarks Get all the proposals in this module.
   *
   * @example
   * ```javascript
   * const proposals = await module.getAll();
   * console.log(proposals);
   * ```
   *
   * @returns - All the proposals in the contract.
   */
  public async getAll(): Promise<Proposal[]> {
    const proposals = await this.readOnlyContract.queryFilter(
      this.contract.filters.ProposalCreated(),
    );

    const results: Proposal[] = [];
    const states = await Promise.all(
      proposals.map((p) => this.readOnlyContract.state(p.args.proposalId)),
    );
    const votes = await Promise.all(
      proposals.map((p) =>
        this.readOnlyContract.proposalVotes(p.args.proposalId),
      ),
    );

    for (let i = 0; i < proposals.length; i++) {
      const p = proposals[i].args;
      const s = states[i];
      const v = [
        {
          type: VoteType.Against,
          label: "Against",
          count: votes[i].againstVotes,
        },
        {
          type: VoteType.For,
          label: "For",
          count: votes[i].forVotes,
        },
        {
          type: VoteType.Abstain,
          label: "Abstain",
          count: votes[i].abstainVotes,
        },
      ];
      const e = [];
      for (let j = 0; j < p.targets.length; j++) {
        e.push({
          to: p.targets[j],
          value: p[3][j] || 0,
          data: p.calldatas[j],
        });
      }
      results.push({
        proposalId: p.proposalId.toString(),
        proposer: p.proposer,
        description: p.description,
        startBlock: p.startBlock,
        endBlock: p.endBlock,
        state: s,
        votes: v,
        executions: e.map((exec) => ({
          toAddress: exec.to,
          nativeTokenValue: exec.value,
          transactionData: exec.data,
        })),
      });
    }

    return results;
  }

  /**
   * Create Proposal
   *
   * @remarks Create a new proposal for token holders to vote on.
   *
   * @example
   * ```javascript
   * // The description of the proposal you want to pass
   * const description = "This is a great proposal - vote for it!"
   * // You can (optionally) pass in contract calls that will executed when the proposal is executed.
   * const executions = [
   *   {
   *     // The contract you want to make a call to
   *     toAddress: "0x...",
   *     // The amount of the native currency to send in this transaction
   *     nativeTokenValue: 0,
   *     // Transaction data that will be executed when the proposal is executed
   *     // This is an example transfer transaction with a token module (which you would need to setup in code)
   *     transactionData: tokenModule.contract.interface.encodeFunctionData(
   *       "transfer", [
   *         fromAddress,
   *         amount,
   *       ]
   *     ),
   *   }
   * ]
   *
   * const proposal = await module.propose(description, executions);
   * ```
   *
   * @param description - The description of the proposal.
   * @param executions - A set of executable transactions that will be run if the proposal is passed and executed.
   * @returns - The id of the created proposal.
   */
  public async propose(
    description: string,
    executions?: ProposalExecutable[],
  ): Promise<BigNumber> {
    if (!executions) {
      executions = [
        { toAddress: this.address, nativeTokenValue: 0, transactionData: "0x" },
      ];
    }
    const tos = executions.map((p) => p.toAddress);
    const values = executions.map((p) => p.nativeTokenValue);
    const datas = executions.map((p) => p.transactionData);
    const receipt = await this.sendTransaction("propose", [
      tos,
      values,
      datas,
      description,
    ]);

    const event = this.parseEventLogs("ProposalCreated", receipt?.logs);
    return event.proposalId;
  }

  /**
   * Vote
   *
   * @remarks Vote on an active proposal
   *
   * @example
   * ```javascript
   * // The proposal ID of the proposal you want to vote on
   * const proposalId = "0";
   * // The vote type you want to cast, can be VoteType.Against, VoteType.For, or VoteType.Abstain
   * const voteType = VoteType.For;
   * // The (optional) reason for the vote
   * const reason = "I like this proposal!";
   *
   * await module.vote(proposalId, voteType, reason);
   * ```
   * @param proposalId - The proposal to cast a vote on.
   * @param voteType - The position the voter is taking on their vote.
   * @param reason - (optional) The reason for the vote.
   */
  public async vote(proposalId: string, voteType: VoteType, reason = "") {
    await this.ensureExists(proposalId);

    await this.sendTransaction("castVoteWithReason", [
      proposalId,
      voteType,
      reason,
    ]);
  }

  /**
   * Check If Wallet Voted
   *
   * @remarks Check if a specified wallet has voted a specific proposal
   *
   * @example
   * ```javascript
   * // The proposal ID of the proposal you want to check
   * const proposalId = "0";
   * // The address of the wallet you want to check to see if they voted
   * const address = "{{wallet_address}}";
   *
   * await module.hasVoted(proposalId, address);
   * ```
   *
   * @param proposalId - The unique identifier of a proposal .
   * @param account - (optional) wallet account address. Defaults to connected signer.
   * @returns - True if the account has already voted on the proposal.
   */
  public async hasVoted(
    proposalId: string,
    account?: string,
  ): Promise<boolean> {
    if (!account) {
      account = await this.getSignerAddress();
    }
    return this.readOnlyContract.hasVoted(proposalId, account);
  }

  /**
   * Execute Proposal
   *
   * @remarks Execute the related transactions for a proposal if the proposal succeeded.
   *
   * @example
   * ```javascript
   * // The proposal ID ofthe proposal you want to execute
   * const proposalId = "0"
   * await module.execute(proposalId);
   * ```
   *
   * @param proposalId - The proposal id to execute.
   */
  public async execute(proposalId: string) {
    await this.ensureExists(proposalId);

    const proposal = await this.get(proposalId);
    const tos = proposal.executions.map((p) => p.toAddress);
    const values = proposal.executions.map((p) => p.nativeTokenValue);
    const datas = proposal.executions.map((p) => p.transactionData);
    const descriptionHash = ethers.utils.id(proposal.description);
    await this.sendTransaction("execute", [
      tos,
      values,
      datas,
      descriptionHash,
    ]);
  }

  /**
   * Can Execute
   *
   * @remarks Check if a proposal can be executed (if the proposal has succeeded).
   *
   * @example
   * ```javascript
   * // The proposal ID of the proposal you want to check
   * const proposalId = "0";
   * const canExecute = await module.canExecute(proposalId);
   * console.log(canExecute);
   * ```
   *
   * @param proposalId - The proposal ID to check.
   * @returns - True if the proposal can be executed, false otherwise.
   */
  public async canExecute(proposalId: string): Promise<boolean> {
    await this.ensureExists(proposalId);

    const proposal = await this.get(proposalId);
    const tos = proposal.executions.map((p) => p.toAddress);
    const values = proposal.executions.map((p) => p.nativeTokenValue);
    const datas = proposal.executions.map((p) => p.transactionData);
    const descriptionHash = ethers.utils.id(proposal.description);
    try {
      await this.contract.callStatic.execute(
        tos,
        values,
        datas,
        descriptionHash,
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Check the balance of the project wallet in the native token of the chain
   *
   * @returns - The balance of the project in the native token of the chain
   */
  public async balance(): Promise<CurrencyValue> {
    const balance = await this.readOnlyContract.provider.getBalance(
      this.address,
    );
    return {
      name: "",
      symbol: "",
      decimals: 18,
      value: balance.toString(),
      displayValue: ethers.utils.formatUnits(balance, 18),
    };
  }

  /**
   * Check the balance of the project wallet in a particular
   * ERC20 token contract
   *
   * @returns - The balance of the project in the native token of the chain
   */
  public async balanceOfToken(tokenAddress: string): Promise<CurrencyValue> {
    const erc20 = ERC20__factory.connect(
      tokenAddress,
      this.readOnlyContract.provider,
    );
    return await getCurrencyValue(
      this.providerOrSigner,
      tokenAddress,
      await erc20.balanceOf(this.address),
    );
  }

  public async setModuleMetadata(
    metadata: MetadataURIOrObject,
  ): Promise<TransactionReceipt> {
    const uri = await this.sdk.getStorage().uploadMetadata(metadata);
    return await this.sendTransaction("setContractURI", [uri]);
  }

  /**
   * Find a proposal by its id.
   *
   * @internal
   * @param proposalId - Proposal to check for
   */
  private async ensureExists(proposalId: string): Promise<void> {
    await this.readOnlyContract.state(proposalId);
  }
}
