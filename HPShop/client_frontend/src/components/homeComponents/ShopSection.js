import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import ProductCard from "./ProductCard";

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [backupData, setBackupData] = useState({});
  console.log("backupData", backupData);

  const [category, setCategory] = useState("");
  const [keywordSearch, setKeywordSearch] = useState("");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  console.log(products);
  console.log(productList);

  useEffect(() => {
    if (productList.pages) {
      setBackupData({ ...productList });
    }
  }, [productList]);

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);
  useEffect(() => {
    if (keywordSearch) {
      history.push(`/search/${keywordSearch}`);
    }
  }, [keywordSearch]);

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 row article">
              {/* <div
                className="custom-categories-pc col-lg-2 row "
                style={{ height: "200px" }}
              >
                <div className="col-lg-12 fw-bold" style={{ fontSize: "17px" }}>
                  <i
                    class="fa fa-list text-warning"
                    aria-hidden="true"
                    style={{ fontSize: "20px" }}
                  ></i>{" "}
                  Danh mục sản phẩm
                </div>
                <div
                  className="custom-category-main col-lg-12 cursor-pointer"
                  style={{ fontSize: "16px", marginLeft: "25px" }}
                  onClick={() => history.push(`/`)}
                >
                  Tất cả sản phẩm
                </div>
                <div
                  className="custom-category-main col-lg-12 cursor-pointer"
                  style={{ fontSize: "16px", marginLeft: "25px" }}
                  onClick={() => setKeywordSearch("áo phông")}
                >
                  Áo Phông
                </div>
                <div
                  className="custom-category-main col-lg-12 cursor-pointer"
                  style={{ fontSize: "16px", marginLeft: "25px" }}
                  onClick={() => setKeywordSearch("áo sơ mi")}
                >
                  Áo Sơ Mi
                </div>
                <div
                  className="custom-category-main col-lg-12 cursor-pointer"
                  style={{ fontSize: "16px", marginLeft: "25px" }}
                  onClick={() => setKeywordSearch("quần jean")}
                >
                  Quần Jean
                </div>
                <div
                  className="custom-category-main col-lg-12 cursor-pointer"
                  style={{ fontSize: "16px", marginLeft: "25px" }}
                  onClick={() => setKeywordSearch("quần âu")}
                >
                  Quần Âu
                </div>
                <div
                  className="custom-category-main col-lg-12 cursor-pointer"
                  style={{ fontSize: "16px", marginLeft: "25px" }}
                  onClick={() => setKeywordSearch("Áo Khoác")}
                >
                  Áo Khoác
                </div>
              </div> */}
              {window.location.pathname === "/" ? (
                <h5
                  className="col-12 text-center mb-2"
                  style={{ fontWeight: "bold" }}
                >
                  THỜI TRANG MỚI NHẤT
                </h5>
              ) : null}

              <div className="shopcontainer row col-lg-12 ">
                {loading ? (
                  <div className="mb-5">{/* <Loading /> */}</div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {(category &&
                      products
                        .filter((item) => item.category === category)
                        .map((product) => <ProductCard product={product} />)) ||
                      (products &&
                        products?.map((product) => (
                          <ProductCard product={product} />
                        ))) ||
                      backupData.products?.map((product) => (
                        <ProductCard product={product} />
                      ))}
                  </>
                )}
                {window.location.pathname === "/" ? (
                  <button
                    className="btn btn-warning col-1 m-auto"
                    onClick={() => history.push("/noSearch")}
                  >
                    Xem tất cả
                  </button>
                ) : (
                  <Pagination
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ""}
                  />
                )}

                {/* Pagination */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
