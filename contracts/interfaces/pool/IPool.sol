// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import { UD60x18 } from "@prb/math/src/UD60x18.sol";

interface IPool {
    event Deposit(address indexed user, uint underlying, uint shares);
    event Withdraw(address indexed user, uint underlying, uint shares);

    function deposit(uint underlying) external;
    function withdraw(uint underlying) external;
    function utilization() external view returns(UD60x18);
    function underlyingToShares(uint underlying) external view returns(uint shares);
    function updateUserEligible(address user, bool eligible) external;
    function availableLiquidity() external view returns(uint);
    function payDebt(address user, uint repayment, uint interest) external;
    function executeSettlement(
        address seller,
        uint sellerRepayment,
        uint sellerInterest,
        uint buyerPrincipal,
        uint buyerDownPayment
    ) external;
}
