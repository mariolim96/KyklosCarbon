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

import "./CarbonProjectTypes.sol";

// import "./ICarbonProjects.sol";

interface ICarbonProjects is IERC721 {
    function addNewProject(
        address to,
        string memory projectId,
        string memory standard,
        string memory methodology,
        string memory region,
        string memory storageMethod,
        string memory method,
        string memory emissionType,
        string memory category,
        string memory uri,
        address beneficiary
    ) external returns (uint256);

    function isValidProjectTokenId(uint256 tokenId) external returns (bool);

    function getProjectDataByTokenId(uint256 tokenId) external view returns (ProjectData memory);
}

contract CarbonProjectsStorage {
    uint128 public projectTokenCounter;
    uint128 public totalSupply;
    address public contractRegistry;
    string public baseURI;

    /// @dev maps `tokenId` to `ProjectData` struct
    mapping(uint256 => ProjectData) public projectData;

    /// @dev uniqueness check for globalUniqueIdentifier strings
    /// Example: `'VCS-01468' -> true`
    /// Todo: assess if can be deprecated
    mapping(string => bool) public projectIds;

    /// @dev mapping to identify invalid projectTokenIds
    /// Examples: projectokenIds that have been removed or non-existent ones
    mapping(uint256 => bool) public validProjectTokenIds;

    /// @dev Maps a universal/global project-id like 'VCS-1234' to its `tokenId`
    mapping(string => uint256) public pidToTokenId;
}

contract CarbonProject is ICarbonProjects, ERC721, CarbonProjectsStorage, Pausable, AccessControl, Ownable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    constructor() ERC721("CarbonProject", "CPV") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
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

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId) public view override(AccessControl, ERC721, IERC165) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    modifier onlyManagers() {
        require(hasRole(MANAGER_ROLE, msg.sender) || owner() == msg.sender, "Caller is not authorized");
        _;
    }

    function setRegistry(address _address) external virtual onlyOwner {
        contractRegistry = _address;
    }

    // events
    event ProjectMinted(address receiver, uint256 tokenId);

    // functions

    /// @notice Adds a new carbon project along with attributes/data
    /// @dev Projects can be added by data-managers
    function addNewProject(
        address to,
        string memory projectId,
        string memory standard,
        string memory methodology,
        string memory region,
        string memory storageMethod,
        string memory method,
        string memory emissionType,
        string memory category,
        string memory uri,
        address beneficiary
    ) external virtual override onlyManagers whenNotPaused returns (uint256) {
        require(!strcmp(projectId, ""), "ProjectId cannot be empty");
        require(!projectIds[projectId], "Project already exists");
        projectIds[projectId] = true;

        uint256 newItemId = projectTokenCounter;
        unchecked {
            ++newItemId;
            ++totalSupply;
        }
        projectTokenCounter = uint128(newItemId);

        validProjectTokenIds[newItemId] = true;

        safeMint(to, newItemId);

        projectData[newItemId].projectId = projectId;
        projectData[newItemId].standard = standard;
        projectData[newItemId].methodology = methodology;
        projectData[newItemId].region = region;
        projectData[newItemId].storageMethod = storageMethod;
        projectData[newItemId].method = method;
        projectData[newItemId].emissionType = emissionType;
        projectData[newItemId].category = category;
        projectData[newItemId].uri = uri;
        projectData[newItemId].beneficiary = beneficiary;

        emit ProjectMinted(to, newItemId);
        pidToTokenId[projectId] = newItemId;
        return newItemId;
    }

    function memcmp(bytes memory a, bytes memory b) internal pure returns (bool) {
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

    function strcmp(string memory a, string memory b) internal pure returns (bool) {
        return memcmp(bytes(a), bytes(b));
    }

    function isValidProjectTokenId(uint256 tokenId) external override returns (bool) {}

    function getProjectDataByTokenId(uint256 tokenId) external view override returns (ProjectData memory) {}
}
