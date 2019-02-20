import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import SignUp from "./containers/SignUp";
import Header from "./components/Header";
import LogIn from "./containers/LogIn";
import Publish from "./containers/Publish";
import Cookies from "js-cookie";

import MyAccount from "./containers/MyAccount";

import "./App.css";

class App extends Component {
  state = {
    userId: Cookies.get("user_id") || "",
    token: Cookies.get("token") || "",
    username: Cookies.get("username") || ""
  };

  handleLogIn = (token, userId, username) => {
    Cookies.set("token", token);
    Cookies.set("user_id", userId);
    Cookies.set("username", username);
    this.setState({
      userId: Cookies.get("token"),
      token: Cookies.get("token"),
      username: Cookies.get("username")
    });
  };

  handleLogOut = () => {
    Cookies.remove("user_id");
    Cookies.remove("token");
    Cookies.remove("username");

    this.setState({
      userId: "",
      token: "",
      username: ""
    });
  };

  render() {
    return (
      <div className="page-container">
        <BrowserRouter>
          <>
            <Header
              username={this.state.username}
              handleLogOut={this.handleLogOut}
              token={this.state.token}
            />

            <Switch>
              <Route
                exact={true}
                path="/"
                render={props => <Home {...props} token={this.state.token} />}
              />
              <Route path="/sign_up" render={props => <SignUp {...props} />} />
              <Route path="/offer/:id" render={props => <Offer {...props} />} />
              <Route
                path="/log_in"
                render={props => (
                  <LogIn
                    {...props}
                    handleLogin={this.handleLogIn}
                    token={this.state.token}
                  />
                )}
              />

              <Route
                path="/publish"
                render={props => (
                  <Publish {...props} token={this.state.token} />
                )}
              />
              <Route
                path="/my_account"
                render={props => (
                  <MyAccount
                    {...props}
                    token={this.state.token}
                    username={this.state.username}
                  />
                )}
              />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
