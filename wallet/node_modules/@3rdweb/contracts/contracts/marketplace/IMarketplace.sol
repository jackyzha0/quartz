// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

interface IMarketplace {
    /// @notice Type of the tokens that can be listed for sale.
    enum TokenType {
        ERC1155,
        ERC721
    }

    /**
     *  @notice The two types of listings.
     *          `Direct`: NFTs listed for sale at a fixed price.
     *          `Auction`: NFTs listed for sale in an auction.
     */
    enum ListingType {
        Direct,
        Auction
    }

    /**
     * @notice The information related to either (1) an offer on a direct listing, or (2) a bid in an auction.
     *
     * @dev The listing type of the listing at ID `lisingId` determins how the `Offer` is interpreted.
     *      If the listing is of type `Direct`, the `Offer` is interpreted as an offer to a direct listing.
     *      If the listing is of type `Auction`, the `Offer` is interpreted as a bid in an auction.
     */
    struct Offer {
        uint256 listingId;
        address offeror;
        uint256 quantityWanted;
        address currency;
        uint256 pricePerToken;
    }

    /**
     * @dev For use in `createListing` as a parameter type.
     *
     * @param assetContract         The contract address of the NFT to list for sale.

     * @param tokenId               The tokenId on `assetContract` of the NFT to list for sale.

     * @param startTime             The unix timestamp after which the listing is active. For direct listings:
     *                              'active' means NFTs can be bought from the listing. For auctions,
     *                              'active' means bids can be made in the auction.
     *
     * @param secondsUntilEndTime   No. of seconds after `startTime`, after which the listing is inactive.
     *                              For direct listings: 'inactive' means NFTs cannot be bought from the listing.
     *                              For auctions: 'inactive' means bids can no longer be made in the auction.
     *
     * @param quantityToList        The quantity of NFT of ID `tokenId` on the given `assetContract` to list. For
     *                              ERC 721 tokens to list for sale, the contract strictly defaults this to `1`,
     *                              Regardless of the value of `quantityToList` passed.
     *
     * @param currencyToAccept      For direct listings: the currency in which a buyer must pay the listing's fixed price
     *                              to buy the NFT(s). For auctions: the currency in which the bidders must make bids.
     *
     * @param reservePricePerToken  For direct listings: this value is ignored. For auctions: the minimum bid amount of
     *                              the auction is `reservePricePerToken * quantityToList`
     *
     * @param buyoutPricePerToken   For direct listings: interpreted as 'price per token' listed. For auctions: if
     *                              `buyoutPricePerToken` is greater than 0, and a bidder's bid is at least as great as
     *                              `buyoutPricePerToken * quantityToList`, the bidder wins the auction, and the auction
     *                              is closed.
     *
     * @param listingType           The type of listing to create - a direct listing or an auction.
     */
    struct ListingParameters {
        address assetContract;
        uint256 tokenId;
        uint256 startTime;
        uint256 secondsUntilEndTime;
        uint256 quantityToList;
        address currencyToAccept;
        uint256 reservePricePerToken;
        uint256 buyoutPricePerToken;
        ListingType listingType;
    }

    /**
     * @notice The information related to a listing; either (1) a direct listing, or (2) an auction listing.
     *
     * @dev For direct listings:
     *          (1) `reservePricePerToken` is ignored.
     *          (2) `buyoutPricePerToken` is simply interpreted as 'price per token'.
     */
    struct Listing {
        uint256 listingId;
        address tokenOwner;
        address assetContract;
        uint256 tokenId;
        uint256 startTime;
        uint256 endTime;
        uint256 quantity;
        address currency;
        uint256 reservePricePerToken;
        uint256 buyoutPricePerToken;
        TokenType tokenType;
        ListingType listingType;
    }

    /// @dev Emitted when a new listing is created.
    event NewListing(uint256 indexed listingId, address indexed assetContract, address indexed lister, Listing listing);

    /// @dev Emitted when the parameters of a listing are updated.
    event ListingUpdate(uint256 indexed listingId, address indexed listingCreator);

    /**
     * @dev Emitted when a buyer buys from a direct listing, or a lister accepts some
     *      buyer's offer to their direct listing.
     */
    event NewSale(
        uint256 indexed listingId,
        address indexed assetContract,
        address indexed lister,
        address buyer,
        uint256 quantityBought,
        uint256 totalPricePaid
    );

    /// @dev Emitted when (1) a new offer is made to a direct listing, or (2) when a new bid is made in an auction.
    event NewOffer(
        uint256 indexed listingId,
        address indexed offeror,
        ListingType indexed listingType,
        uint256 quantityWanted,
        uint256 totalOfferAmount,
        address currency
    );

    /// @dev Emitted when an auction is closed.
    event AuctionClosed(
        uint256 indexed listingId,
        address indexed closer,
        bool indexed cancelled,
        address auctionCreator,
        address winningBidder
    );

    /// @dev Emitted when the market fee collected on every sale is updated.
    event MarketFeeUpdate(uint64 newFee);

    /// @dev Emitted when auction buffers are updated.
    event AuctionBuffersUpdated(uint256 timeBuffer, uint256 bidBufferBps);

    /// @dev Emitted when the LISTER_ROLE restriction is updated.
    event ListingRestricted(bool restricted);

    /**
     * @notice Lets a token (ERC 721 or ERC 1155) owner list tokens for sale in a direct listing, or an auction.
     * @param _params The parameters that govern the listing to be created.

     * @dev The values of `_params` are passsed to this function in a `ListingParameters` struct, instead of
     *      directly due to Solidity's limit of the no. of local variables that can be used in a function.

     * @dev NFTs to list for sale in an auction are escrowed in Marketplace. For direct listings, the contract
     *      only checks whether the listing's creator owns and has approved Marketplace to transfer the NFTs to list.
     */
    function createListing(ListingParameters memory _params) external;

    /**
     * @notice Lets a listing's creator edit the listing's parameters. A direct listing can be edited whenever.
     *         An auction listing cannot be edited after the auction has started.
     *
     * @param _listingId            The unique Id of the lisitng to edit.
     *
     * @param _quantityToList       The amount of NFTs to list for sale in the listing. For direct lisitngs, the contract
     *                              only checks whether the listing creator owns and has approved Marketplace to transfer
     *                              `_quantityToList` amount of NFTs to list for sale. For auction listings, the contract
     *                               ensures that exactly `_quantityToList` amount of NFTs to list are escrowed.
     *
     * @param _reservePricePerToken For direct listings: this value is ignored. For auctions: the minimum bid amount of
     *                              the auction is `reservePricePerToken * quantityToList`
     *
     * @param _buyoutPricePerToken  For direct listings: interpreted as 'price per token' listed. For auctions: if
     *                              `buyoutPricePerToken` is greater than 0, and a bidder's bid is at least as great as
     *                              `buyoutPricePerToken * quantityToList`, the bidder wins the auction, and the auction
     *                              is closed.
     *
     * @param _currencyToAccept     For direct listings: the currency in which a buyer must pay the listing's fixed price
     *                              to buy the NFT(s). For auctions: the currency in which the bidders must make bids.
     *
     * @param _startTime            The unix timestamp after which listing is active. For direct listings:
     *                              'active' means NFTs can be bought from the listing. For auctions,
     *                              'active' means bids can be made in the auction.
     *
     * @param _secondsUntilEndTime  No. of seconds after which the listing is inactive. For direct listings:
     *                              'inactive' means NFTs cannot be bought from the listing. For auctions,
     *                              'inactive' means bids can no longer be made in the auction.
     */
    function updateListing(
        uint256 _listingId,
        uint256 _quantityToList,
        uint256 _reservePricePerToken,
        uint256 _buyoutPricePerToken,
        address _currencyToAccept,
        uint256 _startTime,
        uint256 _secondsUntilEndTime
    ) external;

    /**
     * @notice Lets someone buy a given quantity of tokens from a direct listing by paying the fixed price.
     *
     * @param _listingId The unique ID of the direct lisitng to buy from.
     * @param _quantity The amount of NFTs to buy from the direct listing.
     *
     * @dev A sale will fail to execute if either:
     *          (1) buyer does not own or has not approved Marketplace to transfer the appropriate
     *              amount of currency (or hasn't sent the appropriate amount of native tokens)
     *
     *          (2) the lister does not own or has removed Markeplace's
     *              approval to transfer the tokens listed for sale.
     */
    function buy(
        uint256 _listingId,
        uint256 _quantity,
        address _currency,
        uint256 _totalPrice
    ) external payable;

    /**
     * @notice Lets someone make an offer to a direct listing, or bid in an auction.
     *
     * @dev Each (address, listing ID) pair maps to a single unique offer. So e.g. if a buyer makes
     *      makes two offers to the same direct listing, the last offer is counted as the buyer's
     *      offer to that listing.
     *
     * @param _listingId        The unique ID of the lisitng to make an offer/bid to.
     *
     * @param _quantityWanted   For auction listings: the 'quantity wanted' is the total amount of NFTs
     *                          being auctioned, regardless of the value of `_quantityWanted` passed.
     *                          For direct listings: `_quantityWanted` is the quantity of NFTs from the
     *                          listing, for which the offer is being made.
     *
     * @param _currency         For auction listings: the 'currency of the bid' is the currency accepted
     *                          by the auction, regardless of the value of `_currency` passed. For direct listings:
     *                          this is the currency in which the offer is made.
     *
     * @param _pricePerToken    The offered price per token. The total offer amount is `_quantityWanted * _pricePerToken`.
     */
    function offer(
        uint256 _listingId,
        uint256 _quantityWanted,
        address _currency,
        uint256 _pricePerToken
    ) external payable;

    /**
     * @notice Lets a listing's creator accept an offer to their direct listing.
     * @param _listingId The unique ID of the listing for which to accept the offer.
     * @param _offeror The address of the buyer whose offer is to be accepted.
     */
    function acceptOffer(uint256 _listingId, address _offeror) external;

    /**
     * @notice Lets any account close an auction on behalf of either the (1) auction's creator, or (2) winning bidder.
     *              For (1): The auction creator is sent the the winning bid amount.
     *              For (2): The winning bidder is sent the auctioned NFTs.
     *
     * @param _listingId The unique ID of the listing (the auction to close).
     * @param _closeFor For whom the auction is being closed - the auction creator or winning bidder.
     */
    function closeAuction(uint256 _listingId, address _closeFor) external;
}
