import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import Web3 from "web3";
import abi from "../Document/abi.json";

const Transactions = ({ account }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState(""); // State for input field
  const [verifiedDocuments, setVerifiedDocuments] = useState([]);

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

  const getVerifiedDocuments = async () => {
    try {
      // Check if contract is not null
      if (!contract) {
        console.error("Contract not initialized");
        return;
      }

      // Fetch the user's documents from the smart contract
      const rawDocuments = await contract.methods
        .getVerifiedDocuments(userAddress)
        .call({ from: account });

      // Set the verified documents state
      setVerifiedDocuments(rawDocuments);
    } catch (error) {
      console.error("Error getting user documents:", error);
    }
  };

  return (
    <div>
      <Container>
        <Col>
          <Row>
            <input
              type="text"
              placeholder="Enter user address"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
            <button  variant="primary" onClick={getVerifiedDocuments}>
              Get Verified Documents
            </button>
            <div>
              <h2>Verified Documents for User: {account}</h2>
              {verifiedDocuments.length > 0 ? (
                <ul>
                  {verifiedDocuments.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              ) : (
                <p>No verified documents found for the user.</p>
              )}
            </div>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default Transactions;
