// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.18;
import "./CarbonProjectTypes.sol";

interface ICarbonProjects {
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
