// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract MintableERC20Permit is ERC20PresetMinterPauser, ERC20Permit {
    constructor() ERC20PresetMinterPauser("USD Coin", "USDC") ERC20Permit("USD Coin") {}

    function mint(address to, uint256 amount) public override(ERC20PresetMinterPauser) {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20PresetMinterPauser, ERC20) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
