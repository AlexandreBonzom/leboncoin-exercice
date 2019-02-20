import React from "react";

class ProductArticle extends React.Component {
  renderImages = () => {
    if (this.props.productInfo.pictures.length > 0) {
      return (
        <div>
          <img
            src={this.props.productInfo.pictures[0].secure_url}
            alt="product-img"
          />
        </div>
      );
    }
  };
  render() {
    return (
      <div className="product-article">
        <div className="img-product">{this.renderImages()}</div>
        <div className="product-information">
          <div className="product-name">{this.props.productInfo.title}</div>

          <div className="product-price">
            {this.props.productInfo.price + " €"}
          </div>
          <div className="product-description">
            {this.props.productInfo.description}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductArticle;
