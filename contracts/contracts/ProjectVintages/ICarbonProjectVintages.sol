// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;
import "./ICarbonProjectVintagesTypes.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface ICarbonProjectVintages is IERC721 {
    function addNewVintage(address to, VintageData memory _vintageData) external returns (uint256);

    function getProjectVintageDataByTokenId(uint256 tokenId) external view returns (VintageData memory);

    function exists(uint256 tokenId) external view returns (bool);
}
