// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

// Base
import "./openzeppelin-presets/ERC1155PresetMinterPauserSupplyHolder.sol";

// Meta transactions
import { ERC2771Context } from "@openzeppelin/contracts/metatx/ERC2771Context.sol";

// Protocol control center.
import { ProtocolControl } from "./ProtocolControl.sol";

// Royalties
import { IERC2981 } from "@openzeppelin/contracts/interfaces/IERC2981.sol";

import "@openzeppelin/contracts/utils/Multicall.sol";

contract AccessNFT is ERC1155PresetMinterPauserSupplyHolder, ERC2771Context, IERC2981, Multicall {
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

    /// @dev Whether AccessNFTs (where TokenState.isRedeemable == false) are transferable.
    bool public accessNftIsTransferable;

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
        bool isRedeemable;
        uint256 accessNftId;
        UnderlyingType underlyingType;
    }

    /// @dev Emmitted when Access NFTs are created.
    event AccessNFTsCreated(
        address indexed creator,
        uint256[] nftIds,
        string[] nftURIs,
        uint256[] acessNftIds,
        string[] accessNftURIs,
        uint256[] nftSupplies
    );

    /// @dev Emitted when an Access NFT is redeemed.
    event AccessNFTRedeemed(
        address indexed redeemer,
        uint256 indexed nftTokenId,
        uint256 indexed accessNftId,
        uint256 amount
    );

    event RestrictedTransferUpdated(bool transferable);

    /// @dev Emitted when the EIP 2981 royalty of the contract is updated.
    event RoyaltyUpdated(uint256 royaltyBps);

    /// @dev Emitted when the last time to redeem an Access NFT is updated.
    event LastRedeemTimeUpdated(uint256 accessNftId, address creator, uint256 lastTimeToRedeem);

    /// @dev Emitted when the transferability of Access NFTs is changed.
    event AccessTransferabilityUpdated(bool isTransferable);

    /// @dev Emitted when a new Owner is set.
    event NewOwner(address prevOwner, address newOwner);

    /// @dev NFT tokenId => token state.
    mapping(uint256 => TokenState) public tokenState;

    /// @dev Access NFT tokenId => final redemption timestamp.
    mapping(uint256 => uint256) public lastTimeToRedeem;

    /// @dev Checks whether the caller is a module admin.
    modifier onlyModuleAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "AccessNFT: only a module admin can call this function.");
        _;
    }

    /// @dev Checks whether the caller has MINTER_ROLE.
    modifier onlyMinterRole() {
        require(hasRole(MINTER_ROLE, _msgSender()), "AccessNFT: account does not have MINTER_ROLE.");
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
    function owner() public view returns (address) {
        return hasRole(DEFAULT_ADMIN_ROLE, _owner) ? _owner : address(0);
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
        for (uint256 i = 0; i < ids.length; ++i) {
            if (ids[i] >= nextTokenId) {
                revert("NFTCollection: cannot call this fn for creating new NFTs.");
            }

            if (tokenState[ids[i]].underlyingType != UnderlyingType.None) {
                revert("NFTCollection: cannot freely mint more of ERC20 or ERC721.");
            }
        }

        super.mintBatch(to, ids, amounts, data);
    }

    /**
     *      External functions.
     */

    /// @notice Create native ERC 1155 NFTs.
    function createAccessTokens(
        address to,
        string[] calldata _nftURIs,
        string[] calldata _accessNftURIs,
        uint256[] calldata _nftSupplies,
        bytes calldata data
    ) external whenNotPaused onlyMinterRole {
        require(
            _nftURIs.length == _nftSupplies.length && _nftURIs.length == _accessNftURIs.length,
            "AccessNFT: Must specify equal number of config values."
        );
        require(_nftURIs.length > 0, "AccessNFT: Must create at least one NFT.");

        // Get tokenIds.
        uint256[] memory nftIds = new uint256[](_nftURIs.length);
        uint256[] memory accessNftIds = new uint256[](_nftURIs.length);

        uint256 id = nextTokenId;

        // Store NFT state for each NFT.
        for (uint256 i = 0; i < _nftURIs.length; i++) {
            // Store Access NFT tokenId
            accessNftIds[i] = id;

            // Store Access NFT info
            tokenState[id] = TokenState({
                creator: _msgSender(),
                uri: _accessNftURIs[i],
                isRedeemable: false,
                accessNftId: 0,
                underlyingType: UnderlyingType.None
            });

            // Update id
            id += 1;

            // Store NFT tokenId
            nftIds[i] = id;

            // Store NFT info
            tokenState[id] = TokenState({
                creator: _msgSender(),
                uri: _nftURIs[i],
                isRedeemable: true,
                accessNftId: (id - 1),
                underlyingType: UnderlyingType.None
            });

            // Update id
            id += 1;
        }

        nextTokenId = id;

        // Mint Access NFTs (Redeemed) to contract
        _mintBatch(address(this), accessNftIds, _nftSupplies, "");

        // Mint NFTs (Redeemable) to `to`
        _mintBatch(to, nftIds, _nftSupplies, data);

        emit AccessNFTsCreated(_msgSender(), nftIds, _nftURIs, accessNftIds, _accessNftURIs, _nftSupplies);
    }

    /// @dev Lets a redeemable token holder to redeem token.
    function redeemToken(uint256 _tokenId, uint256 _amount) external whenNotPaused {
        // Get redeemer
        address redeemer = _msgSender();

        require(tokenState[_tokenId].isRedeemable, "AccessNFT: This token is not redeemable for access.");
        require(
            balanceOf(redeemer, _tokenId) >= _amount && _amount > 0,
            "AccessNFT: Cannot redeem more NFTs than owned."
        );
        require(
            block.timestamp <= lastTimeToRedeem[_tokenId] || lastTimeToRedeem[_tokenId] == 0,
            "AccessNFT: Window to redeem access has closed."
        );

        // Burn NFTs of the 'unredeemed' state.
        burn(redeemer, _tokenId, _amount);

        // Get access nft Id
        uint256 accessNftId = tokenState[_tokenId].accessNftId;

        // Transfer Access NFTs to redeemer
        this.safeTransferFrom(address(this), redeemer, accessNftId, _amount, "");

        emit AccessNFTRedeemed(redeemer, _tokenId, accessNftId, _amount);
    }

    /**
     *      External: setter functions
     */

    /// @dev Lets an Access NFT creator set a limit for when the reward can be redeemed.
    function setLastTimeToRedeem(uint256 _tokenId, uint256 _secondsUntilRedeem) external {
        require(_msgSender() == tokenState[_tokenId].creator, "AccessNFT: only the creator can call this function.");
        require(tokenState[_tokenId].isRedeemable, "AccessNFT: can set redeem time for only redeemable NFTs.");

        uint256 lastTimeToRedeemNFT = _secondsUntilRedeem == 0
            ? type(uint256).max
            : block.timestamp + _secondsUntilRedeem;
        lastTimeToRedeem[_tokenId] = lastTimeToRedeemNFT;

        emit LastRedeemTimeUpdated(_tokenId, _msgSender(), lastTimeToRedeemNFT);
    }

    /// @dev Lets the protocol admin set the transferability of Access NFTs.
    function setAccessNftTransferability(bool _isTransferable) external onlyModuleAdmin {
        accessNftIsTransferable = _isTransferable;

        emit AccessTransferabilityUpdated(_isTransferable);
    }

    /// @dev Lets a protocol admin update the royalties paid on pack sales.
    function setRoyaltyBps(uint256 _royaltyBps) public onlyModuleAdmin {
        require(_royaltyBps <= MAX_BPS, "NFT: Bps provided must be less than 10,000");

        royaltyBps = _royaltyBps;

        emit RoyaltyUpdated(_royaltyBps);
    }

    /// @dev Lets a protocol admin restrict token transfers.
    function setRestrictedTransfer(bool _restrictedTransfer) external onlyModuleAdmin {
        transfersRestricted = _restrictedTransfer;

        emit RestrictedTransferUpdated(_restrictedTransfer);
    }

    /// @dev Lets a module admin set a new owner for the contract. The new owner must be a module admin.
    function setOwner(address _newOwner) external onlyModuleAdmin {
        require(hasRole(DEFAULT_ADMIN_ROLE, _newOwner), "new owner not module admin.");
        address _prevOwner = _owner;
        _owner = _newOwner;

        emit NewOwner(_prevOwner, _newOwner);
    }

    /// @dev Sets contract URI for the storefront-level metadata of the contract.
    function setContractURI(string calldata _uri) external onlyModuleAdmin {
        _contractURI = _uri;
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

        // if transfer is restricted on the contract, we still want to allow burning and minting
        if (transfersRestricted && from != address(0) && to != address(0)) {
            require(
                hasRole(TRANSFER_ROLE, from) || hasRole(TRANSFER_ROLE, to),
                "AccessNFT: Transfers are restricted to TRANSFER_ROLE holders"
            );
        }

        for (uint256 i = 0; i < ids.length; i++) {
            if (!tokenState[ids[i]].isRedeemable && !accessNftIsTransferable) {
                require(
                    from == address(0) || from == address(this),
                    "AccessNFT: cannot transfer an access NFT that is redeemed"
                );
            }
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

    /// @dev See EIP 165
    function supportsInterface(bytes4 interfaceId)
        public
        view
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

    /// @dev Returns whether a token represent is redeemable.
    function isRedeemable(uint256 _nftId) public view returns (bool) {
        return tokenState[_nftId].isRedeemable;
    }

    /// @dev Returns the URI for the storefront-level metadata of the contract.
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }
}
