import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteCategory,
  listCategories,
} from "../../Redux/Actions/CategoryActions";
import { listAllProducts } from "../../Redux/Actions/ProductActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import PaginationCategory from "./PaginationCategory";

const CategoriesTable = (props) => {
  //
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const [arrProducts, setArrProducts] = useState([]);
  //
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories, page, pages } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { error: errorDelete, success: successDelete } = categoryDelete;

  const productListAll = useSelector((state) => state.productListAll);
  const { products } = productListAll;

  useEffect(() => {
    if (Array.isArray(products)) {
      setArrProducts([...products]);
    }
  }, [products]);

  useEffect(() => {
    dispatch(listAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listCategories(keyword, pagenumber));
  }, [dispatch, successDelete, keyword, pagenumber]);

  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(categories));
  }, [categories.length]);

  const updateHandler = (id) => {
    console.log(id);
  };

  const deletehandler = (id) => {
    if (arrProducts.some((item) => item.category === id)) {
      toast.error("Bạn không thể xóa thể loại này do thể loại đã có sản phẩm");
    } else {
      if (window.confirm("Bạn có chắc muốn xóa thể loại này??")) {
        dispatch(deleteCategory(id));
      }
    }
  };

  return (
    <div className="col-md-12 col-lg-8">
      <Toast />
      {errorDelete && <Message variant="alert-danger">{errorDelete}</Message>}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </th>
              <th>ID</th>
              <th>Tên thể loại</th>
              <th>Mô tả</th>
              <th className="text-end">Hành động</th>
            </tr>
          </thead>
          {/* Table Data */}
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                    />
                  </div>
                </td>
                <td>{index + 1}</td>
                <td>
                  <b>{category.name}</b>
                </td>
                <td>{category.description}</td>
                <td className="text-end">
                  <div className="dropdown">
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      className="btn btn-outline-danger"
                      onClick={() => deletehandler(category._id)}
                    >
                      {/* <i className="fas fa-ellipsis-h"></i> */}
                      <i className="fas fa-trash-alt"></i>
                    </Link>
                    {/* <div className="dropdown-menu">
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={() => updateHandler(category._id)}
                      >
                        Sửa
                      </Link>
                      <Link
                        className="dropdown-item text-danger"
                        to="#"
                        onClick={() => deletehandler(category._id)}
                      >
                        Xóa
                      </Link>
                    </div> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <PaginationCategory
        pages={pages}
        page={page}
        keyword={keyword ? keyword : ""}
      />
    </div>
  );
};

export default CategoriesTable;
