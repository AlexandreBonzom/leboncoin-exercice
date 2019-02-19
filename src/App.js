import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import SignUp from "./containers/SignUp";
import Header from "./components/Header";
import LogIn from "./containers/LogIn";

import Cookies from "js-cookie";
import Profile from "./containers/Profile";

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
    if (this.state.token) {
      return (
        <div className="page-container">
          <BrowserRouter>
            <>
              <Header
                isLoged={true}
                username={this.state.username}
                handleLogOut={this.handleLogOut}
              />

              <Switch>
                <Route
                  exact={true}
                  path="/"
                  render={props => <Home {...props} token={this.state.token} />}
                />
                <Route
                  path="/offer/:id"
                  render={props => <Offer {...props} />}
                />

                <Route
                  path="/profile/:id"
                  render={props => <Profile {...props} />}
                />
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
              </Switch>
            </>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div className="page-container">
          <BrowserRouter>
            <>
              <Header isLoged={false} />

              <Switch>
                <Route
                  exact={true}
                  path="/"
                  render={props => <Home {...props} />}
                />
                <Route
                  path="/sign_up"
                  render={props => <SignUp {...props} />}
                />
                <Route
                  path="/log_in"
                  render={props => (
                    <LogIn {...props} handleLogin={this.handleLogIn} />
                  )}
                />
              </Switch>
            </>
          </BrowserRouter>
        </div>
      );
    }
  }
}

export default App;
