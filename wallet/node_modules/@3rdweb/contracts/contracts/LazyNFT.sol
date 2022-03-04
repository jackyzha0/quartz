// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

// Token + Access Control
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";
import "@openzeppelin/contracts/utils/Address.sol";

// Protocol control center.
import { ProtocolControl } from "./ProtocolControl.sol";

// Royalties
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

// Meta transactions
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LazyNFT is
    AccessControlEnumerable,
    ERC721Enumerable,
    ERC721Burnable,
    ERC721Pausable,
    ERC2771Context,
    IERC2981,
    ReentrancyGuard,
    Multicall
{
    using Counters for Counters.Counter;
    using Strings for uint256;

    uint128 private constant MAX_BPS = 10_000;

    /// @dev Only TRANSFER_ROLE holders can have tokens transferred from or to them, during restricted transfers.
    bytes32 public constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// @dev Owner of the contract (purpose: OpenSea compatibility, etc.)
    address private _owner;

    uint256 public maxTotalSupply;

    /// @dev The token id of the NFT to "lazy mint".
    uint256 public nextTokenId;

    /// @dev The token Id of the NFT to mint.
    uint256 public nextMintTokenId;

    // public minting
    struct PublicMintCondition {
        uint256 startTimestamp;
        uint256 maxMintSupply;
        uint256 currentMintSupply;
        uint256 quantityLimitPerTransaction;
        uint256 waitTimeSecondsLimitPerTransaction;
        bytes32 merkleRoot;
        uint256 pricePerToken;
        address currency;
    }

    PublicMintCondition[] public mintConditions;

    // used for keeping track of when a wallet can claim again depending on
    // PublicMintCondition.waitTimeSecondsLimitPerTransaction
    //
    // msg.sender address => (current condition index + mintTimestampStartIndex) => timestamp
    mapping(address => mapping(uint256 => uint256)) public nextMintTimestampByCondition;

    // used for nextMintTimestampByCondition that's incremented when mintConditions is set
    // so that when mint conditions is reset, the next mint timestamp is reset too
    uint256 nextMintTimestampConditionStartIndex;

    /// @dev Pack sale royalties -- see EIP 2981
    uint256 public royaltyBps;

    uint256 public feeBps;

    /// @dev Whether transfers on tokens are restricted.
    bool public transfersRestricted;

    /// @dev The protocol control center.
    ProtocolControl internal controlCenter;

    address public saleRecipient;

    /// @dev Collection level metadata.
    string private _contractURI;

    string private _baseTokenURI;

    /// @dev Mapping from tokenId => URI
    mapping(uint256 => string) private uri;

    /// @dev Emitted when an NFT is minted;
    event Claimed(address indexed to, uint256 startTokenId, uint256 quantity, uint256 mintConditionIndex);
    event PublicMintConditionUpdated(PublicMintCondition[] mintConditions);
    event FundsWithdrawn(address indexed to, uint256 amount);
    event TotalSupplyUpdated(uint256 supply);
    event BaseTokenURIUpdated(string uri);
    event RestrictedTransferUpdated(bool transferable);
    event RoyaltyUpdated(uint256 royaltyBps);
    event FeeUpdated(uint256 feeBps);
    event NewOwner(address prevOwner, address newOwner);

    modifier onlyModuleAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "only module admin");
        _;
    }

    constructor(
        address payable _controlCenter,
        string memory _name,
        string memory _symbol,
        address _trustedForwarder,
        string memory _contractUri,
        string memory _baseTokenUri,
        uint256 _maxSupply,
        uint256 _royaltyBps,
        uint256 _feeBps,
        address _saleRecipient
    ) ERC721(_name, _symbol) ERC2771Context(_trustedForwarder) {
        // Set the protocol control center
        controlCenter = ProtocolControl(_controlCenter);

        // Set contract URI
        _contractURI = _contractUri;
        _baseTokenURI = _baseTokenUri;

        maxTotalSupply = _maxSupply;
        saleRecipient = _saleRecipient;

        // Grant ownership and setup roles
        _owner = _msgSender();
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(TRANSFER_ROLE, _msgSender());

        setFeeBps(_feeBps);
        setRoyaltyBps(_royaltyBps);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return hasRole(DEFAULT_ADMIN_ROLE, _owner) ? _owner : address(0);
    }

    function lazyMintBatch(string[] calldata _uris) external {
        require(hasRole(MINTER_ROLE, _msgSender()), "only minter");
        require((nextTokenId + _uris.length) <= maxTotalSupply, "exceed maxTotalSupply");
        uint256 id = nextTokenId;
        for (uint256 i = 0; i < _uris.length; i++) {
            uri[id] = _uris[i];
            id += 1;
        }
        nextTokenId = id;
    }

    function lazyMintAmount(uint256 amount) external {
        require(hasRole(MINTER_ROLE, _msgSender()), "only minter");
        require((nextTokenId + amount) <= maxTotalSupply, "exceed maxTotalSupply");
        nextTokenId += amount;
    }

    function claim(uint256 quantity, bytes32[] calldata proofs) external payable nonReentrant {
        uint256 conditionIndex = getLastStartedMintConditionIndex();
        PublicMintCondition memory currentMintCondition = mintConditions[conditionIndex];

        require(quantity > 0, "need quantity");
        require(nextMintTokenId + quantity <= maxTotalSupply, "exceed max supply limit");
        require(nextMintTokenId + quantity <= nextTokenId, "cannot claim unminted token");
        require(quantity <= currentMintCondition.quantityLimitPerTransaction, "exceed tx limit");
        require(
            currentMintCondition.currentMintSupply + quantity <= currentMintCondition.maxMintSupply,
            "exceed max mint supply"
        );

        uint256 nextMintTimestampConditionIndex = conditionIndex + nextMintTimestampConditionStartIndex;
        uint256 nextMintTimestamp = nextMintTimestampByCondition[_msgSender()][nextMintTimestampConditionIndex];
        require(nextMintTimestamp == 0 || block.timestamp >= nextMintTimestamp, "cannot mint yet");

        if (currentMintCondition.merkleRoot != bytes32(0)) {
            bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
            require(MerkleProof.verify(proofs, currentMintCondition.merkleRoot, leaf), "invalid proofs");
        }

        mintConditions[conditionIndex].currentMintSupply += quantity;

        uint256 newNextMintTimestamp = currentMintCondition.waitTimeSecondsLimitPerTransaction;
        // if next mint timestamp overflow, cap it to max uint256
        unchecked {
            newNextMintTimestamp += block.timestamp;
            if (newNextMintTimestamp < currentMintCondition.waitTimeSecondsLimitPerTransaction) {
                newNextMintTimestamp = type(uint256).max;
            }
        }

        nextMintTimestampByCondition[_msgSender()][nextMintTimestampConditionIndex] = newNextMintTimestamp;

        if (currentMintCondition.pricePerToken > 0) {
            uint256 totalPrice = quantity * currentMintCondition.pricePerToken;
            uint256 feeCut = (totalPrice * feeBps) / MAX_BPS;
            uint256 salePrice = totalPrice - feeCut;
            _transferPaymentWithFee(currentMintCondition.currency, salePrice, feeCut);
        }

        uint256 startMintTokenId = nextMintTokenId;
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(_msgSender(), nextMintTokenId);
            nextMintTokenId += 1;
        }

        emit Claimed(_msgSender(), startMintTokenId, quantity, conditionIndex);
    }

    function _transferPaymentWithFee(
        address currency,
        uint256 saleRecipientAmount,
        uint256 feeAmount
    ) private {
        address payable recipient = payable(saleRecipient);
        address payable feeRecipient = payable(controlCenter.getRoyaltyTreasury(address(this)));

        if (currency == address(0)) {
            require(msg.value == saleRecipientAmount + feeAmount, "value != amount");

            Address.sendValue(recipient, saleRecipientAmount);

            if (feeAmount > 0) {
                Address.sendValue(feeRecipient, feeAmount);
            }
        } else {
            require(
                IERC20(currency).transferFrom(_msgSender(), recipient, saleRecipientAmount),
                "failed to transfer payment"
            );

            if (feeAmount > 0) {
                require(IERC20(currency).transferFrom(_msgSender(), feeRecipient, feeAmount), "failed to transfer fee");
            }
        }
    }

    function setPublicMintConditions(PublicMintCondition[] calldata conditions) external onlyModuleAdmin {
        if (mintConditions.length > 0) {
            // when mint conditions is reset, the next mint timestamp is reset too
            nextMintTimestampConditionStartIndex += mintConditions.length;
            delete mintConditions;
        }

        // make sure the conditions are sorted in ascending order
        uint256 lastConditionStartTimestamp = 0;
        for (uint256 i = 0; i < conditions.length; i++) {
            // the input of startTimestamp is the number of seconds from now.
            if (lastConditionStartTimestamp != 0) {
                require(
                    lastConditionStartTimestamp < conditions[i].startTimestamp,
                    "startTimestamp must be in ascending order"
                );
            }
            require(conditions[i].maxMintSupply > 0, "max mint supply cannot be 0");
            require(conditions[i].quantityLimitPerTransaction > 0, "quantity limit cannot be 0");

            mintConditions.push(
                PublicMintCondition({
                    startTimestamp: block.timestamp + conditions[i].startTimestamp,
                    maxMintSupply: conditions[i].maxMintSupply,
                    currentMintSupply: 0,
                    quantityLimitPerTransaction: conditions[i].quantityLimitPerTransaction,
                    waitTimeSecondsLimitPerTransaction: conditions[i].waitTimeSecondsLimitPerTransaction,
                    pricePerToken: conditions[i].pricePerToken,
                    currency: conditions[i].currency,
                    merkleRoot: conditions[i].merkleRoot
                })
            );

            lastConditionStartTimestamp = conditions[i].startTimestamp;
        }

        emit PublicMintConditionUpdated(mintConditions);
    }

    function setSaleRecipient(address _saleRecipient) external onlyModuleAdmin {
        saleRecipient = _saleRecipient;
    }

    function setMaxTotalSupply(uint256 maxSupply) external onlyModuleAdmin {
        maxTotalSupply = maxSupply;

        emit TotalSupplyUpdated(maxSupply);
    }

    function setBaseTokenURI(string calldata _uri) external onlyModuleAdmin {
        _baseTokenURI = _uri;

        emit BaseTokenURIUpdated(_uri);
    }

    function setFeeBps(uint256 _feeBps) public onlyModuleAdmin {
        require(_feeBps <= MAX_BPS, "bps <= 10000");

        feeBps = _feeBps;

        emit FeeUpdated(_feeBps);
    }

    /// @dev Lets a protocol admin update the royalties paid on pack sales.
    function setRoyaltyBps(uint256 _royaltyBps) public onlyModuleAdmin {
        require(_royaltyBps <= MAX_BPS, "bps <= 10000");

        royaltyBps = _royaltyBps;

        emit RoyaltyUpdated(_royaltyBps);
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
    ) internal virtual override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);

        // if transfer is restricted on the contract, we still want to allow burning and minting
        if (transfersRestricted && from != address(0) && to != address(0)) {
            require(hasRole(TRANSFER_ROLE, from) || hasRole(TRANSFER_ROLE, to), "restricted to TRANSFER_ROLE holders");
        }
    }

    /// @dev get the current active mint condition sorted by last added first
    /// assumption: the conditions are sorted ascending order by condition start timestamp. check on insertion.
    /// @return conition index, condition
    function getLastStartedMintConditionIndex() public view returns (uint256) {
        require(mintConditions.length > 0, "no public mint condition");
        for (uint256 i = mintConditions.length; i > 0; i--) {
            if (block.timestamp >= mintConditions[i - 1].startTimestamp) {
                return i - 1;
            }
        }
        revert("no active mint condition");
    }

    function getMintConditionCount() external view returns (uint256) {
        return mintConditions.length;
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

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerable, ERC721, ERC721Enumerable, IERC165)
        returns (bool)
    {
        return super.supportsInterface(interfaceId) || interfaceId == type(IERC2981).interfaceId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory baseURI = _baseURI();
        if (bytes(uri[tokenId]).length > 0) {
            return uri[tokenId];
        }
        if (bytes(baseURI).length > 0) {
            return string(abi.encodePacked(baseURI, tokenId.toString()));
        }
        return "";
    }

    /// @dev Returns the URI for the storefront-level metadata of the contract.
    function contractURI() external view returns (string memory) {
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

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }
}
