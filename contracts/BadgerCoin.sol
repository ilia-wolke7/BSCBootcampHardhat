// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BadgerCoin is ERC20 {
    address payable public owner;
     function increaseTotalSupply(uint256 amount) public{
        require(msg.sender==owner);
        _mint(owner, amount);
     }
    constructor() ERC20("BadgerCoin", "BC") {
        owner = payable(msg.sender);
        _mint(owner, 1000000*(10**decimals()));
    }
}