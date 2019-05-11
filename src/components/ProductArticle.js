import React from "react";

const ProductArticle = props => {
  const renderImages = () => {
    if (props.productInfo.pictures.length > 0) {
      return (
        <div>
          <img src={props.productInfo.pictures[0]} alt="product-img" />
        </div>
      );
    }
  };

  return (
    <div className="product-article">
      <div className="img-product">{renderImages()}</div>
      <div className="product-information">
        <div className="product-name">{props.productInfo.title}</div>

        <div className="product-price">{props.productInfo.price + " €"}</div>
        <div
          className={
            props.isEllipsis
              ? "product-description ellipsis"
              : "product-description"
          }
        >
          {props.productInfo.description}
        </div>
      </div>
    </div>
  );
};

export default ProductArticle;
