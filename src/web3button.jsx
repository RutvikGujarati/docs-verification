"use client";

import React, { useState, useEffect } from 'react';
import { Web3Button } from "@thirdweb-dev/react";
import abi from "./abi.json";
import { useContractWrite, useContractRead, useContract, useAddress } from "@thirdweb-dev/react";

const Contract = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [showProfiles, setProfiles] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    async function fetchUserDetails(contract, address) {
        try {
            const { data } = await useContractRead(
                contract,
                "getProfile" // Replace with the actual method in your contract
            );

            // Handle the data and return the user details
            return data;
        } catch (error) {
            // Handle errors during the contract interaction
            console.error('Error fetching user details from contract:', error.message);
            return null;
        }
    }


    const { contract } = useContract("0xdda683Da70332BB37893A4c8AA59f9dF3cd9bf56");

    const address = useAddress();

    const { mutateAsync, isLoading, error } = useContractWrite(
        contract,
        "setProfile"
    );
    const { data: profiles } = useContractRead(
        contract,
        "profiles",
        [address]
    )


    useEffect(() => {
        fetchUserDetails(contract, address).then((getProfile) => {
            if (getProfile) {
                setProfiles(getProfile);
                setIsLoaded(true);
            } else {
                // Redirect to the registration page or handle the error
                console.error('User details not found.');
            }
        });
    }, [contract,address]);

    return (
        <>
            <div className='main'>
                <div className='input-box'>
                    <input type='text' onChange={(e) => setName(e.target.value)} value={name} required />
                    <label htmlFor=''>Username</label>
                </div>

                <div className='input-box'>
                    <input type='text' onChange={(e) => setEmail(e.target.value)} value={email} required />
                    <label htmlFor=''>Gmail</label>
                </div>

                <div className='input-box'>
                    <input type='text' onChange={(e) => setPhone(e.target.value)} value={phone} required />
                    <label htmlFor=''>Mobile No.</label>
                </div>

                <div className='input-box'>
                    <input type='text' onChange={(e) => setAge(e.target.value)} value={age} required />
                    <label htmlFor=''>Age</label>
                </div>

                <div>
                    <Web3Button
                        contractAddress='0xdda683Da70332BB37893A4c8AA59f9dF3cd9bf56'
                        contractAbi={abi}
                        action={() => mutateAsync({ args: [name, email, phone, age] })}
                    >submit profile</Web3Button>
                    <Web3Button
                        contractAddress='0xdda683Da70332BB37893A4c8AA59f9dF3cd9bf56'
                        contractAbi={abi}
                        action={() => profiles}
                    // onSuccess={console.log(profiles)}
                    >
                        Get Profile
                    </Web3Button>
                </div>
                {profiles && profiles.length > 0 && ( //there is no need to map but it is helpful
                    <div>
                        {profiles.map((profile, index) => (
                            <div key={index}>
                                <h3>Profile:</h3>
                                <p>Name: {profiles.name.toString()}</p>
                                <p>Email: {profiles.email.toString()}</p>
                                <p>Phone: {profiles.phone.toString()}</p>
                                <p>Age: {profiles.age.toString()}</p>
                            </div>
                        ))}
                    </div>
                )}


            </div>
        </>
    )
}



export default Contract
