// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

// Base
import "../openzeppelin-presets/finance/PaymentSplitter.sol";

// Meta transactions
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

import { ProtocolControl } from "../ProtocolControl.sol";

/**
 * Royalty automatically adds protocol provider (the registry) of protocol control to the payees
 * and shares that represent the fees.
 */
contract MockRoyaltyNoFees is PaymentSplitter, ERC2771Context {
    /// @dev The protocol control center.
    ProtocolControl private controlCenter;

    /// @dev Contract level metadata.
    string private _contractURI;

    /// @dev Checks whether the protocol is paused.
    modifier onlyProtocolAdmin() {
        require(
            controlCenter.hasRole(controlCenter.DEFAULT_ADMIN_ROLE(), _msgSender()),
            "Royalty: only a protocol admin can call this function."
        );
        _;
    }

    /// @dev shares_ are scaled by 10,000 to prevent precision loss when including fees
    constructor(
        address payable _controlCenter,
        address _trustedForwarder,
        string memory _uri,
        address[] memory payees,
        uint256[] memory shares_
    ) PaymentSplitter() ERC2771Context(_trustedForwarder) {
        require(payees.length == shares_.length, "Royalty: unequal number of payees and shares provided.");
        require(payees.length > 0, "Royalty: no payees provided.");

        // Set contract metadata
        _contractURI = _uri;
        // Set the protocol's control center.
        controlCenter = ProtocolControl(_controlCenter);

        // Scaling the share, so we don't lose precision on division
        for (uint256 i = 0; i < payees.length; i++) {
            uint256 scaledShares = shares_[i] * 10000;
            // WARNING: Do not call _addPayee outside of this constructor.
            _addPayee(payees[i], scaledShares);
        }
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
    function setContractURI(string calldata _URI) external onlyProtocolAdmin {
        _contractURI = _URI;
    }

    /// @dev Returns the URI for the contract-level metadata of the contract.
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }
}
