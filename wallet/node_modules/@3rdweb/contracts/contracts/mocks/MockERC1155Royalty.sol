// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";

// Royalties
import { IERC2981 } from "@openzeppelin/contracts/interfaces/IERC2981.sol";

// Protocol control center.
import { ProtocolControl } from "../ProtocolControl.sol";

contract MockERC1155Royalty is ERC1155PresetMinterPauser, IERC2981 {
    /// @dev The protocol control center.
    ProtocolControl internal controlCenter;

    /// @dev NFT sale royalties -- see EIP 2981
    uint256 public royaltyBps;

    /// @dev Emitted when the EIP 2981 royalty of the contract is updated.
    event RoyaltyUpdated(uint256 royaltyBps);

    constructor(address payable _controlCenter) ERC1155PresetMinterPauser("ipfs://BaseURI") {
        controlCenter = ProtocolControl(_controlCenter);
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
        royaltyAmount = (salePrice * royaltyBps) / controlCenter.MAX_BPS();
    }

    /// @dev Lets a protocol admin update the royalties paid on pack sales.
    function setRoyaltyBps(uint256 _royaltyBps) public {
        require(_royaltyBps < controlCenter.MAX_BPS(), "NFT: Bps provided must be less than 10,000");

        royaltyBps = _royaltyBps;

        emit RoyaltyUpdated(_royaltyBps);
    }
}
