import React from "react";

class ProductArticle extends React.Component {
  render() {
    return (
      <div className="product-article">
        <div className="img-product" />
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
