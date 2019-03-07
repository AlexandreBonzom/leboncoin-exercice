import React from "react";

class Pagination extends React.Component {
  renderPagination = () => {
    let totalPages = this.props.totalPages;
    const arrayPage = [];

    if (totalPages > 19) {
      totalPages = 19;
    }
    for (let i = 1; i <= totalPages; i++) {
      arrayPage.push(i);
    }

    return (
      <ul className="pages-list">
        {" "}
        {arrayPage.map((page, index) => {
          if (this.props.page === page) {
            return (
              <li key={"page" + index} className="current-page go-to-page">
                {page}
              </li>
            );
          } else {
            return (
              <li
                key={"page" + index}
                className="go-to-page"
                onClick={() => this.props.handleChangePage(page)}
              >
                {page}
              </li>
            );
          }
        })}
      </ul>
    );
  };

  render() {
    return (
      <div className="pagination page-width">
        <i
          className={
            this.props.page === 1
              ? "fas fa-chevron-left border-page"
              : "fas fa-chevron-left"
          }
          onClick={
            this.props.page !== 1
              ? () => this.props.handleChangePage(this.props.page - 1)
              : null
          }
        />
        {this.renderPagination()}
        <i
          className={
            this.props.page === this.props.totalPages
              ? "fas fa-chevron-right border-page"
              : "fas fa-chevron-right"
          }
          onClick={
            this.props.page !== this.props.totalPages
              ? () => this.props.handleChangePage(this.props.page + 1)
              : null
          }
        />
      </div>
    );
  }
}

export default Pagination;
