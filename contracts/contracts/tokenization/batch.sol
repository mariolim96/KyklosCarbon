// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./batch.types.sol";

contract NFTRetirementBatch is ERC721, ERC721Burnable, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    uint256 public batchTokenCounter;

    mapping(string => bool) public serialNumberApproved;
    mapping(string => bool) public URIs;

    string public baseURI;
    address public contractRegistry;

    struct NFTData {
        string serialNumber;
        uint256 quantity;
        RetirementStatus status;
        string uri;
        // uint256 projectVintageTokenId;
        // string[] comments;
        // address[] commentAuthors;
    }

    mapping(uint256 => NFTData) public nftList;

    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    event BatchMinted(address sender, uint256 tokenId);
    event BatchUpdated(uint256 tokenId, string serialNumber, uint256 quantity);
    // event BatchLinkedWithVintage(
    //     uint256 tokenId,
    //     uint256 projectVintageTokenId
    // );
    // event BatchComment(
    //     uint256 tokenId,
    //     uint256 commentId,
    //     address sender,
    //     string comment
    // );
    event BatchStatusUpdate(uint256 tokenId, RetirementStatus status);

    constructor() ERC721("NftBatch", "MTK") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
    }

    function safeMint(address to) internal onlyRole(VERIFIER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setRegistry(address _address) external virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        contractRegistry = _address;
    }

    function getRegistry() external view virtual returns (address) {
        return contractRegistry;
    }

    /// @dev The verifier has the authority to confirm NFTs so ERC20's can be minted
    modifier onlyVerifier() {
        require(hasRole(VERIFIER_ROLE, _msgSender()), "Error: caller is not the verifier");
        _;
    }

    /// @dev internal helper function to set the status and emit an event
    function updateStatus(uint256 tokenId, RetirementStatus newStatus) internal virtual {
        nftList[tokenId].status = newStatus;
        emit BatchStatusUpdate(tokenId, newStatus);
    }

    function confirmRetirement(uint256 tokenId) public virtual onlyVerifier {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");
        require(nftList[tokenId].status != RetirementStatus.Confirmed, "Batch retirement is already confirmed");
        // require(
        //     nftList[tokenId].projectVintageTokenId != 0,
        //     "Cannot retire batch without project vintage"
        // );
        require(serialNumberApproved[nftList[tokenId].serialNumber] == false, "Serialnumber has already been approved");
        /// @dev setting serialnumber as unique after confirmation
        serialNumberApproved[nftList[tokenId].serialNumber] = true;
        updateStatus(tokenId, RetirementStatus.Confirmed);
    }

    function rejectRetirement(uint256 tokenId) public virtual onlyVerifier {
        require(nftList[tokenId].status == RetirementStatus.Pending, "Batch must be in pending state to be rejected");
        /// @dev unsetting serialnumber with rejection
        serialNumberApproved[nftList[tokenId].serialNumber] = false;
        updateStatus(tokenId, RetirementStatus.Rejected);
    }

    /// @notice Set batches back to pending after a rejection. This can
    /// be useful if there was an issue unrelated to the on-chain data of the
    /// batch, e.g. the batch was incorrectly rejected.
    function setToPending(uint256 tokenId) external virtual onlyVerifier {
        require(nftList[tokenId].status == RetirementStatus.Rejected, "Can only reset rejected batches to pending");
        updateStatus(tokenId, RetirementStatus.Pending);
    }

    // PERMISSIONLESS FUNC
    // # 1
    function mintEmptyBatch(address to) external virtual returns (uint256) {
        uint256 newItemId = batchTokenCounter;
        unchecked {
            ++newItemId;
        }
        batchTokenCounter = newItemId;

        _safeMint(to, newItemId);
        nftList[newItemId].status = RetirementStatus.Pending;

        emit BatchMinted(to, newItemId);
        return newItemId;
    }

    // # 2
    function updateBatchWithData(uint256 tokenId, string memory serialNumber, uint256 quantity, string memory uri) external virtual {
        require(ownerOf(tokenId) == _msgSender() || hasRole(VERIFIER_ROLE, _msgSender()), "Error: update only by owner or verifier");
        RetirementStatus status = nftList[tokenId].status;
        require(status != RetirementStatus.Confirmed, "Error: cannot change data after confirmation");
        require(serialNumberApproved[serialNumber] == false, "Serialnumber has already been approved");
        nftList[tokenId].serialNumber = serialNumber;
        nftList[tokenId].quantity = quantity;

        /// @dev Make sure metadata does not exist twice
        if (!strcmp(uri, nftList[tokenId].uri)) {
            require(URIs[uri] == false, "Error: uri already exists");
            nftList[tokenId].uri = uri;
            URIs[uri] = true;
        }

        if (status == RetirementStatus.Rejected) {
            updateStatus(tokenId, RetirementStatus.Pending);
        }

        emit BatchUpdated(tokenId, serialNumber, quantity);
    }

    function strcmp(string memory a, string memory b) internal pure returns (bool) {
        return memcmp(bytes(a), bytes(b));
    }

    /// @dev internal helper for string comparison
    function memcmp(bytes memory a, bytes memory b) internal pure returns (bool) {
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

    function setSerialandQuantity(uint256 tokenId, string memory newSerialNumber, uint256 newQuantity) external virtual {
        require(ownerOf(tokenId) == _msgSender() || hasRole(VERIFIER_ROLE, _msgSender()), "Error: update only by owner or verifier");
        require(nftList[tokenId].status != RetirementStatus.Confirmed, "Error: cannot change data after confirmation");
        require(serialNumberApproved[newSerialNumber] == false, "Serialnumber has already been approved");
        nftList[tokenId].serialNumber = newSerialNumber;
        nftList[tokenId].quantity = newQuantity;

        emit BatchUpdated(tokenId, newSerialNumber, newQuantity);
    }

    function getConfirmationStatus(
        uint256 tokenId
    )
        external
        view
        virtual
        returns (
            // override
            RetirementStatus
        )
    {
        return nftList[tokenId].status;
    }

    function getBatchNFTData(
        uint256 tokenId
    )
        external
        view
        virtual
        returns (
            // override
            // uint256,
            uint256,
            RetirementStatus
        )
    {
        return (nftList[tokenId].quantity, nftList[tokenId].status);
    }

    // function transferFrom(
    //     address from,
    //     address to,
    //     uint256 tokenId
    // ) public virtual override(ERC721Upgradeable, IERC721Upgradeable) {
    //     require(
    //         _isApprovedOrOwner(_msgSender(), tokenId),
    //         "ERC721: transfer caller is not owner nor approved"
    //     );
    //     safeTransferFrom(from, to, tokenId, "");
    // }

    function fractionalize(uint256 tokenId) external virtual {
        //     require(
        //         _isApprovedOrOwner(_msgSender(), tokenId),
        //         "ERC721: transfer caller is not owner nor approved"
        //     );
        //     address ERC20Factory = IToucanContractRegistry(contractRegistry)
        //         .toucanCarbonOffsetsFactoryAddress();
        //     uint256 pvId = nftList[tokenId].projectVintageTokenId;
        //     address pvERC20 = ToucanCarbonOffsetsFactory(ERC20Factory).pvIdtoERC20(
        //         pvId
        //     );
        //     safeTransferFrom(_msgSender(), pvERC20, tokenId, "");
    }

    function balanceOf(address owner) public view virtual override(ERC721) returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");

        return super.balanceOf(owner);
    }

    function getAllNftOfUser(
        address owner
    )
        external
        view
        virtual
        returns (
            // return all nft of user
            NFTData[] memory,
            uint256[] memory
        )
    {
        uint256[] memory numberOfNftBatch = new uint256[](balanceOf(owner));
        uint256 counter = batchTokenCounter;
        uint256 index = 0;
        while (counter > 0 && index < numberOfNftBatch.length) {
            if (ownerOf(counter) == owner) {
                numberOfNftBatch[index] = counter;
                index++;
            }
            counter--;
        }
        NFTData[] memory nftData = new NFTData[](numberOfNftBatch.length);
        for (uint256 i = 0; i < numberOfNftBatch.length; i++) {
            nftData[i] = nftList[numberOfNftBatch[i]];
        }
        return (nftData, numberOfNftBatch);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory gateway) external virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        baseURI = gateway;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        string memory uri = nftList[tokenId].uri;
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return uri;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(uri).length > 0) {
            return string(abi.encodePacked(base, uri));
        }

        return super.tokenURI(tokenId);
    }

    // function _beforeTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 amount
    // ) internal virtual override {
    //     super._beforeTokenTransfer(from, to, amount);

    //     require(!paused(), "ERC20Pausable: token transfer while paused");
    // }
}
