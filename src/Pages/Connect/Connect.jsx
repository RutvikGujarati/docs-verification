import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import './Connect.css';
import logo from "./logooo.gif";
import image1 from "./post1.jpg";
import image2 from "./path.png";
import image3 from "./teamwork.png";
import image4 from "./documents.png";
import image5 from "./post3.jpg";
import image6 from "./post4.jpg";
import logooo from'./logooo.gif';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {fafacebook } from "@fortawesome/free-solid-svg-icons";



function Connect({ onConnect }) {
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Call the onConnect callback when the wallet is successfully connected
        onConnect();
      } else {
        alert("Please install Metamask or another Ethereum wallet to connect.");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  return (


    <>
    <body className="body">
      <div className="header">
        <div className="homelogo">
          <img src={logo} type="video/gif/" autoplay loop muted width={230} style={{background: "transparent"}} alt="Logo" />
        </div>
        <div className="homebutton">
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      </div>
      <div className="bannerleft">
        <div className="bannerimg">
           <img src={image1} alt="Logo" />
        </div>
        <div className="bannertext">
            <h1> A Blockchain-based E-VAULT</h1>
            <p>
            It is a digital vault that uses blockchain technology to store and protect data. Blockchain is a distributed ledger technology that allows for secure, tamper-proof transactions. This makes it ideal for storing sensitive data, such as financial records, medical records, and legal documents.
            </p>
        </div>
      </div>
      <div className="bannerright">
        <div className="bannertext">
            <h1> Building a better world.</h1>
            <p>
            Blockchain is one of the major tech stories of the past decade. Everyone seems to be talking about it-but beneath the surface chatter there’s not always a clear understanding of what blockchain is or how it works. Despite its reputation for impenetrability, the basic idea behind blockchain is pretty simple. And it has major potential to change industries from the bottom up.
            </p>
        </div>
        <div className="bannerimg">
           <img src={image5} alt="Logo" />
        </div>
      </div>
      <div className="bannerleft">
        <div className="bannerimg">
           <img src={image6} alt="Logo" height={417} />
        </div>
        <div className="bannertext">
            <h1>Secure and private data sharing.</h1>
            <p>
            It is a digital vault that uses blockchain technology to store and protect data. Blockchain is a distributed ledger technology that allows for secure, tamper-proof transactions. This makes it ideal for storing sensitive data, such as financial records, medical records, and legal documents.
            </p>
        </div>
      </div>
      <div className="concept">
         <div className="conceptflex">
            <div className="concepttext">
                <h1>Secure Your Digital Assets with Our E-Vault</h1>
                <p>In today's digital world, our most important assets are often stored online. This includes everything from financial documents to personal photos and videos. Unfortunately, this also makes our digital assets vulnerable to cyberattacks.</p>
            </div>
            <div className="conceptimg">
                <div className="conceptuser">
                    <img src={image3} alt="People" />  
                    <h1>User registration</h1>      
                    <h5>on our E-vault</h5> 
                </div>
                <div className="conceptuser"> 
                    <img src={image4} alt="Logo" />
<h1>Upload Documents</h1>      
                    <h5>on our E-vault</h5>   
                </div>

            </div>
        </div>


      </div>
      <div className="roadmap">
      <img src={image2} alt="Logo" />
      </div>

      <div className="footer">
        <h1>Let's Experience Something New With Our Digital Blockchain Based Platform With Us.</h1>
        <div className="homebuttonbottom">
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>

      </div>
        <footer className="footer-distributed">
      <div className="footer-left">
      <img src={logooo} type="video/gif/" autoPlay loop muted width={230}/>
        <br /><br /><br /><br />
        <p className="footer-company-name">Copy rights by Safe heaven © 2023</p>
      </div>
      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p><span>Safe Heaven</span> Evault</p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p>+91 8320489623</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="mailto:support@company.com">safeheaven@gmail.com</a></p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>About </span>
          A blockchain-based e-vault is a secure digital repository that leverages blockchain technology to store and manage electronic documents with immutable records, ensuring data integrity and controlled access.
        </p>
        <div className="footer-icons">
          {/* <a href="#"><i className="fa fa-facebook"><FontAwesomeIcon icon={fafacebook /></i></a> */}
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
          <a href="#"><i className="fa fa-github"></i></a>
        </div>
      </div>
    </footer>
    </body>
    
    
    </>
  );
}

export default Connect;