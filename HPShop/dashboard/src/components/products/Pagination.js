import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Pagination = (props) => {
  const history = useHistory()
  const { page, pages, keyword = "" } = props;
  return (
    pages > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((x) => (
            <li
              className={`page-item ${x + 1 === page ? "active" : ""}`}
              style={{cursor: "pointer"}}
              key={x + 1}
              onClick={() => {
                history.replace(
                  keyword
                    ? `/products/search/${keyword}/page/${x + 1}`
                    : `/products/page/${x + 1}`
                );
              }}
            >
              <div
                className="page-link"

                // to={
                //   keyword
                //     ? `/search/${keyword}/page/${x + 1}`
                //     : `products/page/${x + 1}`
                // }
              >
                {x + 1}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;
