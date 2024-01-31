import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Web3Button, useContract } from "@thirdweb-dev/react";
import abi from "./abi.json";
import Web3 from "web3";

// ... (existing imports)

const MyDocument = ({ account }) => {
  const [myDocuments, setMyDocuments] = useState([]);
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

  const fetchMyDocuments = async () => {
    try {
      setLoading(true);
      if (contract && account) {
        const myDocumentsResponse = await contract.methods
          .getMyAllDocuments()
          .call({ from: account });
        console.log("My Documents Response:", myDocumentsResponse);

        // Check if myDocumentsResponse is an array
        // if (Array.isArray(myDocumentsResponse)) {
        setMyDocuments(myDocumentsResponse);
        // console.log('array res')
        // } else {
        //   console.error("Invalid response format for myDocuments");
        // }
      } else {
        console.error("Contract or account not available");
      }
    } catch (error) {
      setError("Error getting my documents: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  async function Register() {
    try {
      setLoading(true);
      if (contract && account) {
        let result = await contract.methods
          .registerUser()
          .send({ from: account });
        alert("user registered!!",result);
      } else {
        console.error("Contract or account not available");
      }
    } catch (error) {
      setError("Error getting my documents: " + error.message);
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>My Uploaded Documents</h1>
          <div className="mt-4">
            <Web3Button
              contractAddress="0x64239BDC9F285CE26848F80b9BB976e99E428Cbe"
              contractAbi={abi}
              action={fetchMyDocuments}
            >
              myDocs
            </Web3Button>
          </div>
          <div className="mt-4">
            <p>Register as a User for sending documents to admin for verification </p>
            <Web3Button
              contractAddress="0x64239BDC9F285CE26848F80b9BB976e99E428Cbe"
              contractAbi={abi}
              action={Register}
            >
              Register
            </Web3Button>
          </div>
          <ListGroup className="mt-4">
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div>
              <h3>My Documents:</h3>
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : myDocuments.length > 0 ? (
              <ul>
                {myDocuments.map((hash, index) => (
                  <li key={index}>
                    <div>
                      <strong>Document Hash:</strong>{" "}
                      {`https://ipfs.io/ipfs/${hash}`}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No documents found.</div>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MyDocument;
