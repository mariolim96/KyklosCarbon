// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.18;

interface IKyklosTokenFactory {
    // function bridgeFeeReceiverAddress() external view returns (address receiver);

    // function bridgeFeeBurnAddress() external view returns (address burner);

    // function getBridgeFeeAndBurnAmount(uint256 quantity) external view returns (uint256 feeAmount, uint256 burnAmount);

    function increaseTotalRetired(uint256 amount) external;

    // function allowedBridges(address user) external view returns (bool);

    // function owner() external view returns (address);
    function getProjectVintageToErc20(uint256 projectVintageTokenId) external view returns (address);

    function createToken(uint256 _vintageTokenId) external returns (address);
}
