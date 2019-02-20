import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ProductArticle from "../components/ProductArticle";
import Pagination from "../components/Pagination";

class MyAccount extends React.Component {
  state = {
    myOffers: []
  };

  renderMyOffers = () => {
    if (this.state.myOffers.length > 0) {
      return this.state.myOffers.map((offer, index) => {
        return (
          <li key={offer._id}>
            <Link to={"offer/" + offer._id}>
              <ProductArticle productInfo={offer} />
            </Link>
          </li>
        );
      });
    }
  };

  componentDidMount = async () => {
    const response = await axios.get(
      "https://leboncoin-api.herokuapp.com/api/offer/my-offers",

      {
        headers: { authorization: "Bearer " + this.props.token }
      }
    );

    this.setState({ myOffers: response.data });
  };

  render() {
    return (
      <div className="profile-container">
        <div className="profile">
          <div className="resume-my-offers">
            <span className="my-offers">Mes Annonces</span>
            <ul>{this.renderMyOffers()}</ul>
            <Pagination
              totalPages={this.state.totalPages}
              page={this.state.page}
              handleChangePage={this.handleChangePage}
            />
          </div>
          <div className="offer-creator">
            <i className="fas fa-user-circle fa-3x" />
            {this.props.username}
          </div>
        </div>
      </div>
    );
  }
}

export default MyAccount;
