import React from "react";
import axios from "axios";

class Offer extends React.Component {
  state = {
    product: {}
  };

  componentDidMount = async () => {
    const response = await axios
      .get(
        `https://leboncoin-api.herokuapp.com/api/offer/${
          this.props.match.params.id
        }`
      )
      .then(response => response.data);
    this.setState({ product: response });
  };

  render() {
    if (this.state.product.hasOwnProperty("title")) {
      return (
        <div className="offer">
          <div className="offer-product">
            <div>
              <div className="offer-picture">
                <img src="" alt="product-img" />
              </div>
              <div className="main-information-offer">
                <span className="offer-title"> {this.state.product.title}</span>

                <span className="offer-price">
                  {this.state.product.price + " €"}
                </span>
              </div>
            </div>
            <div className="offer-desciption-part">
              {" "}
              <h3>Description</h3>
              <div>{this.state.product.description}</div>
            </div>
          </div>
          <div className="offer-creator">
            <i className="fas fa-user-circle fa-3x" />
            {this.state.product.creator.account.username}
          </div>
        </div>
      );
    } else {
      return <div className="offer">Chargement de la page</div>;
    }
  }
}

export default Offer;
