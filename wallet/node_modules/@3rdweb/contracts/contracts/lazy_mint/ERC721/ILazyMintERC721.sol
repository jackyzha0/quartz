// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

/**
 *  `LazyMintERC721` is an ERC 721 contract. It takes in a base URI for every
 *  `n` tokens lazy minted at once. The URI for each of the `n` tokens lazy minted
 *  is the provided baseURI + `${tokenId}` (e.g. "ipsf://Qmece.../1").
 *
 *  The module admin (account with `DEFAULT_ADMIN ROLE`) can create claim conditions
 *  with non-overlapping time windows, and accounts can claim the NFTs, in a given time
 *  window, according to that time window's claim conditions.
 */

interface ILazyMintERC721 {
    /**
     *  @notice The claim conditions for a given tokenId x time window.
     *
     *  @param startTimestamp The unix timestamp after which the claim condition starts.
     *                        The same claim condition lasts until the `startTimestamp`
     *                        of the next claim condition.
     *
     *  @param maxClaimableSupply The maximum number of tokens that can
     *                            be claimed under the claim condition.
     *
     *  @param supplyClaimed At any given point, the number of tokens that have been claimed.
     *
     *  @param quantityLimitPerTransaction The maximum number of tokens a single account can
     *                                     claim in a single transaction.
     *
     *  @param waitTimeInSecondsBetweenClaims The least number of seconds an account must wait
     *                                        after claiming tokens, to be able to claim again.
     *
     *  @param merkleRoot Only accounts whitelisted by `merkleRoot` can claim tokens
     *                    under the claim condition.
     *
     *  @param pricePerToken The price per token that can be claimed.
     *
     *  @param currency The currency in which `pricePerToken` must be paid.
     */
    struct ClaimCondition {
        uint256 startTimestamp;
        uint256 maxClaimableSupply;
        uint256 supplyClaimed;
        uint256 quantityLimitPerTransaction;
        uint256 waitTimeInSecondsBetweenClaims;
        bytes32 merkleRoot;
        uint256 pricePerToken;
        address currency;
    }

    /**
     *  @notice The set of all claim conditions at any given moment.
     *
     *  @dev In the contract, this is used as a standalone struct.
     *
     *  @param totalConditionCount The uid for each claim condition. Incremented
     *                            by one every time a claim condition is created.
     *
     *  @param claimConditionAtIndex The claim conditions at a given uid. Claim conditions
     *                              are ordered in an ascending order by their `startTimestamp`.
     *
     *  @param nextValidTimestampForClaim Account => uid for a claim condition => timestamp after
     *                                    which the account can claim tokens again.
     */
    struct ClaimConditions {
        uint256 totalConditionCount;
        uint256 timstampLimitIndex;
        mapping(uint256 => ClaimCondition) claimConditionAtIndex;
        mapping(address => mapping(uint256 => uint256)) timestampOfLastClaim;
    }

    /// @dev Emitted when tokens are lazy minted.
    event LazyMintedTokens(uint256 startTokenId, uint256 endTokenId, string baseURI, bytes encryptedBaseURI);

    /// @dev Emitted when tokens are claimed.
    event ClaimedTokens(
        uint256 indexed claimConditionIndex,
        address indexed claimer,
        address indexed receiver,
        uint256 startTokenId,
        uint256 quantityClaimed
    );

    /// @dev Emitted when the URI for a batch of NFTs is revealed.
    event RevealedNFT(uint256 endTokenId, string revealedURI);

    /// @dev Emitted when new mint conditions are set for a token.
    event NewClaimConditions(ClaimCondition[] claimConditions);

    /// @dev Emitted when a new sale recipient is set.
    event NewSaleRecipient(address indexed recipient);

    /// @dev Emitted when the royalty fee bps is updated
    event RoyaltyUpdated(uint256 newRoyaltyBps);

    /// @dev Emitted when fee on primary sales is updated.
    event PrimarySalesFeeUpdates(uint256 newFeeBps);

    /// @dev Emitted when transfers are set as restricted / not-restricted.
    event TransfersRestricted(bool restricted);

    /// @dev Emitted when a new Owner is set.
    event NewOwner(address prevOwner, address newOwner);

    /// @dev The next token ID of the NFT to "lazy mint".
    function nextTokenIdToMint() external returns (uint256);

    /**
     *  @notice Lets an account with `MINTER_ROLE` mint tokens of ID from `nextTokenIdToMint`
     *          to `nextTokenIdToMint + _amount - 1`. The URIs for these tokenIds is baseURI + `${tokenId}`.
     *
     *  @param _amount The amount of tokens (each with a unique tokenId) to lazy mint.
     */
    function lazyMint(
        uint256 _amount,
        string calldata _baseURIForTokens,
        bytes memory _encryptedBaseURI
    ) external;

    /**
     *  @notice Lets an account claim a given quantity of tokens.
     *
     *  @param receiver The receiver of the NFTs to claim.
     *  @param _quantity The quantity of tokens to claim.
     *  @param _proofs The proof required to prove the account's inclusion in the merkle root whitelist
     *                 of the mint conditions that apply.
     */
    function claim(
        address receiver,
        uint256 _quantity,
        bytes32[] calldata _proofs
    ) external payable;

    /**
     *  @notice Lets a module admin (account with `DEFAULT_ADMIN_ROLE`) set claim conditions.
     *
     *  @param _conditions Mint conditions in ascending order by `startTimestamp`.
     */
    function setClaimConditions(ClaimCondition[] calldata _conditions) external;
}
