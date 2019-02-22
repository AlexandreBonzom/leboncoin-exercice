import axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";
import ReactFileReader from "react-file-reader";

class Publish extends React.Component {
  state = {
    price: "",
    title: "",
    description: "",
    files: []
  };

  handleChange = event => {
    const name = event.target.name;
    let value = event.target.value;
    const newState = {};

    if (name === "price") {
      if (!isNaN(Number(value))) {
        value = Number(value);
        newState[name] = value;
      }
    } else {
      newState[name] = value;
    }

    this.setState(newState);
  };

  handleClick = async () => {
    const newBody = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      files: this.state.files
    };
    await axios.post(
      `https://leboncoin-api-replica.herokuapp.com/offer/publish`,
      newBody,
      { headers: { authorization: "Bearer " + this.props.token } }
    );
    this.setState({ title: "", description: "", price: "" });
    this.props.history.push("/");
  };

  handleFiles = files => {
    const newFiles = [...this.state.files, ...files.base64];
    this.setState({
      files: newFiles
    });
  };

  render() {
    const filesArray = [];
    for (let i = 0; i < this.state.files.length; i++) {
      filesArray.push(
        <li key={i}>
          <div className="image-article">
            <img src={this.state.files[i]} alt="Annonce" />
            <i
              class="fas fa-times-circle"
              onClick={() => {
                // En cliquant sur l'image, le fichier sera supprimé
                const newFiles = [...this.state.files];
                newFiles.splice(i, 1);
                this.setState({ files: newFiles });
              }}
            />
          </div>
        </li>
      );
    }
    if (this.props.token) {
      return (
        <div className="publish-container">
          <div className="publication">
            <span className="header-publication">Votre annonce</span>
            <div className="main-info-publication">
              <span>Titre de l'annonce</span>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <span>Texte de l'annonce</span>
              <textarea
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                rows="11"
              />
              <span>Prix</span>
              <input
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
              <ul> {filesArray}</ul>

              <ReactFileReader
                fileTypes={[".png", ".jpg"]}
                base64={true}
                multipleFiles={true} // `false si une seule image`
                handleFiles={this.handleFiles}
              >
                <span className="add-files">Charger des photos...</span>
              </ReactFileReader>

              <button onClick={this.handleClick}>Publier l'annonce</button>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/log_in" />;
    }
  }
}

export default Publish;
