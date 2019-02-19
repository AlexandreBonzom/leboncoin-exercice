import React from "react";
import axios from "axios";

class LogIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    const newState = {};
    newState[name] = value;

    this.setState(newState);
  };

  handleSubmit = async event => {
    event.preventDefault();
    const body = {};
    body.email = this.state.email;
    body.password = this.state.password;
    const response = await axios.post(
      "https://leboncoin-api.herokuapp.com/api/user/log_in",
      body
    );

    this.props.handleLogin(
      response.data.token,
      response.data._id,
      response.data.account.username
    );
    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <div className="">
        <form>
          <span>Adresse email </span>
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <span>Mot de passe </span>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input type="submit" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

export default LogIn;
