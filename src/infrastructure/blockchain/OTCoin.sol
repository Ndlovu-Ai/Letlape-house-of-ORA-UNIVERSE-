// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OTCoin {
    string public name = "OT Coin";
    string public symbol = "OTC";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) private balances;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
        balances[msg.sender] = _initialSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }
}