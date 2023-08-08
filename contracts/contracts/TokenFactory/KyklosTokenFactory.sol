// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

import "../../interfaces/IRegistry.sol";
import "../../interfaces/IKyklosTokenFactory.sol";
pragma solidity 0.8.18;

abstract contract KyklosTokenFactoryStorage {
    address public contractRegistry;
    address public beacon;

    address[] public deployedContracts; // all the token contracts deployed
    mapping(uint256 => address) public projectVintageToErc20; // mapping from project vintage to erc20

    // fees
    address public bridgeFeeReceiver;
    uint256 public bridgeFeePercentageInBase;
    address public bridgeFeeBurnAddress;
    uint256 public bridgeFeeBurnPercentageInBase;
    // ----------------------------------------
    uint256 public totalRetired; // total amount of tokens retired
}

contract KyklosTokenFactory is IKyklosTokenFactory, KyklosTokenFactoryStorage, Ownable, Pausable {
    constructor(address _contractRegistry, address _beacon) {
        contractRegistry = _contractRegistry;
        beacon = _beacon;
    }

    // ----------------------------------------
    //      Events
    // ----------------------------------------
    event TokenCreated(uint256 vintageTokenId, address tokenAddress);

    // ----------------------------------------
    //      Modifiers
    // ----------------------------------------
    modifier onlyRegistry() {
        require(msg.sender == contractRegistry, "Only registry");
        _;
    }

    // ----------------------------------------
    //      Admin functions
    // ----------------------------------------
    function setRegistry(address _address) external onlyOwner {
        contractRegistry = _address;
    }

    function setBridgeFeeReceiver(address _address) external onlyOwner {
        bridgeFeeReceiver = _address;
    }

    function setBridgeFeePercentageInBase(uint256 _percentage) external onlyOwner {
        bridgeFeePercentageInBase = _percentage;
    }

    function setBridgeFeeBurnAddress(address _address) external onlyOwner {
        bridgeFeeBurnAddress = _address;
    }

    function setBridgeFeeBurnPercentageInBase(uint256 _percentage) external onlyOwner {
        bridgeFeeBurnPercentageInBase = _percentage;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function checkExistence(uint256 projectVintageTokenId) internal view virtual returns (bool) {
        if (projectVintageToErc20[projectVintageTokenId] == address(0)) {
            return false;
        } else {
            return true;
        }
    }

    function getProjectVintageToErc20(uint256 projectVintageTokenId) external view virtual returns (address) {
        return projectVintageToErc20[projectVintageTokenId];
    }

    // function that create a new token using the proxy pattern
    function createToken(uint256 _vintageTokenId) external onlyRegistry whenNotPaused {
        require(beacon != address(0), "Error: Beacon for proxy not set");
        require(!checkExistence(_vintageTokenId), "pvERC20 already exists");
        string memory signature = "initialize(string,string,uint256,address)";
        bytes memory payload = abi.encodeWithSignature(signature, "KyklosCarbonToken", "KCT", _vintageTokenId, contractRegistry);

        BeaconProxy proxyKT = new BeaconProxy(beacon, payload);

        IRegistry(contractRegistry).setProjectVintageERC20Registry(address(proxyKT), true);
        deployedContracts.push(address(proxyKT));

        projectVintageToErc20[_vintageTokenId] = address(proxyKT);

        emit TokenCreated(_vintageTokenId, address(proxyKT));
    }

    // ----------------------------------------
    //      Registry functions
    // ----------------------------------------
    function increaseTotalRetired(uint256 amount) external override {
        totalRetired += amount;
    }
}
