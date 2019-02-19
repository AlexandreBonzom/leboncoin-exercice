import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    if (this.props.isLoged) {
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
              <div className="header-tab">
                <Link to="/sign_up">Creer un compte</Link>
              </div>
              <div className="header-tab">
                <Link to="/log_in">Se Connecter</Link>
              </div>
            </div>
          </div>
        </header>
      );
    }
  }
}

export default Header;
