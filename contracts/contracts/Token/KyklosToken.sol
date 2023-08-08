// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;
// erc 20 e 721
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "../CarbonProject/CarbonProjectTypes.sol";
import "../../interfaces/ICarbonProjects.sol";

import "../ProjectVintages/IProjectVintagesTypes.sol";
import "../../interfaces/IProjectVintages.sol";

import "../../interfaces/IRegistry.sol";

contract KyklosTokenStorage {
    // address public contractRegistry;
    // address public beacon;
    // address public bridgeFeeReceiver;
    // uint256 public bridgeFeePercentageInBase;
    // address public bridgeFeeBurnAddress;
    // uint256 public bridgeFeeBurnPercentageInBase;
    // uint256 public totalRetired;
    // mapping(address => bool) public allowedBridges;
    // uint256[44] private __gap;
    uint256 public projectVintageTokenId;
    address public contractRegistry;

    mapping(address => uint256) public minterToId;
}

contract KyklosToken is KyklosTokenStorage, ERC20, IERC721Receiver {
    constructor(address _contractRegistry, uint256 _projectVintageTokenId) ERC20("KyklosToken", "KYKLOS") {
        contractRegistry = _contractRegistry;
        projectVintageTokenId = _projectVintageTokenId;
    }

    // ----------------------------------------
    //      Events
    // ----------------------------------------
    event Retired(address sender, uint256 amount, uint256 eventId);
    event FeePaid(address bridger, uint256 fees);
    event FeeBurnt(address bridger, uint256 fees);

    //  modifier whenNotPaused() {
    //     address tco2Factory = IToucanContractRegistry(contractRegistry)
    //         .toucanCarbonOffsetsFactoryAddress();
    //     bool _paused = IPausable(tco2Factory).paused();
    //     require(!_paused, 'Paused TCO2');
    //     _;
    // }
    // function name() public view virtual override returns (string memory) {

    /// @notice receive hook to fractionalize vintages into erc20 tokens
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external override returns (bytes4) {
        VintageData memory vintageData = IProjectVintages(IRegistry(contractRegistry).getCarbonProjectVintagesAddress())
            .getProjectVintageDataByTokenId(tokenId);
        minterToId[from] = tokenId;
        uint256 quantity = vintageData.totalVintageQuantity * 10 ** decimals();
        _mint(from, quantity);
    }
}
