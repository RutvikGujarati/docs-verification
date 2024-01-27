import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Account, Web3Button, useContract } from "@thirdweb-dev/react";
import abi from "../Document/abi.json";
import Web3 from "web3";

const Transactions = ({ account }) => {
  const [verifiedDocuments, setVerifiedDocuments] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const getVerifiedDocuments = async () => {
    try {
      // Call the verifiedDocs function from the smart contract
      const verifiedDocs = await contract.methods
        .verifiedDocs()
        .call({ from: account });
      setVerifiedDocuments(verifiedDocs);
      console.log("Verified Documents:", verifiedDocs);
    } catch (error) {
      console.error("Error getting verified documents:", error);
    }
  };
  return (
    <div>
      <Container>
        <Col>
          <Row>
          <div className="mt-4">
            <Button variant="info" onClick={getVerifiedDocuments}>
              Get Verified Documents
            </Button>
          </div>
            <ListGroup className="mt-4">
              <ListGroup.Item>
                <strong>Verified Documents:</strong>
              </ListGroup.Item>
              {verifiedDocuments.map((hash, index) => (
                <ListGroup.Item key={index}>{hash}</ListGroup.Item>
              ))}
            </ListGroup>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default Transactions;
