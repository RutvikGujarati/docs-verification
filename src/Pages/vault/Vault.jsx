import React, { useState } from "react";
import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import axios from "axios";
import "./Vault.css";
import abi from "./FileStorage.json";

const apiKey = "e9417699d08e7376e68f";
const apiSecretKey =
  "238e6574edcad9dfdcbfa0f0bc3dffd7f3bf764f533a6fe737d0852266bb2f58";

function Vault() {
  const { contract } = useContract(
    "0x97486276Db11aD47d81298828A7DE0eA78F32D6A"
  );
  const { mutateAsync: uploadFile, isLoading } = useContractWrite(
    contract,
    "uploadFile"
  );

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const files = form[0].files;
   
    if (!files || files.length === 0) {
       return alert("No files selected");
    }
   
    const file = files[0];
   
    const formData = new FormData();
    formData.append("file", file);
   
    try {
       const response = await axios.post(
         "https://api.pinata.cloud/pinning/pinFileToIPFS",
         formData,
         {
           headers: {
             pinata_api_key: apiKey,
             pinata_secret_api_key: apiSecretKey,
             "Content-Type": "multipart/form-data",
           },
         }
       );
   
       const ipfsCid = response.data.IpfsHash;
       const fileName = file.name;
   
       setUploadedFiles((prevFiles) => [
         ...prevFiles,
         {
           cid: ipfsCid,
           name: fileName,
         },
       ]);
   
       // Call the uploadFile function here with the ipfsCid as an argument
       await uploadFile(ipfsCid, true);
   
       form.reset();
    } catch (error) {
       console.error("Error uploading to IPFS:", error);
    }
   };
   const onSubmitHandlerBlockchain = async () => {
    if (!uploadedFiles.length) {
       return alert("No files uploaded to IPFS");
    }
   
    const lastUploadedFile = uploadedFiles[uploadedFiles.length - 1];
    const ipfsCid = lastUploadedFile.cid;
   
    try {
       await uploadFile({ args: [ipfsCid, true] });
    } catch (error) {
       console.error("Error uploading to blockchain:", error);
    }
   };
  const handleDelete = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  return (
    <div className="app">
      <div className="app__container">
        <div className="container">
          <h1>IPFS Uploader</h1>
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="file-upload" className="custom-file-upload">
              Select File ⬇️
            </label>
            <input
              id="file-upload"
              type="file"
              name="file"
              disabled={isLoading}
            />
            {selectedFile && <p>Selected File: {selectedFile.name}</p>}
            <button className="buttonn" type="submit" disabled={isLoading}>
              {isLoading ? 'Uploading...' : 'Upload to IPFS⬇️'}
            </button>
            <Web3Button 
            className="buttonn"
             contractAddress="0x97486276Db11aD47d81298828A7DE0eA78F32D6A"
             contractAbi={abi}
             action={ onSubmitHandlerBlockchain}
             >
              {isLoading ? "Uploading..." : "Upload To Blockchain"}
            </Web3Button>
          </form>
        </div>
        <div className="data">
          {uploadedFiles.map((file, index) => (
            <div key={file.cid + index}>
              {/* <img
                className="image"
                alt={`Uploaded #${index + 1}`}
                src={`https://ipfs.io/ipfs/${file.cid}`}
                style={{ maxWidth: "400px", margin: "15px" }}
              /> */}
              <div className="ipfs-link-box">
                <h4>File Name: {file.name}</h4>
                <h4>Link to IPFS:</h4>
                <a
                  href={`https://ipfs.io/ipfs/${file.cid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>{`https://ipfs.io/ipfs/${file.cid}`}</h3>
                </a>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vault;

// import React, { useState } from 'react';
// import { useContract, useContractWrite } from "@thirdweb-dev/react";

// function Vault() {
//   const { contract } = useContract("0x8d2e76eA008a4714b4c59F4540DE5d02ce8afC79"); // Replace with your contract address
//   const { mutateAsync: uploadFile, isLoading } = useContractWrite(contract, "uploadFile");

//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       return;
//     }

//     try {
//       // Upload selected file to IPFS and get the generated IPFS hash
//       const ipfsHash = await uploadToIPFS(selectedFile);

//       // Call the smart contract's uploadFile function with the IPFS hash and other data
//       await callContractUpload(ipfsHash, true);

//       // Do any additional logic you need after the file is uploaded and the transaction is confirmed
//     } catch (error) {
//       console.error('Error uploading file to IPFS and Ethereum:', error);
//     }
//   };

//   const uploadToIPFS = async (file) => {
//     // Implement your IPFS upload logic using a library like ipfs-http-client
//     // Return the IPFS hash
//     // ...
//   };

//   const callContractUpload = async (ipfsHash, isPublic) => {
//     try {
//       // Call the uploadFile function of your Solidity smart contract
//       const data = await uploadFile(ipfsHash, isPublic); // Pass the arguments directly

//       // Log success message or handle the response
//       console.info("Contract call success", data);
//     } catch (err) {
//       // Handle contract call failure
//       console.error("Contract call failure", err);
//     }
//   };

//   return (
//     <div>
//       {/* File selection input */}
//       <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />

//       {/* Upload button */}
//       <button onClick={handleFileUpload} disabled={isLoading}>
//         {isLoading ? 'Uploading...' : 'Upload to IPFS and Ethereum'}
//       </button>
//     </div>
//   );
// }

// export default Vault;
