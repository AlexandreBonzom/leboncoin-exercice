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
    } catch (error) {
      this.setState({ email: "", password: "", isCorrect: false });
    }
  };

  render() {
    if (!this.props.token) {
      return (
        <div className="log-in-container">
          <form>
            <span className="connexion">Connexion</span>
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
            <input
              className="submit"
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
            <span className="no-count"> Vous n'avez pas de compte</span>
            <button>
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
