import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    confirmationPassword: "",
    username: "",
    isCorrect: true,
    isIdentical: true
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
    let isCorrect = true;
    if (this.state.password === this.state.confirmationPassword) {
      const body = {};
      body.email = this.state.email;
      body.password = this.state.password;
      body.username = this.state.username;
      try {
        await axios.post(
          "https://leboncoin-api-replica.herokuapp.com/user/sign_up",
          body
        );
      } catch (error) {
        isCorrect = false;
      }
      this.setState({
        email: "",
        password: "",
        username: "",
        confirmationPassword: "",
        isCorrect: isCorrect,
        isIdentical: true
      });
    } else {
      this.setState({
        isIdentical: false,
        password: "",
        confirmationPassword: ""
      });
    }
  };

  render() {
    return (
      <div className="sign_up-container">
        <form>
          <span className="create-account">Créer un compte</span>
          <span>Adresse email*</span>
          <input
            type="email"
            value={this.state.email}
            onChange={this.handleChangeForm}
            name="email"
          />
          <span>Pseudo*</span>
          <input
            type="text"
            value={this.state.peusdo}
            onChange={this.handleChangeForm}
            name="username"
          />
          <span className="password-line">
            <span className="password-left">
              <span>Mot de passe*</span>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleChangeForm}
                name="password"
              />
            </span>
            <span className="password-right">
              {" "}
              <span>Confirmer le mot de passe*</span>
              <input
                type="password"
                value={this.state.confirmationPassword}
                onChange={this.handleChangeForm}
                name="confirmationPassword"
              />
            </span>
          </span>
          <input
            type="submit"
            value="S'incrire"
            className="submit"
            onClick={this.handleSubmitSignUp}
          />
          <span
            className={
              this.state.isCorrect === true ? "not-display" : "display"
            }
          >
            Email deja existant ou information manquante.
          </span>
          <span
            className={
              this.state.isIdentical === true
                ? "not-display-pwd"
                : "display-pwd"
            }
          >
            Vous n'avez pas entré le même mot de passe.
          </span>
        </form>
      </div>
    );
  }
}

export default SignUp;
