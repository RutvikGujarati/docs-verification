// Sample code using Web3.js and React
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractAbi from "./docs.json"; // Make sure to provide the correct path

const Web3Component = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [ipfsHash, setIpfsHash] = useState('');
    const [allHashes, setAllHashes] = useState([]);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    // Set up the contract
                    const contractAddress = '0x97486276Db11aD47d81298828A7DE0eA78F32D6A';
                    const contractInstance = new web3Instance.eth.Contract(contractAbi, contractAddress);
                    setContract(contractInstance);
                } catch (error) {
                    console.error("Error initializing Web3:", error);
                }
            } else {
                console.error("Web3 not detected. Please install MetaMask or another Web3 provider.");
            }
        };

        initWeb3();
    }, []);

    const handleAddIPFSHash = async () => {
        if (contract && web3) {
            try {
                await contract.methods.addIPFSHash(ipfsHash).send({ from: web3.eth.accounts[0] });
                // You may want to handle success and update UI accordingly
            } catch (error) {
                console.error("Error adding IPFS hash:", error);
            }
        }
    };

    const handleGetIPFSHashes = async () => {
        if (contract && web3) {
            try {
                const hashes = await contract.methods.getIPFSHashes().call({ from: web3.eth.accounts[0] });
                setAllHashes(hashes);
            } catch (error) {
                console.error("Error retrieving IPFS hashes:", error);
            }
        }
    };

    return (
        <div>
            <label>
                Enter IPFS Hash:
                <input type="text" value={ipfsHash} onChange={(e) => setIpfsHash(e.target.value)} />
            </label>
            <button onClick={handleAddIPFSHash}>Add IPFS Hash</button>
            <button onClick={handleGetIPFSHashes}>Get All IPFS Hashes</button>

            <ul>
                {allHashes.map((hash, index) => (
                    <li key={index}>{hash}</li>
                ))}
            </ul>
        </div>
    );
};

export default Web3Component;
