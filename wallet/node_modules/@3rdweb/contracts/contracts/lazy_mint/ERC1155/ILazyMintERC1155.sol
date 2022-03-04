// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

/**
 *  `LazyMintERC1155` is an ERC 1155 contract. It takes in a base URI in its
 *  constructor (e.g. "ipfs://Qmece.../"), and the URI for each token of ID
 *  `tokenId` is baseURI + `${tokenId}` (e.g. "ipfs://Qmece.../1").
 *
 *  For each token with a unique ID, the module admin (account with `DEFAULT_ADMIN ROLE`)
 *  can create mint conditions with non-overlapping time windows, and accounts can claim
 *  the NFTs, in a given time window, according to that time window's mint conditions.
 */

interface ILazyMintERC1155 {
    /**
     *  @notice The mint conditions for a given tokenId x time window.
     *
     *  @param startTimestamp The unix timestamp after which the mint conditions last.
     *                        The same mint conditions last until the `startTimestamp`
     *                        of the next mint condition.
     *
     *  @param maxClaimableSupply The maximum number of tokens of the same `tokenId` that can
     *                            be claimed under the mint condition.
     *
     *  @param supplyClaimed At any given point, the number of tokens of the same `tokenId`
     *                           that have been claimed.
     *
     *  @param quantityLimitPerTransaction The maximum number of tokens a single account can
     *                                     claim in a single transaction.
     *
     *  @param waitTimeInSecondsBetweenClaims The least number of seconds an account must wait
     *                                        after claiming tokens, to be able to claim again.
     *
     *  @param merkleRoot Only accounts whose address is a leaf of `merkleRoot` can claim tokens
     *                    under the mint condition.
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
     *  @notice The set of all mint conditions for a given tokenId.
     *
     *  @dev In the contract, we use this in a mapping: tokenId => mint conditions i.e.
     *       mapping(uint256 => PublicMintConditions) public mintConditions;
     *
     *  @param totalConditionCount The uid for each mint condition. Incremented
     *                            by one every time a mint condition is created.
     *
     *  @param claimConditionAtIndex The mint conditions at a given uid. Mint conditions
     *                              are ordered in an ascending order by their `startTimestamp`.
     *
     *  @param nextValidTimestampForClaim Account => uid for a mint condition => timestamp after
     *                                    which the account can claim tokens again.
     */
    struct ClaimConditions {
        uint256 totalConditionCount;
        uint256 timstampLimitIndex;
        mapping(uint256 => ClaimCondition) claimConditionAtIndex;
        mapping(address => mapping(uint256 => uint256)) timestampOfLastClaim;
    }

    /// @dev Emitted when tokens are lazy minted.
    event LazyMintedTokens(uint256 startTokenId, uint256 endTokenId, string baseURI);

    /// @dev Emitted when tokens are claimed.
    event ClaimedTokens(
        uint256 indexed claimConditionIndex,
        uint256 indexed tokenId,
        address indexed claimer,
        address receiver,
        uint256 quantityClaimed
    );

    /// @dev Emitted when new mint conditions are set for a token.
    event NewClaimConditions(uint256 indexed tokenId, ClaimCondition[] claimConditions);

    /// @dev Emitted when a new sale recipient is set.
    event NewSaleRecipient(address indexed recipient, uint256 indexed _tokenId, bool isDefaultRecipient);

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
    function lazyMint(uint256 _amount, string calldata _baseURIForTokens) external;

    /**
     *  @notice Lets an account claim a given quantity of tokens, of a single tokenId.
     *
     *  @param _tokenId The unique ID of the token to claim.
     *  @param _quantity The quantity of tokens to claim.
     *  @param _proofs The proof required to prove the account's inclusion in the merkle root whitelist
     *                 of the mint conditions that apply.
     */
    function claim(
        address _receiver,
        uint256 _tokenId,
        uint256 _quantity,
        bytes32[] calldata _proofs
    ) external payable;

    /**
     *  @notice Lets a module admin (account with `DEFAULT_ADMIN_ROLE`) set mint conditions for a given token ID.
     *
     *  @param _tokenId The token ID for which to set mint conditions.
     *  @param _conditions Mint conditions in ascending order by `startTimestamp`.
     */
    function setClaimConditions(uint256 _tokenId, ClaimCondition[] calldata _conditions) external;
}
