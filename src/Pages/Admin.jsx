// AdminPanel.js

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import {useContract , useContractRead} from "@thirdweb-dev/react";
import Web3 from "web3";
import abi from "./Document/abi.json";
import "./AdminPanel.css";

const AdminPanel = ({ account }) => {
  const [dummyHash, setDummyHash] = useState("");
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState([]);
  const [userDocuments, setUserDocuments] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const [documents, setDocuments] = useState([]);
  const [addresses, setAddresses] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [web3, setWeb3] = useState(null);
  const [verify, setVerify] = useState("");
  const [verifiedDocumentHash, setVerifiedDocumentHash] = useState("");
  const [newAdminAddress, setNewAdminAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const contractAddress = "0x64239BDC9F285CE26848F80b9BB976e99E428Cbe";
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

  const { contract1 } = useContract("0x64239BDC9F285CE26848F80b9BB976e99E428Cbe");
  const { data: Document } = useContractRead(
    contract1,
    "Document",
    [users]
  );
  const getAllDocuments = async () => {
    try {
      // Check if contract is not null
      if (!contract) {
        console.error("Contract not initialized");
        return;
      }

      // Fetch the user's documents from the smart contract
      const rawDocuments = await contract.methods
        .getUserDocumentss(address)
        .call({ from: account });

      // Parse the raw documents into an array of objects

      setUserDocuments(rawDocuments);
    } catch (error) {
      console.error("Error getting user documents:", error);
    }
  };

  useEffect(() => {
    getAllDocuments("");
  }, []);

  const addDummyIPFSHash = async () => {
    try {
      // Check if contract is initialized
      if (!contract) {
        console.error("Contract not initialized");
        return;
      }

      // Call the addDummyIPFSHash function from the smart contract
      await contract.methods
        .addDummyIPFSHash(dummyHash)
        .send({ from: account });
      alert("Dummy IPFS Hash added successfully");
    } catch (error) {
      console.error("Error adding dummy IPFS hash:", error);
    }
  };

  const compareWithHardcodedHashes = async () => {
    try {
      // Ensure ipfsHash is a string
      if (typeof ipfsHash !== "string") {
        throw new Error("ipfsHash must be a string");
      }

      // Call the compareWithHardcodedHashes function from the smart contract
      const result = await contract.methods
        .compareWithHardcodedHashes(ipfsHash)
        .call({ from: account });

      alert(`Comparison result: ${result}`);
    } catch (error) {
      console.error("Error comparing with hardcoded hashes:", error);
    }
  };

  const verifyDocument = async () => {
    try {
      await contract.methods
        .verifyDocument(verify, addresses)
        .send({ from: account });
      alert(`Document ${us} verified successfully!`);
      // Refresh the document list after verification
      getAllDocuments();
    } catch (error) {
      console.error("Error verifying document:", error.message);
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

  const GetAllUsers = async () => {
    try {
       const res = await contract.methods
        .GetAllUsers()
        .call({ from: account })
        setUsers(res);
    } catch (error) {
      console.log("error fetching in user details:", error);
    }
  };
useEffect(()=>{
  GetAllUsers();
},[]);
  return (
    <Container className="mt-5">
      <Row>
        <Col>
        <p className="text">If you try to send transaction without admin authority your all transaction will fail!!</p>
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
          <div className="form-group">
            <label>compareWithHardcodedHashes IPFS Hash:</label>
            <input
              type="text"
              className="form-control"
              value={ipfsHash}
              onChange={(e) => setIpfsHash(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={compareWithHardcodedHashes}
              className="mt-2"
            >
              compare IPFS Hash
            </Button>
          </div>
          {/* Display the user's documents */}
          {userDocuments.map((documentHash, index) => (
            <div key={index} className="document-item">
              
              <p>IPFS: https://ipfs.io/ipfs/{documentHash.documentHash}</p>
              {/* <p>{documentHash}</p> */}
              <input
                type="text"
                className="form-control"
                placeholder="input ipfs"
                value={verify}
                onChange={(e) => setVerify(e.target.value)}
              />
               <p>User Address: {documentHash.userAddress}</p>
              <input
                type="text"
                className="form-control"
                placeholder="input address"
                value={addresses}
                onChange={(e) => setAddresses(e.target.value)}
              />
              <Button
                // id={`verify-button-${documentHash}`}
                variant="success"
                onClick={ verifyDocument}
                className="verify-button"
              >
                Verify Document
              </Button>
            </div>
          ))}
          {/* Add other admin functionalities as needed */}
        </Col>
      </Row>
      <br />
      <Form>
      <Button className="getbt" onClick={GetAllUsers}>getAllUsers</Button>
        <div>
          <h2>User List</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
        <label>User Address: </label>
        <input
          type="text"
          placeholder="Enter user address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button className="getbt" variant="primary" onClick={getAllDocuments}>
          Get All Documents
        </Button>
        
      </Form>
      <Form>
        <Form.Group controlId="formNewAdmin">
          <Form.Label>New Admin Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new admin address"
            onChange={(e) => setNewAdminAddress(e.target.value)}
          />
        </Form.Group>
        <Button className="getbt" variant="success" onClick={changeAdmin}>
          Change Admin
        </Button>
      </Form>
      <br />
    </Container>
  );
};

export default AdminPanel;
