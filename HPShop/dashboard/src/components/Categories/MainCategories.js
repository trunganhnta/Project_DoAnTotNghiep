import React, { useState } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";



const MainCategories = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();
  const [keywordSearch, setKeywordSearch] = useState();
  let history = useHistory();

  

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh mục sản phẩm</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            <CreateCategory />
            {/* Categories table */}
            <CategoriesTable
              keyword={keyword}
              pagenumber={pagenumber}
              
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
