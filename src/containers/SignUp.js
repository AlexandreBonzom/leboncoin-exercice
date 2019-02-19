import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    confirmationPassword: "",
    username: ""
  };

  handleChangeForm = event => {
    const value = event.target.value;
    const name = event.target.name;
    const newState = {};
    newState[name] = value;

    this.setState(newState);
  };

  handleSubmitSignUp = async event => {
    event.preventDefault();
    if (this.state.password === this.state.confirmationPassword) {
      const body = {};
      body.email = this.state.email;
      body.password = this.state.password;
      body.username = this.state.username;

      await axios.post(
        "https://leboncoin-api.herokuapp.com/api/user/sign_up",
        body
      );

      this.setState({ email: "", password: "", username: "" });
    }
  };

  render() {
    return (
      <div className="sign_up-container">
        <form>
          <span>Adresse email</span>
          <input
            type="email"
            value={this.state.email}
            onChange={this.handleChangeForm}
            name="email"
          />
          <span>Pseudo</span>
          <input
            type="text"
            value={this.state.peusdo}
            onChange={this.handleChangeForm}
            name="username"
          />
          <span>Mot de passe</span>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChangeForm}
            name="password"
          />
          <span>Confirmer le mot de passe</span>
          <input
            type="password"
            value={this.state.confirmationPassword}
            onChange={this.handleChangeForm}
            name="confirmationPassword"
          />
          <input type="submit" onClick={this.handleSubmitSignUp} />
        </form>
      </div>
    );
  }
}

export default SignUp;
