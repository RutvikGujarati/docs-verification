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
  const [documentHash, setDocumentHash] = useState();
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

  const fetchMyDocuments = async () => {
    try {
        setLoading(true);
        if (contract && account) {
            const myDocumentsResponse = await contract.methods.getMyDocuments().call({ from: account });
            console.log("My Documents Response:", myDocumentsResponse);

            // Check if myDocumentsResponse is an array
            if (Array.isArray(myDocumentsResponse)) {
                setMyDocuments(myDocumentsResponse);
            } else {
                console.error("Invalid response format for myDocuments");
            }
        } else {
            console.error("Contract or account not available");
        }
    } catch (error) {
        setError("Error getting my documents: " + error.message);
    } finally {
        setLoading(false);
    }
};
 const filterUserHashes = () => {
    // Filter the myDocuments array to include only the hashes related to the current user
    const userHashes = myDocuments.filter(document => document.userAddress === account)
                                  .map(document => document.documentHash);
    setDocumentHash(userHashes);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>My Uploaded Documents</h1>
          <div className="mt-4">
            <Web3Button
              contractAddress="0x8e1f81cFC04DDFd842Db7469f873b0ee5ef6fF8D"
              contractAbi={abi}
              action={fetchMyDocuments}
            >
              myDocs
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
                  <li>
                    <div>
                      <strong>Account :</strong> {index}
                    </div>
                    <div>
                      <strong>Document Hash:</strong> {hash}
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
