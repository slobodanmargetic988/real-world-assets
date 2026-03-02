// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "../../protocol/state/State.sol";

interface IInfo {
    function isResident(address addr) external view returns (bool);
    function addressToResident(address addr) external view returns(uint);
    function residentToAddress(uint id) external view returns(address);
    function bids(uint tokenId, uint idx) external view returns(IState.Bid memory);
    function bidsLength(uint tokenId) external view returns(uint);
    function bidActionable(uint tokenId, uint idx) external view returns(bool);
    function unpaidPrincipal(uint tokenId) external view returns(uint);
    function accruedInterest(uint tokenId) external view returns(uint);
    function status(uint tokenId) external view returns(IState.Status);
    function maxLtv() external view returns(UD60x18);
    function maxLoanMonths() external view returns(uint);
}
