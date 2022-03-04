// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

// Tokens
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

// Security
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Meta transactions
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

// Royalties
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

// Protocol control center.
import { ProtocolControl } from "./ProtocolControl.sol";

import "@openzeppelin/contracts/utils/Multicall.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract Market is
    AccessControlEnumerable,
    Pausable,
    IERC1155Receiver,
    IERC721Receiver,
    ReentrancyGuard,
    ERC2771Context,
    Multicall
{
    bytes32 public constant LISTER_ROLE = keccak256("LISTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    uint128 private constant MAX_BPS = 10_000;

    /// @dev The protocol control center.
    ProtocolControl internal controlCenter;

    // See EIP 2981
    bytes4 private constant _INTERFACE_ID_ERC2981 = type(IERC2981).interfaceId;

    /// @dev Total number of listings on market.
    uint256 public totalListings;

    /// @dev Collection level metadata.
    string public _contractURI;

    /// @dev The marketplace fee.
    uint128 public marketFeeBps;

    bool public restrictedListerRoleOnly;

    /// @dev Token type of the listing.
    enum TokenType {
        ERC1155,
        ERC721
    }

    struct Listing {
        uint256 listingId;
        address seller;
        address assetContract;
        uint256 tokenId;
        uint256 quantity;
        address currency;
        uint256 pricePerToken;
        uint256 saleStart;
        uint256 saleEnd;
        uint256 tokensPerBuyer;
        TokenType tokenType;
    }

    /// @dev listingId => listing info.
    mapping(uint256 => Listing) public listings;

    /// @dev listingId => buyer address => tokens bought
    mapping(uint256 => mapping(address => uint256)) public boughtFromListing;

    /// @dev Events
    event NewListing(address indexed assetContract, address indexed seller, uint256 indexed listingId, Listing listing);
    event ListingUpdate(address indexed seller, uint256 indexed listingId, Listing listing);
    event NewSale(
        address indexed assetContract,
        address indexed seller,
        uint256 indexed listingId,
        address buyer,
        uint256 quantity,
        Listing listing
    );
    event MarketFeeUpdate(uint128 newFee);
    event RestrictedListerRoleUpdated(bool restricted);

    /// @dev Check whether the listing exists.
    modifier onlyExistingListing(uint256 _listingId) {
        require(listings[_listingId].seller != address(0), "Market: The listing does not exist.");
        _;
    }

    /// @dev Check whether the function is called by the seller of the listing.
    modifier onlySeller(address _seller, uint256 _listingId) {
        require(listings[_listingId].seller == _seller, "Market: Only the seller can call this function.");
        _;
    }

    modifier onlyListerRoleWhenRestricted() {
        require(
            !restrictedListerRoleOnly || hasRole(LISTER_ROLE, _msgSender()),
            "only a lister can call this function."
        );
        _;
    }

    modifier onlyModuleAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "only a module admin can call this function.");
        _;
    }

    constructor(
        address payable _controlCenter,
        address _trustedForwarder,
        string memory _uri,
        uint128 _marketFeeBps
    ) ERC2771Context(_trustedForwarder) {
        // Set contract URI
        _contractURI = _uri;

        // Set the protocol control center.
        controlCenter = ProtocolControl(_controlCenter);

        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(LISTER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());
        setMarketFeeBps(_marketFeeBps);
    }

    /**
     *   ERC 1155 and ERC 721 Receiver functions.
     **/

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerable, IERC165)
        returns (bool)
    {
        return interfaceId == type(IERC1155Receiver).interfaceId || interfaceId == type(IERC721Receiver).interfaceId;
    }

    /**
     *   External functions.
     **/

    /// @notice List a given amount of pack or reward tokens for sale.
    function list(
        address _assetContract,
        uint256 _tokenId,
        address _currency,
        uint256 _pricePerToken,
        uint256 _quantity,
        uint256 _tokensPerBuyer,
        uint256 _secondsUntilStart,
        uint256 _secondsUntilEnd
    ) external whenNotPaused onlyListerRoleWhenRestricted {
        require(_quantity > 0, "Market: must list at least one token.");
        require(_tokensPerBuyer <= _quantity, "Market: cannot let buyer buy more than listed quantity.");

        // Get listing ID.
        uint256 listingId = totalListings;
        totalListings += 1;

        // Transfer tokens being listed to Market.
        TokenType tokenTypeOfListing = takeTokensOnList(
            _assetContract,
            _msgSender(),
            address(this),
            _tokenId,
            _quantity
        );

        // Create listing.
        Listing memory newListing = Listing({
            listingId: listingId,
            seller: _msgSender(),
            assetContract: _assetContract,
            tokenId: _tokenId,
            currency: _currency,
            pricePerToken: _pricePerToken,
            quantity: _quantity,
            tokensPerBuyer: _tokensPerBuyer == 0 ? _quantity : _tokensPerBuyer,
            saleStart: block.timestamp + _secondsUntilStart,
            saleEnd: _secondsUntilEnd == 0 ? type(uint256).max : block.timestamp + _secondsUntilEnd,
            tokenType: tokenTypeOfListing
        });

        listings[listingId] = newListing;

        emit NewListing(_assetContract, _msgSender(), listingId, newListing);
    }

    /// @notice Unlist `_quantity` amount of tokens.
    function unlist(uint256 _listingId, uint256 _quantity) external onlySeller(_msgSender(), _listingId) {
        Listing memory listing = listings[_listingId];

        require(listing.quantity >= _quantity, "Market: cannot unlist more tokens than are listed.");

        // Update listing info.
        listing.quantity -= _quantity;
        listings[_listingId] = listing;

        // Transfer way tokens being unlisted.
        sendTokens(listing, _quantity);

        emit ListingUpdate(_msgSender(), _listingId, listing);
    }

    /// @notice Lets a seller add tokens to an existing listing.
    function addToListing(uint256 _listingId, uint256 _quantity)
        external
        whenNotPaused
        onlySeller(_msgSender(), _listingId)
    {
        Listing memory listing = listings[_listingId];

        // Update listing info.
        listing.quantity += _quantity;
        listings[_listingId] = listing;

        require(_quantity > 0, "Market: must add at least one token.");
        require(listing.tokenType == TokenType.ERC1155, "Market: Can only add to ERC 1155 listings.");
        require(
            IERC1155(listing.assetContract).isApprovedForAll(_msgSender(), address(this)),
            "Market: must approve the market to transfer tokens being added."
        );

        // Transfer tokens being listed to Pack Protocol's asset manager.
        IERC1155(listing.assetContract).safeTransferFrom(_msgSender(), address(this), listing.tokenId, _quantity, "");

        emit ListingUpdate(_msgSender(), _listingId, listing);
    }

    /// @notice Lets a seller change the currency or price of a listing.
    function updateListingParams(
        uint256 _listingId,
        uint256 _pricePerToken,
        address _currency,
        uint256 _tokensPerBuyer,
        uint256 _secondsUntilStart,
        uint256 _secondsUntilEnd
    ) external whenNotPaused onlySeller(_msgSender(), _listingId) {
        Listing memory listing = listings[_listingId];

        require(_tokensPerBuyer <= listing.quantity, "Market: cannot let buyer buy more than listed quantity.");

        // Update listing info.
        listing.pricePerToken = _pricePerToken;
        listing.currency = _currency;
        listing.tokensPerBuyer = _tokensPerBuyer == 0 ? listing.quantity : _tokensPerBuyer;
        listing.saleStart = block.timestamp + _secondsUntilStart;
        listing.saleEnd = _secondsUntilEnd == 0 ? type(uint256).max : block.timestamp + _secondsUntilEnd;

        listings[_listingId] = listing;

        emit ListingUpdate(_msgSender(), _listingId, listing);
    }

    /// @notice Lets buyer buy a given amount of tokens listed for sale.
    function buy(uint256 _listingId, uint256 _quantity)
        external
        nonReentrant
        whenNotPaused
        onlyExistingListing(_listingId)
    {
        // Get listing
        Listing memory listing = listings[_listingId];
        address buyer = _msgSender();

        require(_quantity > 0 && _quantity <= listing.quantity, "Market: must buy an appropriate amount of tokens.");
        require(
            block.timestamp <= listing.saleEnd && block.timestamp >= listing.saleStart,
            "Market: the sale has either not started or closed."
        );
        require(
            _quantity + boughtFromListing[_listingId][buyer] <= listing.tokensPerBuyer,
            "Market: Cannot buy more from listing than permitted."
        );

        // Update buyer info
        boughtFromListing[_listingId][buyer] += _quantity;

        // Update listing info.
        listing.quantity -= _quantity;
        listings[_listingId] = listing;

        // Distribute sale value to stakeholders
        if (listing.pricePerToken > 0) {
            payoutOnSale(listing, _quantity);
        }

        // Transfer tokens being bought to buyer.
        sendTokens(listing, _quantity);

        emit NewSale(listing.assetContract, listing.seller, _listingId, buyer, _quantity, listing);
    }

    /// @dev Transfers the token being listed to the Market.
    function takeTokensOnList(
        address _assetContract,
        address _from,
        address _market,
        uint256 _tokenId,
        uint256 _quantity
    ) internal returns (TokenType tokenType) {
        if (IERC165(_assetContract).supportsInterface(type(IERC1155).interfaceId)) {
            require(
                IERC1155(_assetContract).isApprovedForAll(_from, _market),
                "Market: must approve the market to transfer tokens being listed."
            );

            tokenType = TokenType.ERC1155;

            // Transfer tokens being listed to Market.
            IERC1155(_assetContract).safeTransferFrom(_from, _market, _tokenId, _quantity, "");
        } else if (IERC165(_assetContract).supportsInterface(type(IERC721).interfaceId)) {
            require(_quantity == 1, "Market: Cannot list more than 1 of an ERC721 NFT.");

            require(
                IERC721(_assetContract).isApprovedForAll(_from, _market) ||
                    IERC721(_assetContract).getApproved(_tokenId) == _market,
                "Market: must approve the market to transfer tokens being listed."
            );

            tokenType = TokenType.ERC721;

            // Transfer tokens being listed to Market.
            IERC721(_assetContract).safeTransferFrom(_from, _market, _tokenId, "");
        } else {
            revert("Market: token must implement either ERC 1155 or ERC 721.");
        }
    }

    /// @dev Sends the appropriate kind of token to caller.
    function sendTokens(Listing memory listing, uint256 _quantity) internal {
        if (listing.tokenType == TokenType.ERC1155) {
            IERC1155(listing.assetContract).safeTransferFrom(
                address(this),
                _msgSender(),
                listing.tokenId,
                _quantity,
                ""
            );
        } else if (listing.tokenType == TokenType.ERC721) {
            require(_quantity == 1, "Market: Cannot unlist more than one of an ERC 721 NFT.");
            IERC721(listing.assetContract).safeTransferFrom(address(this), _msgSender(), listing.tokenId, "");
        }
    }

    /// @dev Payout stakeholders on sale
    function payoutOnSale(Listing memory listing, uint256 _quantity) internal {
        // Get value distribution parameters.
        uint256 totalPrice = listing.pricePerToken * _quantity;

        // Check buyer's currency allowance
        require(
            IERC20(listing.currency).allowance(_msgSender(), address(this)) >= totalPrice,
            "Market: must approve Market to transfer price to pay."
        );

        // Collect protocol fee if any
        uint256 marketCut = (totalPrice * marketFeeBps) / MAX_BPS;

        require(
            IERC20(listing.currency).transferFrom(
                _msgSender(),
                controlCenter.getRoyaltyTreasury(address(this)),
                marketCut
            ),
            "Market: failed to transfer protocol cut."
        );

        uint256 sellerCut = totalPrice - marketCut;

        // Distribute royalties if any
        if (IERC165(listing.assetContract).supportsInterface(_INTERFACE_ID_ERC2981)) {
            (address royaltyReceiver, uint256 royaltyAmount) = IERC2981(listing.assetContract).royaltyInfo(
                listing.tokenId,
                totalPrice
            );

            if (royaltyReceiver != address(0) && royaltyAmount > 0) {
                require(royaltyAmount + marketCut <= totalPrice, "Market: Total market fees exceed the price.");

                sellerCut = sellerCut - royaltyAmount;

                require(
                    IERC20(listing.currency).transferFrom(_msgSender(), royaltyReceiver, royaltyAmount),
                    "Market: failed to transfer creator cut."
                );
            }
        }

        // Distribute price to seller
        require(
            IERC20(listing.currency).transferFrom(_msgSender(), listing.seller, sellerCut),
            "Market: failed to transfer seller cut."
        );
    }

    /// @dev Lets a protocol admin set market fees.
    function setMarketFeeBps(uint128 feeBps) public onlyModuleAdmin {
        require(feeBps <= MAX_BPS, "bps provided must be less than 10,000");

        marketFeeBps = feeBps;
        emit MarketFeeUpdate(feeBps);
    }

    function setRestrictedListerRoleOnly(bool restricted) external onlyModuleAdmin {
        restrictedListerRoleOnly = restricted;
        emit RestrictedListerRoleUpdated(restricted);
    }

    /// @dev Sets contract URI for the storefront-level metadata of the contract.
    function setContractURI(string calldata _URI) external onlyModuleAdmin {
        _contractURI = _URI;
    }

    /// @dev Returns the URI for the storefront-level metadata of the contract.
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    /// @notice Returns the listing for the given seller and Listing ID.
    function getListing(uint256 _listingId) external view returns (Listing memory listing) {
        listing = listings[_listingId];
    }

    /// @dev Returns all listings
    function getAllListings() external view returns (Listing[] memory allListings) {
        uint256 numOfListings = totalListings;
        allListings = new Listing[](numOfListings);

        for (uint256 i = 0; i < numOfListings; i += 1) {
            allListings[i] = listings[i];
        }
    }

    /// @dev Returns all listings by seller
    function getListingsBySeller(address _seller) external view returns (Listing[] memory sellerListings) {
        uint256 numOfListings = totalListings;
        uint256 numOfSellerListings;

        for (uint256 i = 0; i < numOfListings; i += 1) {
            if (listings[i].seller == _seller) {
                numOfSellerListings += 1;
            }
        }

        sellerListings = new Listing[](numOfSellerListings);
        uint256 idx;

        for (uint256 i = 0; i < numOfListings; i += 1) {
            if (listings[i].seller == _seller) {
                sellerListings[idx] = listings[i];
                idx += 1;
            }
        }
    }

    /// @dev Returns all listings by assetContract
    function getListingsByAssetContract(address _assetContract) external view returns (Listing[] memory tokenListings) {
        uint256 numOfListings = totalListings;
        uint256 numOfTokenListings;

        for (uint256 i = 0; i < numOfListings; i += 1) {
            if (listings[i].assetContract == _assetContract) {
                numOfTokenListings += 1;
            }
        }

        tokenListings = new Listing[](numOfTokenListings);
        uint256 idx;

        for (uint256 i = 0; i < numOfListings; i += 1) {
            if (listings[i].assetContract == _assetContract) {
                tokenListings[idx] = listings[i];
                idx += 1;
            }
        }
    }

    /// @dev Returns all listings by asset; `asset == assetContract x tokenId`
    function getListingsByAsset(address _assetContract, uint256 _tokenId)
        external
        view
        returns (Listing[] memory tokenListings)
    {
        uint256 numOfListings = totalListings;
        uint256 numOfTokenListings;

        for (uint256 i = 0; i < numOfListings; i += 1) {
            if (listings[i].assetContract == _assetContract && listings[i].tokenId == _tokenId) {
                numOfTokenListings += 1;
            }
        }

        tokenListings = new Listing[](numOfTokenListings);
        uint256 idx;

        for (uint256 i = 0; i < numOfListings; i += 1) {
            if (listings[i].assetContract == _assetContract && listings[i].tokenId == _tokenId) {
                tokenListings[idx] = listings[i];
                idx += 1;
            }
        }
    }

    function _msgSender() internal view virtual override(Context, ERC2771Context) returns (address sender) {
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view virtual override(Context, ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }
}
