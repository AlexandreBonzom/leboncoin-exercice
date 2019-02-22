import React from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

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
  renderImages = () => {
    console.log(this.state.product.pictures.length);
    if (this.state.product.pictures.length > 1) {
      return (
        <Carousel>
          {this.state.product.pictures.map((picture, index) => {
            return (
              <div key={index}>
                <img
                  src={picture.secure_url}
                  alt={"product-picture " + index}
                />
              </div>
            );
          })}
        </Carousel>
      );
    } else if (
      this.state.product.pictures.length === 1 &&
      this.state.product.pictures[0]
    ) {
      return (
        <img
          className="unique-image"
          src={this.state.product.pictures[0].secure_url}
          alt={"product-picture"}
        />
      );
    }
  };

  render() {
    if (this.state.product.hasOwnProperty("title")) {
      return (
        <div className="offer">
          <div className="offer-product">
            <div>
              <div className="offer-picture">{this.renderImages()}</div>
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
