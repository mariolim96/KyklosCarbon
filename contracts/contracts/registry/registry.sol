// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

contract Registry {
    address internal _carbonOffsetBatchesAddress;
    address internal _carbonProjectsAddress;
    address internal _carbonProjectVintagesAddress;
    address internal _toucanCarbonOffsetsFactoryAddress;
    address internal _carbonOffsetBadgesAddress;

    // getter and setter
    function setCarbonOffsetBatchesAddress(address _address) external {
        _carbonOffsetBatchesAddress = _address;
    }

    function getCarbonOffsetBatchesAddress() external view returns (address) {
        return _carbonOffsetBatchesAddress;
    }

    function setCarbonProjectsAddress(address _address) external {
        _carbonProjectsAddress = _address;
    }

    function getCarbonProjectsAddress() external view returns (address) {
        return _carbonProjectsAddress;
    }

    function setCarbonProjectVintagesAddress(address _address) external {
        _carbonProjectVintagesAddress = _address;
    }

    function getCarbonProjectVintagesAddress() external view returns (address) {
        return _carbonProjectVintagesAddress;
    }

    function setToucanCarbonOffsetsFactoryAddress(address _address) external {
        _toucanCarbonOffsetsFactoryAddress = _address;
    }

    function getToucanCarbonOffsetsFactoryAddress() external view returns (address) {
        return _toucanCarbonOffsetsFactoryAddress;
    }

    function setCarbonOffsetBadgesAddress(address _address) external {
        _carbonOffsetBadgesAddress = _address;
    }

    function getCarbonOffsetBadgesAddress() external view returns (address) {
        return _carbonOffsetBadgesAddress;
    }
}
