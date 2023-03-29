// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BadgerNFT is ERC721, Ownable {
    constructor() ERC721("BadgerNFT", "BNFT") {
        _baseURI();
        _safeMint(msg.sender,1);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://bafkreigm2llkmgbmicugiwvidzrtxsld2hmuoqjscxhmkczhgtmjou7h64.ipfs.nftstorage.link/";
    }

}