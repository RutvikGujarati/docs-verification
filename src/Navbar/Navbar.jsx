import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import "./Navbar.css";
import logooo from "./logooo.gif";
// import Home from "../Pages/Home/Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faAward,
  faIdCard,
  faCircleInfo,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import { type } from "@testing-library/user-event/dist/types/utility";

const Navbar = () => {
  return (
    <div className="Main-header">
      <div className="header1">
        <div className="logo">
          <Link to="/">
            <img
              src={logooo}
              type="video/gif/"
              autoPlay
              loop
              muted
              width={230}
              style={{ background: "transparent" }}
            />
          </Link>
        </div>

        <nav className="navbar">
          <div className="Home">
            <Link to="/">
              <i>
                <FontAwesomeIcon icon={faHouseChimney} />
              </i>{" "}
              Profile
            </Link>
          </div>

          <div className="Get-document">
            <Link to="/getdocument">
              <i>
                <FontAwesomeIcon icon={faIdCard} />
              </i>
              Upload Document
            </Link>
          </div>
          <div className="Issued-document">
            <Link to="/feeds">
              <i>
                <FontAwesomeIcon icon={faAward} />
              </i>
              My Documents
            </Link>
          </div>
          <div className="Help">
            <Link to="/help">
              <i>
                <FontAwesomeIcon icon={faLightbulb} />
              </i>
              Verified Docs
            </Link>
          </div>
          <div className="About">
            <Link to="/About">
              <i>
                <FontAwesomeIcon icon={faCircleInfo} />
              </i>
              About
            </Link>
          </div>
        </nav>

        <ConnectWallet className="buttonn" />
      </div>
    </div>
  );
};

export default Navbar;
