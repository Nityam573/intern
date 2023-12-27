// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentContract {
    address public owner;
    address payable public ethWallet;

    event PaymentReceived(address indexed buyer, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address payable _ethWallet) {
        owner = msg.sender;
        ethWallet = _ethWallet;
    }

    function pay() external payable {
        require(msg.value > 0, "Invalid payment amount");

        uint256 amountToDeduct = msg.value;
        (bool success, ) = msg.sender.call{value: amountToDeduct}("");
        require(success, "Payment failed");

        // Transfer the deducted amount to the contract owner's wallet
        ethWallet.transfer(amountToDeduct);

        emit PaymentReceived(msg.sender, amountToDeduct);
    }

    // Function to withdraw funds from the contract by the owner
    function withdraw() external onlyOwner {
        // Transfer the contract balance to the owner
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No balance to withdraw");
        ethWallet.transfer(contractBalance);
    }
}
