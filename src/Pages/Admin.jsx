// ... (existing imports and code)

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
} from "react-bootstrap";
import { Account, Web3Button, useContract } from "@thirdweb-dev/react";
import abi from './Document/abi.json';  // Uncomment this line
import Web3 from "web3";

const AdminPanel = ({ account }) => {
  const [dummyHash, setDummyHash] = useState("");
  const [contract, setContract] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [web3, setWeb3] = useState(null);
  const [verifiedDocumentHash, setVerifiedDocumentHash] = useState("");
  const [newAdminAddress, setNewAdminAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const contractAddress = "0x8e1f81cFC04DDFd842Db7469f873b0ee5ef6fF8D";
          const contractInstance = new web3Instance.eth.Contract(
            abi,
            contractAddress
          );
          setContract(contractInstance);
        } else {
          console.error("Web3 provider not detected");
        }
      } catch (error) {
        console.error("Error initializing:", error);
      }
    };

    init();
  }, []);

  const addDummyIPFSHash = async () => {
    try {
      // Check if contract is initialized
      if (!contract) {
        console.error("Contract not initialized");
        return;
      }

      // Call the addDummyIPFSHash function from the smart contract
      await contract.methods.addDummyIPFSHash(dummyHash).send({ from: account });
      alert("Dummy IPFS Hash added successfully");
    } catch (error) {
      console.error("Error adding dummy IPFS hash:", error);
    }
  };

  const verifyDocument = async () => {
    try {
      // Call the verifyDocument function from the smart contract
      await contract.methods
        .verifyDocument(verifiedDocumentHash)
        .send({ from: account });
      alert("Document verified successfully");
    } catch (error) {
      console.error("Error verifying document:", error);
    }
  };

  const changeAdmin = async () => {
    try {
      // Call the changeAdmin function from the smart contract
      await contract.methods
        .changeAdmin(newAdminAddress)
        .send({ from: account });
      console.log("Admin changed successfully");
    } catch (error) {
      console.error("Error changing admin:", error);
    }
  };

  const compareWithHardcodedHashes = async () => {
    try {
      // Call the compareWithHardcodedHashes function from the smart contract
      const result = await contract.methods
        .compareWithHardcodedHashes(ipfsHash)
        .call({ from: account });
      alert("Comparison result:", result);
    } catch (error) {
      console.error("Error comparing with hardcoded hashes:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Admin Panel</h1>
          <div className="form-group">
            <label>Dummy IPFS Hash:</label>
            <input
              type="text"
              className="form-control"
              value={dummyHash}
              onChange={(e) => setDummyHash(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={addDummyIPFSHash}
              className="mt-2"
            >
              Add Dummy IPFS Hash
            </Button>
          </div>
          {/* Add other admin functionalities as needed */}
        </Col>
        <Col>
          <div className="form-group">
            <label>Verified Document Hash:</label>
            <input
              type="text"
              className="form-control"
              value={verifiedDocumentHash}
              onChange={(e) => setVerifiedDocumentHash(e.target.value)}
            />
            <Button variant="success" onClick={verifyDocument} className="mt-2">
              Verify Document
            </Button>
          </div>
          <div className="form-group">
            <label>New Admin Address:</label>
            <input
              type="text"
              className="form-control"
              value={newAdminAddress}
              onChange={(e) => setNewAdminAddress(e.target.value)}
            />
            <Button variant="warning" onClick={changeAdmin} className="mt-2">
              Change Admin
            </Button>
          </div>
          <div className="mt-3">
          <input
              type="text"
              className="form-control"
              value={ipfsHash}
              onChange={(e) => setIpfsHash(e.target.value)}
            />
            <Button variant="info" onClick={compareWithHardcodedHashes}>
              Compare With Hardcoded Hashes
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
