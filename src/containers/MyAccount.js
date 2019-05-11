import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ProductArticle from "../components/ProductArticle";

class MyAccount extends React.Component {
  state = {
    myOffers: []
  };

  handleDelete = async (offerId, index) => {
    let newOffers = [...this.state.myOffers];
    await axios.post(
      "https://leboncoin-api-replica.herokuapp.com/offer/delete",
      { id: offerId },

      {
        headers: { authorization: "Bearer " + this.props.token }
      }
    );

    newOffers.splice(index, 1);
    this.setState({ myOffers: newOffers });
  };

  renderMyOffers = () => {
    if (this.state.myOffers.length > 0) {
      return this.state.myOffers.map((offer, index) => {
        return (
          <li className="list-parent" key={offer._id}>
            <Link to={"offer/" + offer._id}>
              <ProductArticle productInfo={offer} isEllipsis={true} />
            </Link>
            <div
              className="blue-button delete-button"
              onClick={() => this.handleDelete(offer._id, index)}
            >
              <i className="fas fa-trash-alt" />
              {"  "}
              SUPPRIMER
            </div>
          </li>
        );
      });
    } else {
      return (
        <div className="my-offer-null">
          <span>Vous n'avez encore aucune annonce.</span>
          <span className="go-to-publish">
            <Link to={"publish"}>Poster une annonce</Link>
          </span>
        </div>
      );
    }
  };

  componentDidMount = async () => {
    const response = await axios.get(
      "https://leboncoin-api-replica.herokuapp.com/user/my_offers/",

      {
        headers: { authorization: "Bearer " + this.props.token }
      }
    );

    this.setState({ myOffers: response.data });
  };

  render() {
    return (
      <div className="profile-container">
        <div className="page-width">
          <div className="resume-my-offers">
            <span className="my-offers">Mes Annonces</span>
            <ul>{this.renderMyOffers()}</ul>
          </div>
          <div className="user-profile-card">
            <i className="fas fa-user-circle fa-3x" />
            {this.props.username}
          </div>
        </div>
      </div>
    );
  }
}

export default MyAccount;
