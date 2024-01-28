// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IpfsUploader {
    struct File {
        string ipfsHash;
        bool isPublic;
    }

    mapping(address => File) public files;

    function uploadFile(string memory _ipfsHash, bool _isPublic) public {
        files[msg.sender] = File(_ipfsHash, _isPublic);
    }

    function getFile() public view returns (File memory) {
        return files[msg.sender];
    }
}