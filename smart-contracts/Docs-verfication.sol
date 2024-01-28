// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserDocumentUpload {
    struct Document {
        address userAddress;
        string documentHash;
        bool isUploaded;
        bool isVerified; // Added a flag to track verification status
    }

    mapping(address => Document) public documents;
    address[] public userAddresses; // Added a list to store user addresses
    uint256 public counter;

    event DocumentUploaded(address indexed user, string indexed documentHash);
    event DocumentVerified(
        address indexed user,
        string indexed documentHash,
        bool isVerified
    );

    function uploadDocument(string memory _documentHash) public {
        // Check if the document hash is unique for the user
        require(
            !documents[msg.sender].isUploaded ||
                keccak256(bytes(documents[msg.sender].documentHash)) !=
                keccak256(bytes(_documentHash)),
            "Document already uploaded"
        );

        // Add the new document to the array
        Document memory newDocument = Document(
            msg.sender,
            _documentHash,
            true,
            false
        );
        documents[msg.sender] = newDocument;

        // Add the user address to the list
        userAddresses.push(msg.sender);

        // Emit event
        emit DocumentUploaded(msg.sender, _documentHash);
    }

    // function getMyDocuments() public view returns (Document[] memory) {
    //     // Create an array to store user documents
    //     Document[] memory userDocuments = new Document[](userAddresses.length);

    //     // Iterate over user addresses and fetch their documents
    //     for (uint256 i = 0; i < userAddresses.length; i++) {
    //         address userAddress = userAddresses[i];
    //         userDocuments[i] = documents[userAddress];
    //     }

    //     return userDocuments;
    // }
    function getMyDocuments() public view returns (Document memory) {
        address userAddress = msg.sender;
        return documents[userAddress];
    }
    

    function verifiedDocs() public view returns (string[] memory) {
        string[] memory verifiedDocuments;

        for (uint256 i = 0; i < userAddresses.length; i++) {
            address userAddress = userAddresses[i];
            if (documents[userAddress].isVerified) {
                // Collect verified documents
                string memory documentHash = documents[userAddress]
                    .documentHash;
                // Extend the array and store the new hash
                string[] memory tempArray = new string[](
                    verifiedDocuments.length + 1
                );
                for (uint256 j = 0; j < verifiedDocuments.length; j++) {
                    tempArray[j] = verifiedDocuments[j];
                }
                tempArray[tempArray.length - 1] = documentHash;
                verifiedDocuments = tempArray;
            }
        }

        return verifiedDocuments;
    }

    function shareDocs() public {
        require(counter > 0, "No shared docs available!");
        address userAddress = userAddresses[counter - 1];
        Document storage doc = documents[userAddress];
        delete documents[userAddress];
        documents[doc.userAddress] = doc;
        counter--;
    }
}

contract AdminDocumentVerification is UserDocumentUpload {
    address public admin;

    string[] public hardcodedIPFSHashes;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function changeAdmin(address _newAdmin) public onlyAdmin {
        admin = _newAdmin;
    }

    function addDummyIPFSHash(string memory _dummyHash) public onlyAdmin {
        hardcodedIPFSHashes.push(_dummyHash);
    }

    function verifyDocument(string memory _documentHash, address _userAddress) public onlyAdmin {
        require(documents[_userAddress].isUploaded, "Document not found");
    
        Document storage d = documents[_userAddress];
    
        // Additional verification logic
        bool verificationResult = compareWithHardcodedHashes(_documentHash);
    
        if (verificationResult) {
            d.isVerified = true; // Set to verified
            emit DocumentVerified(d.userAddress, _documentHash, true);
        } else {
            revert("Document hash mismatch");
        }
        counter++;
    }
    
    function compareWithHardcodedHashes(
        string memory _documentHash
    ) public view returns (bool) {
        for (uint256 i = 0; i < hardcodedIPFSHashes.length; i++) {
            if (
                keccak256(abi.encodePacked(hardcodedIPFSHashes[i])) ==
                keccak256(abi.encodePacked(_documentHash))
            ) {
                return true;
            }
        }
        return false;
    }

    function compareWithHardcodedHashe(
        string memory _documentHash
    ) public view returns (bool) {
        // Iterate over each hardcoded IPFS hash
        for (uint256 i = 0; i < hardcodedIPFSHashes.length; i++) {
            // Check if the given document hash matches the current hardcoded hash
            if (
                keccak256(abi.encodePacked(hardcodedIPFSHashes[i])) ==
                keccak256(abi.encodePacked(_documentHash))
            ) {
                // Return true if a match is found
                return true;
            }
        }
        // If no match is found, return false
        return false;
    }

    function addHardcodedIPFSHash(string memory _hashToAdd) public {
        hardcodedIPFSHashes.push(_hashToAdd);
    }
}

//0xC4a9E803519794AB987Af93A5E98A5fa396c4596

//org - 0x8e1f81cFC04DDFd842Db7469f873b0ee5ef6fF8D