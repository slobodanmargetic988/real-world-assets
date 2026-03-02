// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

interface IAuctions {
    function bid(uint tokenId, uint propertyValue, uint downPayment, uint loanMonths) external returns (uint newBidIdx);
    function cancelBid(uint tokenId, uint idx) external;
    function acceptBid(uint tokenId, uint idx) external;
}
