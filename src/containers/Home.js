import React from "react";
import axios from "axios";
import ProductArticle from "../components/ProductArticle";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

class Home extends React.Component {
  state = {
    offers: [],
    page: 1,
    totalPages: 0,
    titleSearched: "",
    priceMin: "",
    priceMax: "",
    sorted: "date-desc"
  };
  componentDidMount = async () => {
    const result = await axios
      .get(
        `https://leboncoin-api-replica.herokuapp.com/offer/with-count?skip=0&limit=25&sort=${
          this.state.sorted
        }`
      )
      .then(response => response.data);

    const newOffers = result;
    if (newOffers) {
      const newTotalPages = Math.ceil(result.length / 25);
      this.setState({
        offers: newOffers,
        totalPages: newTotalPages
      });
    } else {
      this.setState({
        offers: newOffers,
        totalPages: 1
      });
    }
  };

  handleChangePage = page => {
    const newPage = page;
    this.setState({ page: newPage }, async () => {
      const response = await this.updateOffers();
      const newOffers = response;

      this.setState({
        offers: newOffers
      });
    });
  };
  handleChangeSearch = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const newState = {};
    if (name === "titleSearched") {
      newState.titleSearched = value;
    } else if (name === "priceMin" || name === "priceMax") {
      if (!isNaN(Number(value))) {
        newState[name] = value;
      }
    }
    if (name === "sorted") {
      newState[name] = value;

      this.setState(newState, async () => {
        const response = await this.updateOffers();

        const newOffers = response;
        this.setState({
          offers: newOffers
        });
      });
    } else {
      this.setState(newState);
    }
  };

  handleSearchClick = async () => {
    const response = await this.updateOffers();

    const newOffers = response;

    const newTotalPages = Math.ceil(response.length / 25);
    this.setState({
      offers: newOffers,
      totalPages: newTotalPages,
      titleSearched: "",
      priceMin: "",
      priceMax: ""
    });
  };

  updateOffers = async () => {
    const response = await axios
      .get(
        `https://leboncoin-api-replica.herokuapp.com/offer/with-count?title=${
          this.state.titleSearched
        }&priceMin=${this.state.priceMin}&priceMax=${
          this.state.priceMax
        }&skip=${25 * (this.state.page - 1)}&limit=25&sort=${this.state.sorted}`
      )
      .then(response => response.data);
    return response;
  };

  render() {
    if (this.state.offers.length > 0) {
      return (
        <div className="main-section">
          <SearchBar
            title={this.state.titleSearched}
            priceMin={this.state.priceMin}
            priceMax={this.state.priceMax}
            sorted={this.state.sorted}
            handleChangeSearch={this.handleChangeSearch}
            handleSearchClick={this.handleSearchClick}
          />
          <ul className="page-width product-list ">
            {this.state.offers.map(product => {
              return (
                <li key={product._id}>
                  <Link to={"offer/" + product._id}>
                    <ProductArticle productInfo={product} />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Pagination
            totalPages={this.state.totalPages}
            page={this.state.page}
            handleChangePage={this.handleChangePage}
          />
        </div>
      );
    } else {
      return (
        <div className="main-section">
          <SearchBar
            title={this.state.titleSearched}
            priceMin={this.state.priceMin}
            priceMax={this.state.priceMax}
            sorted={this.state.sorted}
            handleChangeSearch={this.handleChangeSearch}
            handleSearchClick={this.handleSearchClick}
          />{" "}
          <div className="page-width no-result">
            <span>
              Nous avons trouvé aucun résultat coresspondant à votre recherche.
            </span>
          </div>
        </div>
      );
    }
  }
}

export default Home;
