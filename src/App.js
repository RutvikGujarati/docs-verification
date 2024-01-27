import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAddress } from "@thirdweb-dev/react";
import Connect from "./Pages/Connect/Connect"; // Import the "Connect Wallet" button component
import "./styles/Home.css";
import Navbar from "./Navbar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Vault from "./Pages/vault/Vault";
import Document from "./Pages/Document/Document";
import Web3Button from "./web3button";
import Transactions from "./Pages/Transactions/Transactions";
import IPFSComponent from "./Pages/Document/ipfs";
import Web3Component from "./Pages/Document/web3";
// import { Web3Button } from "@thirdweb-dev/react/dist/thirdweb-dev-react.cjs";
// import Web3Button from "./web3button";

export default function App() {
  const { address, isConnected } = useAddress() || {};
  const [isWalletConnected, setIsWalletConnected] = useState(isConnected); // Initialize with the Metamask connection status

  useEffect(() => {
    if (isConnected) {
      setIsWalletConnected(true);
      // Define a getBalance function here to retrieve the user's balance
      // Example: const getBalance = () => { ... };
      getBalance();
    }
  }, [isConnected, address]);

  return (
    <main className="main">
    <div className="container">
      <BrowserRouter>
        {isWalletConnected ? (
          <div>
            <Navbar />
            <Routes>
              {/* <Route path="/" element={<Connect />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About  contractAddress={0x27eE91d6aA1E1EAa7F5bfe86069d4f97a3d7D752}/>} />
              <Route path="/getdocument" element={<Vault />} />
              <Route path="/feeds" element={<Document />} />
              <Route path="/help" element={<Transactions />} />
              <Route path="/ipfs" element={<IPFSComponent />} />
              <Route path="/web3" element={<Web3Component />} />
              {/* <Route path="/A" element={<Web3Button />} /> */}
            </Routes>
          </div>
        ) : null} {/* Render nothing when wallet is connected */}
        
        {/* Render the Connect component only when wallet is not connected */}
        {!isWalletConnected && (
          <div>
            <Connect
              onConnect={() => setIsWalletConnected(true)}
            />
          </div>
        )}
      </BrowserRouter>
    </div>
  </main>
    );
}
