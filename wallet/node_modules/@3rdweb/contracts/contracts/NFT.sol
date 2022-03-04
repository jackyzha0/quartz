// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

// Token + Access Control
import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";

// Protocol control center.
import { ProtocolControl } from "./ProtocolControl.sol";

// Royalties
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

// Meta transactions
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

// Utils
import "@openzeppelin/contracts/utils/Multicall.sol";

contract NFT is ERC721PresetMinterPauserAutoId, ERC2771Context, IERC2981, Multicall {
    /// @dev Only TRANSFER_ROLE holders can have tokens transferred from or to them, during restricted transfers.
    bytes32 public constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");

    uint128 private constant MAX_BPS = 10_000;

    /// @dev Whether transfers on tokens are restricted.
    bool public transfersRestricted;

    /// @dev Owner of the contract (purpose: OpenSea compatibility, etc.)
    address private _owner;

    /// @dev The protocol control center.
    ProtocolControl internal controlCenter;

    /// @dev The token Id of the NFT to mint.
    uint256 public nextTokenId;

    /// @dev Collection level metadata.
    string public _contractURI;

    /// @dev Mapping from tokenId => URI
    mapping(uint256 => string) public nftURI;

    /// @dev Mapping from tokenId => creator
    mapping(uint256 => address) public creator;

    /// @dev Pack sale royalties -- see EIP 2981
    uint256 public royaltyBps;

    /// @dev Emitted when an NFT is minted;
    event Minted(address indexed creator, address indexed to, uint256 tokenId, string tokenURI);
    event MintedBatch(address indexed creator, address indexed to, uint256[] tokenIds, string[] tokenURI);
    event RestrictedTransferUpdated(bool transferable);
    event RoyaltyUpdated(uint256 royaltyBps);
    event NewOwner(address prevOwner, address newOwner);

    modifier onlyModuleAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "only module admin role");
        _;
    }

    constructor(
        address payable _controlCenter,
        string memory _name,
        string memory _symbol,
        address _trustedForwarder,
        string memory _uri,
        uint256 _royaltyBps
    ) ERC721PresetMinterPauserAutoId(_name, _symbol, _uri) ERC2771Context(_trustedForwarder) {
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
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return hasRole(DEFAULT_ADMIN_ROLE, _owner) ? _owner : address(0);
    }

    /// @dev Revert inherited mint function.
    function mint(address) public pure override {
        revert("NFT721: Call mintNFT instead.");
    }

    /// @dev Mints an NFT to `_to` with URI `_uri`
    function mintNFT(address _to, string calldata _uri) external whenNotPaused {
        require(hasRole(MINTER_ROLE, _msgSender()), "NFT: must have minter role to mint");

        // Get tokenId
        uint256 id = nextTokenId;

        // Update URI
        nftURI[id] = _uri;

        // Update creator
        creator[id] = _msgSender();

        // Mint NFT
        _mint(_to, id);
        nextTokenId += 1;

        emit Minted(_msgSender(), _to, id, _uri);
    }

    function mintNFTBatch(address _to, string[] calldata _uris) external whenNotPaused {
        require(hasRole(MINTER_ROLE, _msgSender()), "NFT: must have minter role to mint");

        uint256[] memory ids = new uint256[](_uris.length);

        // Get tokenId
        uint256 id = nextTokenId;
        address _creator = _msgSender();

        for (uint256 i = 0; i < _uris.length; i++) {
            // Update Ids
            ids[i] = id;

            // Update URI
            nftURI[id] = _uris[i];

            // Update creator
            creator[id] = _creator;

            // Mint NFT
            _mint(_to, id);

            id += 1;
        }

        nextTokenId = id;

        emit MintedBatch(_creator, _to, ids, _uris);
    }

    /// @dev Lets a protocol admin update the royalties paid on pack sales.
    function setRoyaltyBps(uint256 _royaltyBps) public onlyModuleAdmin {
        require(_royaltyBps <= MAX_BPS, "NFT: Bps provided must be less than 10,000");

        royaltyBps = _royaltyBps;

        emit RoyaltyUpdated(_royaltyBps);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721PresetMinterPauserAutoId, IERC165)
        returns (bool)
    {
        return super.supportsInterface(interfaceId) || interfaceId == type(IERC2981).interfaceId;
    }

    /// @dev Lets a protocol admin restrict token transfers.
    function setRestrictedTransfer(bool _restrictedTransfer) external onlyModuleAdmin {
        transfersRestricted = _restrictedTransfer;

        emit RestrictedTransferUpdated(_restrictedTransfer);
    }

    /// @dev Runs on every transfer.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721PresetMinterPauserAutoId) {
        super._beforeTokenTransfer(from, to, tokenId);

        // if transfer is restricted on the contract, we still want to allow burning and minting
        if (transfersRestricted && from != address(0) && to != address(0)) {
            require(
                hasRole(TRANSFER_ROLE, from) || hasRole(TRANSFER_ROLE, to),
                "NFT: Transfers are restricted to TRANSFER_ROLE holders"
            );
        }
    }

    /// @dev See EIP 2981
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

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return nftURI[tokenId];
    }

    /// @dev Returns the URI for the storefront-level metadata of the contract.
    function contractURI() public view returns (string memory) {
        return _contractURI;
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

    function _msgSender() internal view virtual override(Context, ERC2771Context) returns (address sender) {
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view virtual override(Context, ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }
}
