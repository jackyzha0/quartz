// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

// Base
import "./openzeppelin-presets/ERC1155PresetMinterPauserSupplyHolder.sol";

// Token interfaces
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";

// Meta transactions
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

// Protocol control center.
import { ProtocolControl } from "./ProtocolControl.sol";

// Royalties
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

// Utils
import "@openzeppelin/contracts/utils/Multicall.sol";

contract NFTCollection is ERC1155PresetMinterPauserSupplyHolder, ERC2771Context, IERC2981, Multicall {
    uint128 private constant MAX_BPS = 10_000;

    /// @dev The protocol control center.
    ProtocolControl internal controlCenter;

    /// @dev Owner of the contract (purpose: OpenSea compatibility, etc.)
    address private _owner;

    /// @dev The token Id of the next token to be minted.
    uint256 public nextTokenId;

    /// @dev NFT sale royalties -- see EIP 2981
    uint256 public royaltyBps;

    /// @dev Collection level metadata.
    string public _contractURI;

    /// @dev Only TRANSFER_ROLE holders can have tokens transferred from or to them, during restricted transfers.
    bytes32 public constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");

    /// @dev Whether transfers on tokens are restricted.
    bool public transfersRestricted;

    /// @dev Whether the ERC 1155 token is a wrapped ERC 20 / 721 token.
    enum UnderlyingType {
        None,
        ERC20,
        ERC721
    }

    /// @dev The state of a token.
    struct TokenState {
        address creator;
        string uri;
        UnderlyingType underlyingType;
    }

    /// @dev The state of the underlying ERC 721 token, if any.
    struct ERC721Wrapped {
        address source;
        uint256 tokenId;
    }

    /// @dev The state of the underlying ERC 20 token, if any.
    struct ERC20Wrapped {
        address source;
        uint256 shares;
        uint256 underlyingTokenAmount;
    }

    event RestrictedTransferUpdated(bool transferable);

    /// @dev Emitted when native ERC 1155 tokens are created.
    event NativeTokens(address indexed creator, uint256[] tokenIds, string[] tokenURIs, uint256[] tokenSupplies);

    /// @dev Emitted when ERC 721 wrapped as an ERC 1155 token is minted.
    event ERC721WrappedToken(
        address indexed creator,
        address indexed sourceOfUnderlying,
        uint256 tokenIdOfUnderlying,
        uint256 tokenId,
        string tokenURI
    );

    /// @dev Emitted when an underlying ERC 721 token is redeemed.
    event ERC721Redeemed(
        address indexed redeemer,
        address indexed sourceOfUnderlying,
        uint256 tokenIdOfUnderlying,
        uint256 tokenId
    );

    /// @dev Emitted when ERC 20 wrapped as an ERC 1155 token is minted.
    event ERC20WrappedToken(
        address indexed creator,
        address indexed sourceOfUnderlying,
        uint256 totalAmountOfUnderlying,
        uint256 shares,
        uint256 tokenId,
        string tokenURI
    );

    /// @dev Emitted when an underlying ERC 20 token is redeemed.
    event ERC20Redeemed(
        address indexed redeemer,
        uint256 indexed tokenId,
        address indexed sourceOfUnderlying,
        uint256 tokenAmountReceived,
        uint256 sharesRedeemed
    );

    /// @dev Emitted when the EIP 2981 royalty of the contract is updated.
    event RoyaltyUpdated(uint256 royaltyBps);

    /// @dev Emitted when a new Owner is set.
    event NewOwner(address prevOwner, address newOwner);

    /// @dev NFT tokenId => token state.
    mapping(uint256 => TokenState) public tokenState;

    /// @dev NFT tokenId => state of underlying ERC721 token.
    mapping(uint256 => ERC721Wrapped) public erc721WrappedTokens;

    /// @dev NFT tokenId => state of underlying ERC20 token.
    mapping(uint256 => ERC20Wrapped) public erc20WrappedTokens;

    modifier onlyModuleAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "only module admin role");
        _;
    }

    /// @dev Checks whether the caller has MINTER_ROLE.
    modifier onlyMinterRole() {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "NFTCollection: Only accounts with MINTER_ROLE can call this function."
        );
        _;
    }

    constructor(
        address payable _controlCenter,
        address _trustedForwarder,
        string memory _uri,
        uint256 _royaltyBps
    ) ERC1155PresetMinterPauserSupplyHolder(_uri) ERC2771Context(_trustedForwarder) {
        // Set the protocol control center
        controlCenter = ProtocolControl(_controlCenter);

        // Set contract URI
        _contractURI = _uri;

        // Grant ownership and setup roles
        _owner = _msgSender();
        _setupRole(TRANSFER_ROLE, _msgSender());
        setRoyaltyBps(_royaltyBps);
    }

    /**
     *      Public functions
     */

    /**
     * @dev Returns the address of the current owner.
     */
    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return hasRole(DEFAULT_ADMIN_ROLE, _owner) ? _owner : address(0);
    }

    /// @notice Create native ERC 1155 NFTs.
    function createNativeTokens(
        address to,
        string[] calldata _nftURIs,
        uint256[] calldata _nftSupplies,
        bytes memory data
    ) public whenNotPaused onlyMinterRole returns (uint256[] memory nftIds) {
        require(_nftURIs.length == _nftSupplies.length, "NFTCollection: Must specify equal number of config values.");
        require(_nftURIs.length > 0, "NFTCollection: Must create at least one NFT.");

        // Get creator
        address tokenCreator = _msgSender();

        // Get tokenIds.
        nftIds = new uint256[](_nftURIs.length);

        // Store token state for each token.
        uint256 id = nextTokenId;

        for (uint256 i = 0; i < _nftURIs.length; i++) {
            nftIds[i] = id;

            tokenState[id] = TokenState({
                creator: tokenCreator,
                uri: _nftURIs[i],
                underlyingType: UnderlyingType.None
            });

            id += 1;
        }

        // Update contract level tokenId.
        nextTokenId = id;

        // Mint NFTs to token creator.
        _mintBatch(to, nftIds, _nftSupplies, data);

        emit NativeTokens(tokenCreator, nftIds, _nftURIs, _nftSupplies);
    }

    /// @dev See {ERC1155Minter}.
    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require(id < nextTokenId, "NFTCollection: cannot call this fn for creating new NFTs.");
        require(
            tokenState[id].underlyingType == UnderlyingType.None,
            "NFTCollection: cannot freely mint more of ERC20 or ERC721."
        );

        super.mint(to, id, amount, data);
    }

    /// @dev See {ERC1155Minter}.
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        bool validIds = true;
        bool validTokenType = true;

        for (uint256 i = 0; i < ids.length; ++i) {
            if (ids[i] >= nextTokenId && validIds) {
                validIds = false;
            }

            if (tokenState[ids[i]].underlyingType != UnderlyingType.None && validTokenType) {
                validTokenType = false;
            }
        }

        require(validIds, "NFTCollection: cannot call this fn for creating new NFTs.");
        require(validTokenType, "NFTCollection: cannot freely mint more of ERC20 or ERC721.");

        super.mintBatch(to, ids, amounts, data);
    }

    /**
     *      External functions
     */
    /// @dev Wraps an ERC721 NFT as an ERC1155 NFT.
    function wrapERC721(
        address _nftContract,
        uint256 _tokenId,
        string calldata _nftURI
    ) external whenNotPaused onlyMinterRole {
        require(
            IERC721(_nftContract).ownerOf(_tokenId) == _msgSender(),
            "NFTCollection: Only the owner of the NFT can wrap it."
        );
        require(
            IERC721(_nftContract).getApproved(_tokenId) == address(this) ||
                IERC721(_nftContract).isApprovedForAll(_msgSender(), address(this)),
            "NFTCollection: Must approve the contract to transfer the NFT."
        );

        // Get token creator
        address tokenCreator = _msgSender();

        // Get tokenId
        uint256 id = nextTokenId;
        nextTokenId += 1;

        // Transfer the NFT to this contract.
        IERC721(_nftContract).safeTransferFrom(tokenCreator, address(this), _tokenId);

        // Mint wrapped NFT to token creator.
        _mint(tokenCreator, id, 1, "");

        // Store wrapped NFT state.
        tokenState[id] = TokenState({ creator: tokenCreator, uri: _nftURI, underlyingType: UnderlyingType.ERC721 });

        // Map the native NFT tokenId to the underlying NFT
        erc721WrappedTokens[id] = ERC721Wrapped({ source: _nftContract, tokenId: _tokenId });

        emit ERC721WrappedToken(tokenCreator, _nftContract, _tokenId, id, _nftURI);
    }

    /// @dev Lets a wrapped nft owner redeem the underlying ERC721 NFT.
    function redeemERC721(uint256 _nftId) external {
        // Get redeemer
        address redeemer = _msgSender();

        require(balanceOf(redeemer, _nftId) > 0, "NFTCollection: Cannot redeem an NFT you do not own.");

        // Burn the native NFT token
        _burn(redeemer, _nftId, 1);

        // Transfer the NFT to redeemer
        IERC721(erc721WrappedTokens[_nftId].source).safeTransferFrom(
            address(this),
            redeemer,
            erc721WrappedTokens[_nftId].tokenId
        );

        emit ERC721Redeemed(redeemer, erc721WrappedTokens[_nftId].source, erc721WrappedTokens[_nftId].tokenId, _nftId);
    }

    /// @dev Wraps ERC20 tokens as ERC1155 NFTs.
    function wrapERC20(
        address _tokenContract,
        uint256 _tokenAmount,
        uint256 _numOfNftsToMint,
        string calldata _nftURI
    ) external whenNotPaused onlyMinterRole {
        // Get creator
        address tokenCreator = _msgSender();

        require(
            IERC20(_tokenContract).balanceOf(tokenCreator) >= _tokenAmount,
            "NFTCollection: Must own the amount of tokens being wrapped."
        );
        require(
            IERC20(_tokenContract).allowance(tokenCreator, address(this)) >= _tokenAmount,
            "NFTCollection: Must approve this contract to transfer tokens."
        );
        require(
            IERC20(_tokenContract).transferFrom(tokenCreator, address(this), _tokenAmount),
            "NFTCollection: Failed to transfer ERC20 tokens."
        );

        // Get NFT tokenId
        uint256 id = nextTokenId;
        nextTokenId += 1;

        // Mint NFTs to token creator
        _mint(tokenCreator, id, _numOfNftsToMint, "");

        tokenState[id] = TokenState({ creator: tokenCreator, uri: _nftURI, underlyingType: UnderlyingType.ERC20 });

        erc20WrappedTokens[id] = ERC20Wrapped({
            source: _tokenContract,
            shares: _numOfNftsToMint,
            underlyingTokenAmount: _tokenAmount
        });

        emit ERC20WrappedToken(tokenCreator, _tokenContract, _tokenAmount, _numOfNftsToMint, id, _nftURI);
    }

    /// @dev Lets the nft owner redeem their ERC20 tokens.
    function redeemERC20(uint256 _nftId, uint256 _amount) external {
        // Get redeemer
        address redeemer = _msgSender();

        require(balanceOf(redeemer, _nftId) >= _amount, "NFTCollection: Cannot redeem an NFT you do not own.");

        // Burn the native NFT token
        _burn(redeemer, _nftId, _amount);

        // Get the ERC20 token amount to distribute
        uint256 amountToDistribute = (erc20WrappedTokens[_nftId].underlyingTokenAmount * _amount) /
            erc20WrappedTokens[_nftId].shares;

        // Transfer the ERC20 tokens to redeemer
        require(
            IERC20(erc20WrappedTokens[_nftId].source).transfer(redeemer, amountToDistribute),
            "NFTCollection: Failed to transfer ERC20 tokens."
        );

        emit ERC20Redeemed(redeemer, _nftId, erc20WrappedTokens[_nftId].source, amountToDistribute, _amount);
    }

    /**
     *      External: setter functions
     */

    /// @dev Lets a protocol admin update the royalties paid on pack sales.
    function setRoyaltyBps(uint256 _royaltyBps) public onlyModuleAdmin {
        require(_royaltyBps <= MAX_BPS, "NFTCollection: Invalid bps provided; must be less than 10,000.");

        royaltyBps = _royaltyBps;

        emit RoyaltyUpdated(_royaltyBps);
    }

    /// @dev Lets a module admin set a new owner for the contract. The new owner must be a module admin.
    function setOwner(address _newOwner) external onlyModuleAdmin {
        require(hasRole(DEFAULT_ADMIN_ROLE, _newOwner), "new owner not module admin.");
        address _prevOwner = _owner;
        _owner = _newOwner;

        emit NewOwner(_prevOwner, _newOwner);
    }

    /// @dev Sets contract URI for the storefront-level metadata of the contract.
    function setContractURI(string calldata _URI) external onlyModuleAdmin {
        _contractURI = _URI;
    }

    /// @dev Lets a protocol admin restrict token transfers.
    function setRestrictedTransfer(bool _restrictedTransfer) external onlyModuleAdmin {
        transfersRestricted = _restrictedTransfer;

        emit RestrictedTransferUpdated(_restrictedTransfer);
    }

    /**
     *      Internal functions.
     */

    /// @dev Runs on every transfer.
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

        if (transfersRestricted && from != address(0) && to != address(0)) {
            require(
                hasRole(TRANSFER_ROLE, from) || hasRole(TRANSFER_ROLE, to),
                "NFTCollection: Transfers are restricted to or from TRANSFER_ROLE holders"
            );
        }
    }

    /// @dev See EIP-2771
    function _msgSender() internal view virtual override(Context, ERC2771Context) returns (address sender) {
        return ERC2771Context._msgSender();
    }

    /// @dev See EIP-2771
    function _msgData() internal view virtual override(Context, ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }

    /**
     *      Rest: view functions
     */

    /// @dev See ERC 165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155PresetMinterPauserSupplyHolder, IERC165)
        returns (bool)
    {
        return super.supportsInterface(interfaceId) || interfaceId == type(IERC2981).interfaceId;
    }

    /// @dev See EIP 2918
    function royaltyInfo(uint256, uint256 salePrice)
        external
        view
        virtual
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        receiver = controlCenter.getRoyaltyTreasury(address(this));
        royaltyAmount = (salePrice * royaltyBps) / MAX_BPS;
    }

    /// @dev See EIP 1155
    function uri(uint256 _nftId) public view override returns (string memory) {
        return tokenState[_nftId].uri;
    }

    /// @dev Alternative function to return a token's URI
    function tokenURI(uint256 _nftId) public view returns (string memory) {
        return tokenState[_nftId].uri;
    }

    /// @dev Returns the URI for the storefront-level metadata of the contract.
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    /// @dev Returns the creator of an NFT
    function creator(uint256 _nftId) external view returns (address) {
        return tokenState[_nftId].creator;
    }
}
