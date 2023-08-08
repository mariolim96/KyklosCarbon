// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;
import "../../interfaces/IRegistry.sol";

contract Registry is IRegistry {
    address internal _carbonProjectAddress;
    address internal _carbonProjectVintagesAddress;
    address internal _kyklosTokenAddress;
    address internal _KyklosTokenFactoryAddress;
    address internal _retirementCertificatesAddress;

    mapping(address => bool) public projectVintageERC20Registry;

    // // getter and setter
    function setCarbonProjectAddress(address _address) external {
        _carbonProjectAddress = _address;
    }

    function getCarbonProjectAddress() external view returns (address) {
        return _carbonProjectAddress;
    }

    function setCarbonProjectVintagesAddress(address _address) external {
        _carbonProjectVintagesAddress = _address;
    }

    function getCarbonProjectVintagesAddress() external view returns (address) {
        return _carbonProjectVintagesAddress;
    }

    function setKyklosTokenAddress(address _address) external {
        _kyklosTokenAddress = _address;
    }

    function getKyklosTokenAddress() external view returns (address) {
        return _kyklosTokenAddress;
    }

    function setKyklosTokenFactoryAddress(address _address) external {
        _KyklosTokenFactoryAddress = _address;
    }

    function getKyklosTokenFactoryAddress() external view returns (address) {
        return _KyklosTokenFactoryAddress;
    }

    function setRetirementCertificatesAddress(address _address) external {
        _retirementCertificatesAddress = _address;
    }

    function getRetirementCertificatesAddress() external view returns (address) {
        return _retirementCertificatesAddress;
    }

    function setProjectVintageERC20Registry(address _address, bool _bool) external {
        projectVintageERC20Registry[_address] = _bool;
    }

    function getProjectVintageERC20Registry(address _address) external view returns (bool) {
        return projectVintageERC20Registry[_address];
    }
}
