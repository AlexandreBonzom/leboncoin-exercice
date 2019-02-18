import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="page-container">
        <BrowserRouter>
          <>
            <Header />

            <Switch>
              <Route
                exact={true}
                path="/"
                render={props => <Home {...props} />}
              />
              <Route path="/offer/:id" render={props => <Offer {...props} />} />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
