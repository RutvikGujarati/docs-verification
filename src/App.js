import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAddress } from "@thirdweb-dev/react";
import Connect from "./Pages/Connect/Connect"; // Import the "Connect Wallet" button component
import "./styles/Home.css";
import Navbar from "./Navbar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Vault from "./Pages/vault/Vault";
import MyDocument from "./Pages/Document/Document";
import Web3Button from "./web3button";
import Transactions from "./Pages/Transactions/Transactions";
import AdminPanel from "./Pages/Admin";

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

  const account = useAddress();
  const contract = "0x8e1f81cFC04DDFd842Db7469f873b0ee5ef6fF8D"
  return (
    <main className="main">
    <div className="container2">
      <BrowserRouter>
        {isWalletConnected ? (
          <div>
            <Navbar />
            <Routes>
              {/* <Route path="/" element={<Connect />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/getdocument" element={<Vault />} />

              <Route path="/feeds" element={<MyDocument contract={contract
              } account={account} />} />

              {/* <Route path="/feeds" element={<MyDocument />} /> */}

              <Route path="/Verified" element={<Transactions />} />
              <Route path = "/Admin" element={<AdminPanel account={account}/>} />
  
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
