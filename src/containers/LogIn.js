import React from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
    isCorrect: true
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
    try {
      const response = await axios.post(
        "https://leboncoin-api-replica.herokuapp.com/user/log_in",
        body
      );

      this.setState({ isCorrect: true });
      await this.props.handleLogin(
        response.data.token,
        response.data._id,
        response.data.account.username
      );
      this.props.history.push("/");
    } catch (error) {
      this.setState({ email: "", password: "", isCorrect: false });
    }
  };

  render() {
    if (!this.props.token) {
      return (
        <div className="log-in-container">
          <form className="page-width">
            <span className="connexion">Connexion</span>
            <span className="label">Adresse email </span>
            <input
              className="input-fields"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <span className="label">Mot de passe </span>
            <input
              className="input-fields"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input
              className="blue-button submit"
              type="submit"
              value="Se Connecter"
              onClick={
                !this.state.email || !this.state.password
                  ? event => event.preventDefault()
                  : this.handleSubmit
              }
            />
            <span
              className={
                this.state.isCorrect === true ? "not-display" : "display"
              }
            >
              Email ou mot de passe erroné.
            </span>
            <span className="label no-count"> Vous n'avez pas de compte</span>
            <button
              className="inverted-blue-button"
              onClick={event => event.preventDefault()}
            >
              {" "}
              <Link to="/sign_up">Créer un compte</Link>
            </button>
          </form>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default LogIn;
