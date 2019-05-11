import React from "react";
import { Link, withRouter } from "react-router-dom";

const Header = props => {
  const renderLogInOut = () => {
    if (props.token) {
      return (
        <div className="right-header">
          {" "}
          <Link to="/my_account">
            <div
              className={
                props.location.pathname === "/my_account"
                  ? "header-tab currenttab"
                  : "header-tab"
              }
            >
              <i className="fas fa-user-circle fa-2x" />
              <span>{props.username}</span>
            </div>{" "}
          </Link>
          <div className="header-tab" onClick={props.handleLogOut}>
            Se Deconnecter
          </div>
        </div>
      );
    } else {
      return (
        <div className="right-header">
          {" "}
          <div
            className={
              props.location.pathname === "/sign_up"
                ? "header-tab currenttab"
                : "header-tab"
            }
          >
            <Link to="/sign_up">Creer un compte</Link>
          </div>
          <div
            className={
              props.location.pathname === "/log_in"
                ? "header-tab currenttab"
                : "header-tab"
            }
          >
            <Link to="/log_in">Se Connecter</Link>
          </div>
        </div>
      );
    }
  };

  return (
    <header>
      <div className="page-width header">
        <div className="left-header">
          <div className="logo-leboncoin">
            <Link to="/">
              <img
                src="https://weborama.com/wp-content/uploads/2017/08/leboncoin-logo-blanc.png"
                alt="logo-leboncoin"
              />
            </Link>
          </div>{" "}
          <div
            className={
              props.location.pathname === "/publish"
                ? "header-tab currenttab"
                : "header-tab"
            }
          >
            <Link to="/publish">Déposer une annonce</Link>
          </div>
          <div
            className={
              props.location.pathname === "/"
                ? "header-tab currenttab"
                : "header-tab"
            }
          >
            <Link to="/">Offres </Link>
          </div>
        </div>
        {renderLogInOut()}
      </div>
    </header>
  );
};

export default withRouter(Header);
