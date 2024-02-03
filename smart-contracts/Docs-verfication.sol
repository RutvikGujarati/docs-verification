// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserDocumentUpload {
    struct Document {
        address userAddress;
        string documentHash;
        bool isUploaded;
        bool isVerified;
    }

    mapping(address => Document[]) public userDocuments;
    mapping(address => string[]) value;

    event DocumentUploaded(address indexed user, string indexed documentHash);

    struct Profile {
        string name;
        string email;
        string phone;
        uint256 age;
    }


    mapping (address => Profile) public profiles;

    
    address[] public userAddress;

    function registerUser() public {
        userAddress.push(msg.sender);
    }
     function GetAllUsers()public view returns(address[] memory){
         return  userAddress;
     }
    function getUserDocumentss(address _userAddress) public view returns (Document[] memory) {
        return userDocuments[_userAddress];
    }

    function setProfile(string memory _name, string memory _email, string memory _phone, uint256 _age) public {
        Profile storage profile = profiles[msg.sender];
        profile.name = _name;
        profile.email = _email;
        profile.phone = _phone;
        profile.age = _age;
    }

    function getProfile() public view returns (string memory, string memory, string memory,uint256) {
        Profile storage profile = profiles[msg.sender];
        return (profile.name, profile.email, profile.phone, profile.age);
    }

    function uploadDocument(string memory _documentHash) public {
        Document memory newDocument = Document(
            msg.sender,
            _documentHash,
            true,
            false
        );
        userDocuments[msg.sender].push(newDocument);

        emit DocumentUploaded(msg.sender, _documentHash);
    }

    function getMyAllDocuments() public view returns (string[] memory) {
        Document[] memory userDocs = userDocuments[msg.sender];
        string[] memory ipfsHashes = new string[](userDocs.length);

        require(userDocs.length > 0, "No documents found for the user");

        for (uint256 i = 0; i < userDocs.length; i++) {
            ipfsHashes[i] = userDocs[i].documentHash;
        }

        return ipfsHashes;
    }

    function getVerifiedDocuments(
        address _userAddress
    ) public view returns (string[] memory) {
        require(
            userDocuments[_userAddress].length > 0,
            "No documents found for the user"
        );

        Document[] memory docs = userDocuments[_userAddress];
        string[] memory verifiedDocs = new string[](docs.length);
        uint256 count = 0;

        for (uint256 i = 0; i < docs.length; i++) {
            if (docs[i].isVerified) {
                verifiedDocs[count] = docs[i].documentHash;
                count++;
            }
        }

        string[] memory result = new string[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = verifiedDocs[i];
        }

        return result;
    }
}

contract AdminDocumentVerification is UserDocumentUpload {
    address[] public userAddresses; //extra point
    uint256 counter;

    address public admin;

    string[] public hardcodedIPFSHashes;
    event DocumentVerified(
        address indexed user,
        string indexed documentHash,
        bool isVerified
    );
    mapping(address => bool) public submittedAddresses;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addUserAddress(address _userAddress) external onlyAdmin {
        userAddresses.push(_userAddress);
    }

    function changeAdmin(address _newAdmin) public onlyAdmin {
        admin = _newAdmin;
    }

    function submitAddress() public {
        submittedAddresses[msg.sender] = true;
    }

    function addDummyIPFSHash(string memory _dummyHash) public onlyAdmin {
        hardcodedIPFSHashes.push(_dummyHash);
    }

    function getAllUserByAdmin() public view returns (Profile[] memory) { //not woorth it properly
    uint256 userCount = userAddresses.length;
    Profile[] memory allUsers = new Profile[](userCount);

    for (uint256 i = 0; i < userCount; i++) {
        allUsers[i] = profiles[userAddresses[i]];
    }

    return allUsers;
}

    function getAllDocumentsByAdmin(
        address _userAddress
    ) public view onlyAdmin returns (Document[] memory) {
        require(
            submittedAddresses[_userAddress],
            "This user has not submitted their address"
        );

        return userDocuments[_userAddress];
    }

       function verifyDocument(string memory _documentUrl, address _userAddress) public onlyAdmin {
    require(
        userDocuments[_userAddress].length > 0,
        "No documents found for the user"
    );

    Document[] storage docs = userDocuments[_userAddress];
    bytes32 documentHash = keccak256(abi.encodePacked(_documentUrl));

    for (uint256 i = 0; i < docs.length; i++) {
        Document storage doc = docs[i];

        if (keccak256(abi.encodePacked(doc.documentHash)) == documentHash) {
            doc.isVerified = true;
            emit DocumentVerified(doc.userAddress, doc.documentHash, true);
        } else {
            revert("Document hash mismatch");
        }
    }
}

    function compareWithHardcodedHashes(string memory _documentHash) public view returns (bool) {
        bytes32 documentHash = keccak256(abi.encodePacked(_documentHash));

        for (uint256 i = 0; i < hardcodedIPFSHashes.length; i++) {
            if (
                keccak256(abi.encodePacked(hardcodedIPFSHashes[i])) ==
                documentHash
            ) {
                return true;
            }
        }
        return false;
    }
}

//working fucnitons part of react -  addDummyIPFSHash, changeadmin, registerUser, setProfile, UploadDocument, verifyDocument, admin, 
           //          compareWithIPFShash, GetAllUsers, getMyAllDocuments, getProfile, getUserDocuments, getVeryfiedDocument,profiles, uesrAddress,userDocuments

// new - 0xe3A2293288C0C3d8246F82c4c3864F46C6695E85

//polygon mismatched of verification- 0xE930db1f5cF26BF315f42f8dA74c9999189E43f4

// final - 0x112E7dcfa4447fEFEd7f811cBAbcc40e4C9bB084

//sepolia - 0x64239BDC9F285CE26848F80b9BB976e99E428Cbe