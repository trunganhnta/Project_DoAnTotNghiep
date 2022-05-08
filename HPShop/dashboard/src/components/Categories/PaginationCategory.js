import React from "react";
import { Link, useHistory } from "react-router-dom";

const PaginationCategory = (props) => {
  const { page, pages, keyword = "" } = props;
  const history = useHistory();

  return (
    pages > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((x) => (
            <li
              className={`page-item ${x + 1 === page ? "active" : ""}`}
              key={x + 1}
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.replace(
                  keyword
                    ? `/categories/search/${keyword}/page/${x + 1}`
                    : `/categories/page/${x + 1}`
                );
              }}
            >
              <Link
                className="page-link"
                // to={
                //   keyword
                //     ? `/search/${keyword}/page/${x + 1}`
                //     : `/page/${x + 1}`
                // }
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default PaginationCategory;
