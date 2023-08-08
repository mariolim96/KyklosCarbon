// SPDX-License-Identifier: unlicensed
pragma solidity 0.8.18;

interface IRegistry {
    function setCarbonProjectAddress(address _address) external;

    function getCarbonProjectAddress() external view returns (address);

    function setCarbonProjectVintagesAddress(address _address) external;

    function getCarbonProjectVintagesAddress() external view returns (address);

    function setKyklosTokenAddress(address _address) external;

    function getKyklosTokenAddress() external view returns (address);

    function setKyklosTokenFactoryAddress(address _address) external;

    function getKyklosTokenFactoryAddress() external view returns (address);

    function setRetirementCertificatesAddress(address _address) external;

    function getRetirementCertificatesAddress() external view returns (address);

    function setProjectVintageERC20Registry(address _address, bool _bool) external;

    function getProjectVintageERC20Registry(address _address) external view returns (bool);
}
