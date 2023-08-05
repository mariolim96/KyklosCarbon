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

interface ICarbonProjectVintages is IERC721 {
    function addNewVintage(address to, VintageData memory _vintageData) external returns (uint256);

    function getProjectVintageDataByTokenId(uint256 tokenId) external view returns (VintageData memory);

    // function exists(uint256 tokenId) external view returns (bool);
}

struct VintageData {
    /// @dev A human-readable string which differentiates this from other vintages in
    /// the same project, and helps build the corresponding TCO2 name and symbol.
    string name;
    uint64 startTime; // UNIX timestamp
    uint64 endTime; // UNIX timestamp
    uint256 projectTokenId;
    uint64 totalVintageQuantity;
    bool isCorsiaCompliant;
    bool isCCPcompliant;
    string coBenefits;
    string correspAdjustment;
    string additionalCertification;
    string uri;
}

contract CarbonProjectVintagesStorage {
    uint128 public projectVintageTokenCounter;
    uint128 public totalSupply;
    address public contractRegistry;
    string public baseURI;

    mapping(uint256 => VintageData) public vintageData;

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
