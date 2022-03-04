// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "../Royalty.sol";

contract MockRoyaltyReentrantDistribute {
    Royalty private royalty;

    constructor() {}

    function set(address payable _royalty) external {
        royalty = Royalty(_royalty);
    }

    receive() external payable {
        royalty.distribute();
    }
}
