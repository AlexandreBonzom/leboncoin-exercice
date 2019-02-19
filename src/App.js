import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import SignUp from "./containers/SignUp";
import Header from "./components/Header";
import LogIn from "./containers/LogIn";
import Cookies from "js-cookie";

import "./App.css";

class App extends Component {
  state = {
    userId: Cookies.get("user_id") || "",
    token: Cookies.get("token") || "",
    username: Cookies.get("username") || ""
  };

  handleLogIn = (token, userId, username) => {
    const newToken = Cookies.set("token", token);
    const newUserId = Cookies.set("user_id", userId);
    const newUsername = Cookies.set("username", username);
    this.setState({
      userId: newUserId,
      token,
      newToken,
      username: newUsername
    });
  };

  render() {
    if (this.state.token) {
      return (
        <div className="page-container">
          <BrowserRouter>
            <>
              <Header isLoged={true} />

              <Switch>
                <Route
                  exact={true}
                  path="/"
                  render={props => <Home {...props} />}
                />
                <Route
                  path="/offer/:id"
                  render={props => <Offer {...props} />}
                />
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
