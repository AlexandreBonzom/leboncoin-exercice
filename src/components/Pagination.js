import React from "react";

const Pagination = props => {
  const renderPagination = () => {
    let totalPages = props.totalPages;
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
          if (props.page === page) {
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
                onClick={() => props.handleChangePage(page)}
              >
                {page}
              </li>
            );
          }
        })}
      </ul>
    );
  };

  return (
    <div className="pagination page-width">
      <i
        className={
          props.page === 1
            ? "fas fa-chevron-left border-page"
            : "fas fa-chevron-left"
        }
        onClick={
          props.page !== 1 ? () => props.handleChangePage(props.page - 1) : null
        }
      />
      {renderPagination()}
      <i
        className={
          props.page === props.totalPages
            ? "fas fa-chevron-right border-page"
            : "fas fa-chevron-right"
        }
        onClick={
          props.page !== props.totalPages
            ? () => props.handleChangePage(props.page + 1)
            : null
        }
      />
    </div>
  );
};

export default Pagination;
