// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserProfile {
    struct Profile {
        string name;
        string email;
        string phone;
        uint256 age;
    }

    mapping(address => Profile) public profiles;

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
}

//0x1348746A50a4d7fa85bCe4c2C5091c5677A243bb

//org - 0xdda683Da70332BB37893A4c8AA59f9dF3cd9bf56