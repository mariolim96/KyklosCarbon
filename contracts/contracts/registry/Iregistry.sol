// SPDX-License-Identifier: unlicensed
pragma solidity 0.8.18;

interface IRegistry {
    function setCarbonProjectAddress(address _address) external;

    function getCarbonProjectAddress() external view returns (address);

    function setCarbonProjectVintagesAddress(address _address) external;

    function getCarbonProjectVintagesAddress() external view returns (address);

    // function setCarbonOffsetBatchesAddress(address _address) external;
    // function getCarbonOffsetBatchesAddress() external view returns (address);

    // function setCarbonProjectsAddress(address _address) external;
    // function getCarbonProjectsAddress() external view returns (address);

    // function setCarbonProjectVintagesAddress(address _address) external;
    // function getCarbonProjectVintagesAddress() external view returns (address);

    // function setToucanCarbonOffsetsFactoryAddress(address _address) external;
    // function getToucanCarbonOffsetsFactoryAddress() external view returns (address);

    // function setCarbonOffsetBadgesAddress(address _address) external;
    // function getCarbonOffsetBadgesAddress() external view returns (address);
}
