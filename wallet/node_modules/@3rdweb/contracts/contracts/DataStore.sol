// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

import { ProtocolControl } from "./ProtocolControl.sol";

contract DataStore is Context, Multicall, AccessControlEnumerable, ERC2771Context {
    bytes32 public constant EDITOR_ROLE = keccak256("EDITOR_ROLE");

    string private _contractURI;
    ProtocolControl private _controlCenter;

    mapping(uint256 => uint256) private _data;

    modifier onlyModuleAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "only module admin role");
        _;
    }

    constructor(
        address payable _controlCenterAddress,
        address _trustedForwarder,
        string memory _uri
    ) ERC2771Context(_trustedForwarder) {
        _controlCenter = ProtocolControl(_controlCenterAddress);
        _contractURI = _uri;
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(EDITOR_ROLE, _msgSender());
    }

    function getUint(uint256 _key) external view returns (uint256 value) {
        value = _data[_key];
    }

    function setUint(uint256 _key, uint256 _value) external onlyRole(EDITOR_ROLE) {
        _data[_key] = _value;
    }

    /// @dev See ERC2771
    function _msgSender() internal view virtual override(Context, ERC2771Context) returns (address sender) {
        return ERC2771Context._msgSender();
    }

    /// @dev See ERC2771
    function _msgData() internal view virtual override(Context, ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }

    /// @dev Sets contract URI for the contract-level metadata of the contract.
    function setContractURI(string calldata _URI) external onlyModuleAdmin {
        _contractURI = _URI;
    }

    /// @dev Returns the URI for the contract-level metadata of the contract.
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }
}
