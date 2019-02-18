import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <div className="search-bar-container">
        <div className="search-bar">
          <div className="left-side-searchbar">
            <input
              className="title-searched"
              type="text"
              placeholder="Que cherchez-vous?"
              value={this.props.title}
              name="titleSearched"
              onChange={this.props.handleChangeSearch}
            />
            <div>
              Prix entre{" "}
              <input
                type="text"
                placeholder="PriceMin"
                name="priceMin"
                value={this.props.priceMin}
                onChange={this.props.handleChangeSearch}
              />{" "}
              et{" "}
              <input
                type="text"
                placeholder="PriceMax"
                name="priceMax"
                value={this.props.priceMax}
                onChange={this.props.handleChangeSearch}
              />
            </div>
          </div>
          <div className="right-side-searchbar">
            <button onClick={this.props.handleSearchClick}>Rechercher</button>
            <select
              name="sorted"
              value={this.props.sorted}
              onChange={this.props.handleChangeSearch}
            >
              <option value="date-desc">Tri: Plus Récente</option>
              <option value="date-asc">Tri: Plus Ancienne</option>
              <option value="price-asc">Tri: Prix Croissant</option>
              <option value="price-desc">Tri: Prix Décroissant</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
