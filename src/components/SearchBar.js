import React from "react";

const SearchBar = props => {
  return (
    <div className="search-bar-container">
      <div className="page-width search-bar">
        <div className="left-side-searchbar">
          <input
            className="input-fields title-searched "
            type="text"
            placeholder="Que cherchez-vous?"
            value={props.title}
            name="titleSearched"
            onChange={props.handleChangeSearch}
          />
          <div>
            Prix entre{" "}
            <input
              className="input-fields "
              type="text"
              placeholder="Prix Minimum €"
              name="priceMin"
              value={props.priceMin}
              onChange={props.handleChangeSearch}
            />{" "}
            et{" "}
            <input
              type="text"
              className="input-fields"
              placeholder="Prix Maximum €"
              name="priceMax"
              value={props.priceMax}
              onChange={props.handleChangeSearch}
            />
          </div>
        </div>
        <div className="right-side-searchbar">
          <button className="blue-button" onClick={props.handleSearchClick}>
            Rechercher
          </button>
          <select
            name="sorted"
            value={props.sorted}
            onChange={props.handleChangeSearch}
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
};

export default SearchBar;
