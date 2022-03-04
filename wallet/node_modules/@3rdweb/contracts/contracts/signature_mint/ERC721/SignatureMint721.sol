// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

// Interface
import { ISignatureMint721 } from "./ISignatureMint721.sol";

// Token
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

// Protocol control center.
import { ProtocolControl } from "../../ProtocolControl.sol";

// Signature utils
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

// Access Control + security
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Royalties
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

// Meta transactions
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

// Utils
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";

// Helper interfaces
import { IWETH } from "../../interfaces/IWETH.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SignatureMint721 is
    ISignatureMint721,
    ERC721Enumerable,
    EIP712,
    AccessControlEnumerable,
    ERC2771Context,
    IERC2981,
    ReentrancyGuard,
    Multicall
{
    using ECDSA for bytes32;
    using Strings for uint256;

    bytes32 private constant TYPEHASH =
        keccak256(
            "MintRequest(address to,string uri,uint256 price,address currency,uint128 validityStartTimestamp,uint128 validityEndTimestamp,bytes32 uid)"
        );

    /// @dev Only TRANSFER_ROLE holders can have tokens transferred from or to them, during restricted transfers.
    bytes32 public constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");
    /// @dev Only MINTER_ROLE holders can sign off on `MintRequest`s.
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// @dev The address interpreted as native token of the chain.
    address private constant NATIVE_TOKEN = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    /// @dev The address of the native token wrapper contract.
    address public immutable nativeTokenWrapper;

    /// @dev Owner of the contract (purpose: OpenSea compatibility, etc.)
    address private _owner;

    /// @dev The adress that receives all primary sales value.
    address public defaultSaleRecipient;

    /// @dev The token ID of the next token to mint.
    uint256 public nextTokenIdToMint;

    /// @dev Contract interprets 10_000 as 100%.
    uint64 private constant MAX_BPS = 10_000;

    /// @dev The % of secondary sales collected as royalties. See EIP 2981.
    uint64 public royaltyBps;

    /// @dev The % of primary sales collected by the contract as fees.
    uint120 public feeBps;

    /// @dev Whether transfers on tokens are restricted.
    bool public transfersRestricted;

    /// @dev Contract level metadata.
    string public contractURI;

    /// @dev The protocol control center.
    ProtocolControl internal controlCenter;

    /// @dev Mapping from mint request UID => whether the mint request is processed.
    mapping(bytes32 => bool) private minted;

    mapping(uint256 => string) private uri;

    /// @dev Checks whether the caller is a module admin.
    modifier onlyModuleAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "not module admin.");
        _;
    }

    /// @dev Checks whether the caller has MINTER_ROLE.
    modifier onlyMinter() {
        require(hasRole(MINTER_ROLE, _msgSender()), "not minter.");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _contractURI,
        address payable _controlCenter,
        address _trustedForwarder,
        address _nativeTokenWrapper,
        address _saleRecipient,
        uint128 _royaltyBps,
        uint128 _feeBps
    ) ERC721(_name, _symbol) EIP712("SignatureMint721", "1") ERC2771Context(_trustedForwarder) {
        // Set the protocol control center
        controlCenter = ProtocolControl(_controlCenter);
        nativeTokenWrapper = _nativeTokenWrapper;
        defaultSaleRecipient = _saleRecipient;
        contractURI = _contractURI;
        royaltyBps = uint64(_royaltyBps);
        feeBps = uint120(_feeBps);

        address deployer = _msgSender();
        _owner = deployer;
        _setupRole(DEFAULT_ADMIN_ROLE, deployer);
        _setupRole(MINTER_ROLE, deployer);
        _setupRole(TRANSFER_ROLE, deployer);
    }

    ///     =====   Public functions  =====

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return hasRole(DEFAULT_ADMIN_ROLE, _owner) ? _owner : address(0);
    }

    /// @dev Verifies that a mint request is signed by an account holding MINTER_ROLE (at the time of the function call).
    function verify(MintRequest calldata _req, bytes calldata _signature) public view returns (bool, address) {
        address signer = recoverAddress(_req, _signature);
        return (!minted[_req.uid] && hasRole(MINTER_ROLE, signer), signer);
    }

    /// @dev Returns the URI for a tokenId
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return uri[_tokenId];
    }

    /// @dev Lets an account with MINTER_ROLE mint an NFT.
    function mintTo(address _to, string calldata _uri) external onlyMinter returns (uint256) {
        // `_mintTo` is re-used. `mintTo` just adds a minter role check.
        return _mintTo(_to, _uri);
    }

    ///     =====   External functions  =====

    /// @dev Mints an NFT according to the provided mint request.
    function mintWithSignature(MintRequest calldata _req, bytes calldata _signature)
        external
        payable
        nonReentrant
        returns (uint256 tokenIdMinted)
    {
        address signer = verifyRequest(_req, _signature);
        address receiver = _req.to == address(0) ? _msgSender() : _req.to;

        tokenIdMinted = _mintTo(receiver, _req.uri);

        collectPrice(_req);

        emit MintWithSignature(signer, receiver, tokenIdMinted, _req);
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

    //      =====   Setter functions  =====

    /// @dev Lets a module admin set the default recipient of all primary sales.
    function setDefaultSaleRecipient(address _saleRecipient) external onlyModuleAdmin {
        defaultSaleRecipient = _saleRecipient;
        emit NewSaleRecipient(_saleRecipient);
    }

    /// @dev Lets a module admin update the royalties paid on secondary token sales.
    function setRoyaltyBps(uint256 _royaltyBps) public onlyModuleAdmin {
        require(_royaltyBps <= MAX_BPS, "bps <= 10000.");

        royaltyBps = uint64(_royaltyBps);

        emit RoyaltyUpdated(_royaltyBps);
    }

    /// @dev Lets a module admin update the fees on primary sales.
    function setFeeBps(uint256 _feeBps) public onlyModuleAdmin {
        require(_feeBps <= MAX_BPS, "bps <= 10000.");

        feeBps = uint120(_feeBps);

        emit PrimarySalesFeeUpdates(_feeBps);
    }

    /// @dev Lets a module admin restrict token transfers.
    function setRestrictedTransfer(bool _restrictedTransfer) external onlyModuleAdmin {
        transfersRestricted = _restrictedTransfer;

        emit TransfersRestricted(_restrictedTransfer);
    }

    /// @dev Lets a module admin set a new owner for the contract. The new owner must be a module admin.
    function setOwner(address _newOwner) external onlyModuleAdmin {
        require(hasRole(DEFAULT_ADMIN_ROLE, _newOwner), "new owner not module admin.");
        address _prevOwner = _owner;
        _owner = _newOwner;

        emit NewOwner(_prevOwner, _newOwner);
    }

    /// @dev Lets a module admin set the URI for contract-level metadata.
    function setContractURI(string calldata _uri) external onlyModuleAdmin {
        contractURI = _uri;
    }

    ///     =====   Internal functions  =====

    /// @dev Mints an NFT to `to`
    function _mintTo(address _to, string calldata _uri) internal returns (uint256 tokenIdToMint) {
        tokenIdToMint = nextTokenIdToMint;
        nextTokenIdToMint += 1;

        uri[tokenIdToMint] = _uri;

        _mint(_to, tokenIdToMint);

        emit TokenMinted(_to, tokenIdToMint, _uri);
    }

    /// @dev Returns the address of the signer of the mint request.
    function recoverAddress(MintRequest calldata _req, bytes calldata _signature) internal view returns (address) {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        TYPEHASH,
                        _req.to,
                        keccak256(bytes(_req.uri)),
                        _req.price,
                        _req.currency,
                        _req.validityStartTimestamp,
                        _req.validityEndTimestamp,
                        _req.uid
                    )
                )
            ).recover(_signature);
    }

    /// @dev Verifies that a mint request is valid.
    function verifyRequest(MintRequest calldata _req, bytes calldata _signature) internal returns (address) {
        (bool success, address signer) = verify(_req, _signature);
        require(success, "invalid signature");

        require(
            _req.validityStartTimestamp <= block.timestamp && _req.validityEndTimestamp >= block.timestamp,
            "request expired"
        );

        minted[_req.uid] = true;

        return signer;
    }

    /// @dev Collects and distributes the primary sale value of tokens being claimed.
    function collectPrice(MintRequest memory _req) internal {
        if (_req.price == 0) {
            return;
        }

        uint256 fees = (_req.price * feeBps) / MAX_BPS;

        if (_req.currency == NATIVE_TOKEN) {
            require(msg.value == _req.price, "must send total price.");
        }

        transferCurrency(_req.currency, _msgSender(), controlCenter.getRoyaltyTreasury(address(this)), fees);

        transferCurrency(_req.currency, _msgSender(), defaultSaleRecipient, _req.price - fees);
    }

    /// @dev Transfers a given amount of currency.
    function transferCurrency(
        address _currency,
        address _from,
        address _to,
        uint256 _amount
    ) internal {
        if (_amount == 0) {
            return;
        }

        if (_currency == NATIVE_TOKEN) {
            if (_from == address(this)) {
                IWETH(nativeTokenWrapper).withdraw(_amount);
                safeTransferNativeToken(_to, _amount);
            } else if (_to == address(this)) {
                require(_amount == msg.value, "native token value does not match bid amount.");
                IWETH(nativeTokenWrapper).deposit{ value: _amount }();
            } else {
                safeTransferNativeToken(_to, _amount);
            }
        } else {
            safeTransferERC20(_currency, _from, _to, _amount);
        }
    }

    /// @dev Transfers `amount` of native token to `to`.
    function safeTransferNativeToken(address to, uint256 value) internal {
        (bool success, ) = to.call{ value: value }("");
        if (!success) {
            IWETH(nativeTokenWrapper).deposit{ value: value }();
            safeTransferERC20(nativeTokenWrapper, address(this), to, value);
        }
    }

    /// @dev Transfer `amount` of ERC20 token from `from` to `to`.
    function safeTransferERC20(
        address _currency,
        address _from,
        address _to,
        uint256 _amount
    ) internal {
        if (_from == _to) {
            return;
        }
        uint256 balBefore = IERC20(_currency).balanceOf(_to);
        bool success = _from == address(this)
            ? IERC20(_currency).transfer(_to, _amount)
            : IERC20(_currency).transferFrom(_from, _to, _amount);
        uint256 balAfter = IERC20(_currency).balanceOf(_to);

        require(success && balAfter == balBefore + _amount, "failed to transfer currency.");
    }

    ///     =====   Low-level overrides  =====

    /// @dev Burns `tokenId`. See {ERC721-_burn}.
    function burn(uint256 tokenId) public virtual {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(tokenId);
    }

    /// @dev See {ERC721-_beforeTokenTransfer}.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);

        // if transfer is restricted on the contract, we still want to allow burning and minting
        if (transfersRestricted && from != address(0) && to != address(0)) {
            require(hasRole(TRANSFER_ROLE, from) || hasRole(TRANSFER_ROLE, to), "restricted to TRANSFER_ROLE holders");
        }
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerable, ERC721Enumerable, IERC165)
        returns (bool)
    {
        return super.supportsInterface(interfaceId) || interfaceId == type(IERC2981).interfaceId;
    }

    function _msgSender() internal view virtual override(Context, ERC2771Context) returns (address sender) {
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view virtual override(Context, ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }
}
