// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";

contract MockERC1155 is ERC1155PresetMinterPauser {
    constructor() ERC1155PresetMinterPauser("ipfs://BaseURI") {}
}
