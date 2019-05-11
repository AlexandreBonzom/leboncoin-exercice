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
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmitSignUp = async event => {
    event.preventDefault();
    let isCorrect = true;
    if (this.state.password === this.state.confirmationPassword) {
      const body = {};

      if (this.state.email && this.state.password && this.state.username) {
        body.email = this.state.email;
        body.password = this.state.password;
        body.username = this.state.username;

        try {
          const result = await axios.post(
            "https://leboncoin-api-replica.herokuapp.com/user/sign_up",
            body
          );

          if (result.data.token) {
            await this.props.handleLogin(
              result.data.token,
              result.data._id,
              result.data.account.username
            );

            this.props.history.push("/");
          }
          if (result.data.message) {
            isCorrect = false;
            this.setState({ isCorrect: isCorrect });
          }
        } catch (error) {
          isCorrect = false;
          this.setState({ isCorrect: isCorrect });
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
        isCorrect = false;
        this.setState({ isCorrect: isCorrect });
      }
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
        <form className="page-width">
          <span className="create-account">Créer un compte</span>
          <span className="label">Adresse email*</span>
          <input
            className="input-fields"
            type="email"
            value={this.state.email}
            onChange={this.handleChangeForm}
            name="email"
          />
          <span className="label">Pseudo*</span>
          <input
            type="text"
            className="input-fields"
            value={this.state.username}
            onChange={this.handleChangeForm}
            name="username"
          />
          <span className="password-line">
            <span className="password-left">
              <span className="label">Mot de passe*</span>
              <input
                className="input-fields"
                type="password"
                value={this.state.password}
                onChange={this.handleChangeForm}
                name="password"
              />
            </span>
            <span className="password-right">
              {" "}
              <span className="label">Confirmer le mot de passe*</span>
              <input
                className="input-fields"
                type="password"
                value={this.state.confirmationPassword}
                onChange={this.handleChangeForm}
                name="confirmationPassword"
              />
            </span>
          </span>
          <input
            className="blue-button submit"
            type="submit"
            value="S'incrire"
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
