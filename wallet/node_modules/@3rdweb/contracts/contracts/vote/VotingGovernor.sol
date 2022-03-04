// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract VotingGovernor is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    ERC721Holder,
    ERC1155Holder,
    ERC2771Context
{
    string public contractURI;
    uint256 public proposalIndex;

    struct Proposal {
        uint256 proposalId;
        address proposer;
        address[] targets;
        uint256[] values;
        string[] signatures;
        bytes[] calldatas;
        uint256 startBlock;
        uint256 endBlock;
        string description;
    }

    /// @dev proposal index => Proposal
    mapping(uint256 => Proposal) public proposals;
    /// @dev proposal ID => proposal index
    mapping(uint256 => uint256) public indexForProposal;

    constructor(
        string memory _name,
        ERC20Votes _token,
        uint256 _initialVotingDelay,
        uint256 _initialVotingPeriod,
        uint256 _initialProposalThreshold,
        uint256 _initialVoteQuorumFraction,
        address _trustedForwarder,
        string memory _uri
    )
        Governor(_name)
        GovernorSettings(_initialVotingDelay, _initialVotingPeriod, _initialProposalThreshold)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(_initialVoteQuorumFraction)
        ERC2771Context(_trustedForwarder)
    {
        contractURI = _uri;
    }

    /**
     * @dev See {IGovernor-propose}.
     */
    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public virtual override returns (uint256 proposalId) {
        proposalId = super.propose(targets, values, calldatas, description);

        proposals[proposalIndex] = Proposal({
            proposalId: proposalId,
            proposer: _msgSender(),
            targets: targets,
            values: values,
            signatures: new string[](targets.length),
            calldatas: calldatas,
            startBlock: proposalSnapshot(proposalId),
            endBlock: proposalDeadline(proposalId),
            description: description
        });

        proposalIndex += 1;
    }

    /// @dev Returns all proposals made.
    function getAllProposals() external view returns (Proposal[] memory allProposals) {
        uint256 nextProposalIndex = proposalIndex;

        allProposals = new Proposal[](nextProposalIndex);
        for (uint256 i = 0; i < nextProposalIndex; i += 1) {
            allProposals[i] = proposals[i];
        }
    }

    function setContractURI(string calldata uri) external onlyGovernance {
        contractURI = uri;
    }

    function proposalThreshold() public view override(Governor, GovernorSettings) returns (uint256) {
        return GovernorSettings.proposalThreshold();
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155Receiver, Governor) returns (bool) {
        return
            interfaceId == type(IERC1155Receiver).interfaceId ||
            interfaceId == type(IERC721Receiver).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function _msgSender() internal view virtual override(Context, ERC2771Context) returns (address sender) {
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view virtual override(Context, ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }
}
