import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header">
          <div className="left-header">
            <div className="logo-leboncoin">
              <Link to="/">
                <img
                  src="https://weborama.com/wp-content/uploads/2017/08/leboncoin-logo-blanc.png"
                  alt="logo-leboncoin"
                />
              </Link>
            </div>{" "}
            <div className="header-tab">Deposer une annonce</div>
            <div className="header-tab">
              <Link to="/">Offres </Link>
            </div>
          </div>
          <div className="right-header">
            {" "}
            <div className="header-tab">Creer un compte</div>
            <div className="header-tab">Se Connecter</div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
