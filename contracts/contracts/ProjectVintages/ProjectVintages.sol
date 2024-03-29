// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

// import ownable contract from openzeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// ownable contract from openzeppelin
import "@openzeppelin/contracts/access/Ownable.sol";
// pausable contract from openzeppelin
import "@openzeppelin/contracts/security/Pausable.sol";
// access control contract from openzeppelin
import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";
import "../../interfaces/IProjectVintages.sol";
import "./IProjectVintagesTypes.sol";
import "../../interfaces/IRegistry.sol";
import "../../interfaces/IKyklosTokenFactory.sol";
import "../../interfaces/ICarbonProjects.sol";

contract CarbonProjectVintagesStorage {
    uint128 public projectVintageTokenCounter;
    uint128 public totalSupply;
    address public contractRegistry;
    string public baseURI;
    // list of all projectVintageIds that have been minted
    mapping(uint256 => VintageData) public vintageData;
    // list of all projectVintageIds that have been retired
    mapping(uint256 => bool) public isRetired;

    /// @dev mapping to identify invalid projectVintageIds
    /// Examples: projectVintageIds that have been removed or non-existent ones
    mapping(uint256 => bool) public validProjectVintageIds;

    /// @dev Maps: projectTokenId => vintage startTime => projectVintageTokenId
    ///
    /// This is the rough reverse of VintageData.projectTokenId, i.e. it's the
    /// way that a caller with a projectTokenId and a vintage startTime can
    /// obtain the corresponding projectVintageTokenId.  This is particularly
    /// important during the batch NFT approval phase, since prior to
    /// confirmation, there is no direct association between the batch and the
    /// project/vintage; only a long serial number containing info which allows
    /// that association.
    mapping(uint256 => mapping(uint64 => uint256)) public pvToTokenId;
}

contract ProjectVintages is IProjectVintages, ERC721, CarbonProjectVintagesStorage, Pausable, AccessControl, Ownable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    constructor() ERC721("ProjectVintages", "PVN") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, msg.sender);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function safeMint(address to, uint256 tokenId) public onlyRole(MINTER_ROLE) {
        _safeMint(to, tokenId);
    }

    function setRegistry(address _address) external virtual onlyOwner {
        contractRegistry = _address;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId) public view override(AccessControl, ERC721, IERC165) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function exists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }

    // events
    event ProjectVintageMinted(address receiver, uint256 tokenId, uint256 projectTokenId, uint64 startTime);

    function addNewVintage(address to, VintageData memory _vintageData) external virtual onlyRole(MANAGER_ROLE) whenNotPaused returns (uint256) {
        // verify that  _vintageData.projectTokenId corresponds to a valid projectTokenId
        bool projectTokenExists = ICarbonProjects(IRegistry(contractRegistry).getCarbonProjectAddress()).isValidProjectTokenId(
            _vintageData.projectTokenId
        );
        console.log("projectTokenExists: ", projectTokenExists);
        require(projectTokenExists, "Error: projectTokenId does not exist");
        // verify that this vintage does not already exist
        require(pvToTokenId[_vintageData.projectTokenId][_vintageData.startTime] == 0, "Error: vintage already added");
        // check if data is valid
        require(_vintageData.startTime < _vintageData.endTime, "Error: vintage startTime must be less than endTime");

        /// @dev Increase `projectVintageTokenCounter` and mark current Id as valid
        uint256 newItemId = projectVintageTokenCounter;
        unchecked {
            ++newItemId;
            ++totalSupply;
        }
        projectVintageTokenCounter = uint128(newItemId);

        validProjectVintageIds[newItemId] = true;

        _mint(to, newItemId);

        vintageData[newItemId] = _vintageData;
        emit ProjectVintageMinted(to, newItemId, _vintageData.projectTokenId, _vintageData.startTime);
        pvToTokenId[_vintageData.projectTokenId][_vintageData.startTime] = newItemId;

        return newItemId;
    }

    // a function that set the retiremntStatus of a vintage
    function setRetirementStatus(uint256 tokenId, bool status) external virtual whenNotPaused {
        require(exists(tokenId), "Error: tokenId does not exist");
        isRetired[tokenId] = status;
    }

    function getProjectVintageDataByTokenId(uint256 tokenId) external view virtual override returns (VintageData memory) {
        return (vintageData[tokenId]);
    }

    function getVintageData(uint256 tokenId) external view virtual returns (VintageData memory) {
        return (vintageData[tokenId]);
    }

    /// @notice function that automatically  convert  project vintage nft into token using token factory
    function fractionalize(uint256 tokenId) external virtual {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        address ERC20Factory = IRegistry(contractRegistry).getKyklosTokenFactoryAddress();
        uint256 pvId = vintageData[tokenId].projectTokenId;
        address pvERC20 = IKyklosTokenFactory(ERC20Factory).createToken(tokenId);

        safeTransferFrom(_msgSender(), pvERC20, tokenId, "");
    }
}
