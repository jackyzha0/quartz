// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

/**
 *  `SignatureMint` is an ERC 721 contract. It lets anyone mint NFTs by producing a mint request
 *  and a signature (produced by an account with MINTER_ROLE, signing the mint request).
 */
interface ISignatureMint721 {
    /**
     *  @notice The body of a request to mint NFTs.
     *
     *  @param to The receiver of the NFTs to mint.
     *  @param uri The URI of the NFT to mint.
     *  @param price Price to pay for minting with the signature.
     *  @param currency The currency in which the price per token must be paid.
     *  @param validityStartTimestamp The unix timestamp after which the request is valid.
     *  @param validityEndTimestamp The unix timestamp after which the request expires.
     *  @param uid A unique identifier for the request.
     */
    struct MintRequest {
        address to;
        string uri;
        uint256 price;
        address currency;
        uint128 validityStartTimestamp;
        uint128 validityEndTimestamp;
        bytes32 uid;
    }

    /// @dev Emitted when an account with MINTER_ROLE mints an NFT.
    event TokenMinted(address indexed mintedTo, uint256 indexed tokenIdMinted, string uri);

    /// @dev Emitted when tokens are minted.
    event MintWithSignature(
        address indexed signer,
        address indexed mintedTo,
        uint256 indexed tokenIdMinted,
        MintRequest mintRequest
    );

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

    /**
     *  @notice Verifies that a mint request is signed by an account holding
     *         MINTER_ROLE (at the time of the function call).
     *
     *  @param req The mint request.
     *  @param signature The signature produced by an account signing the mint request.
     *
     *  returns (success, signer) Result of verification and the recovered address.
     */
    function verify(MintRequest calldata req, bytes calldata signature)
        external
        view
        returns (bool success, address signer);

    /**
     *  @notice Lets an account with MINTER_ROLE mint an NFT.
     *
     *  @param to The address to mint the NFT to.
     *  @param uri The URI to assign to the NFT.
     *
     *  @return tokenId of the NFT minted.
     */
    function mintTo(address to, string calldata uri) external returns (uint256);

    /**
     *  @notice Mints an NFT according to the provided mint request.
     *
     *  @param req The mint request.
     *  @param signature he signature produced by an account signing the mint request.
     */
    function mintWithSignature(MintRequest calldata req, bytes calldata signature) external payable returns (uint256);
}
