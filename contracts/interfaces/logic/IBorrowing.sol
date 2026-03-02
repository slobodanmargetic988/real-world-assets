// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "../state/IState.sol";

interface IBorrowing {
    event StartLoan(UD60x18 ratePerSecond, UD60x18 paymentPerSecond, uint principal, uint maxDurationMonths, uint startTime);
    event PayLoan(address indexed payer, uint indexed tokenId, uint payment, uint interest, uint repayment, uint timestamp, bool closed);

    function payMortgage(uint tokenId, uint payment) external;
    function foreclose(uint tokenId) external;
    function debtTransfer(uint tokenId, IState.Bid memory _bid) external;
}
