import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Pagination from "./Pagination";
import Product from "./Product";

const MainProducts = (props) => {
  //
  const { keyword, pagenumber, arrProducts } = props;
  const dispatch = useDispatch();
  //
  const [keywordSearch, setKeywordSearch] = useState("");
  let history = useHistory();

  const [listProduct, setListProduct] = useState([]);
  const [newPage,setNewPage] = useState()
  console.log(newPage)
  const [newPages,setNewPages] = useState()
  console.log(newPages)

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  console.log(productList);
  console.log(products);

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  const [listCategory, setListCategory] = useState();
  const [selectCategory, setSelectCategory] = useState("");

  useEffect(() => {
    if (products && products.length > 0) {
      setListProduct([...products]);
    }
    if(page > 0){
      setNewPage(page)
    }
    if(pages > 0){
      setNewPages(pages)
    }
  }, [products, page, pages]);

  useEffect(() => {
    const getCategories = localStorage.getItem("category");
    setListCategory(JSON.parse(getCategories));
  }, []);

  useEffect(() => {
    dispatch(listProducts(keyword, pagenumber));
    // dispatch(listAllProducts());
  }, [dispatch, successDelete, keyword, pagenumber]);

  // useEffect(() => {
  //   console.log('keywordSearch',keywordSearch)
  //   if (keywordSearch && keywordSearch?.trim()) {
  //     if (keywordSearch === "all") {
  //       history.push("/products");
  //     } else {
  //       history.push(`/search/${keywordSearch}`);
  //     }
  //   }
  // }, [keywordSearch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keywordSearch !== " " && keywordSearch?.trim()) {
      history.push(`/search/${keywordSearch}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Sản phẩm</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Thêm mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <form onSubmit={submitHandler} className="input-group">
                <Link to="" style={{ margin: "2% 2% 0 0", color: "orange" }}>
                  <i
                    class="fad fa-search-dollar"
                    style={{ fontSize: "25px" }}
                  ></i>
                </Link>
                <input
                  type="search"
                  placeholder="Nhập tên sản phẩm để tìm kiếm..."
                  className="form-control rounded search"
                  onChange={(e) => setKeywordSearch(e.target.value)}
                />
              </form>
            </div>
            <div className="col-lg-3 col-6 col-md-3">
              <select
                className="form-select"
                value={selectCategory}
                onChange={(e) => {
                  setSelectCategory(e.target.value);
                  // setKeywordSearch(e.target.value);
                  // if (e.target.value === "all") {
                  //   history.push("/products");
                  // } else {
                  //   history.push(`/search/${e.target.value}`);
                  // }
                }}
              >
                <option value="">Tất cả</option>
                {listCategory &&
                  listCategory.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div> */}
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              <table className="table table-hover ">
                <thead className="text-center">
                  <tr>
                    <th
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "120%",
                      }}
                      scope="col"
                    >
                      STT
                    </th>
                    <th
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "120%",
                      }}
                      scope="col"
                    >
                      Tên sản phẩm
                    </th>
                    <th
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "120%",
                      }}
                      scope="col"
                    >
                      Giá
                    </th>
                    <th
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "120%",
                      }}
                      scope="col"
                    >
                      Hành động
                    </th>
                  </tr>
                </thead>

                {(selectCategory &&
                  arrProducts
                    .filter((item) => item.category === selectCategory)
                    .map((product, index) => {
                      return (
                        <Product
                          product={product}
                          index={index}
                          key={product._id}
                        />
                      );
                    })) ||
                  listProduct?.map((product, index) => (
                    <Product
                      product={product}
                      index={index}
                      key={product._id}
                      page={newPage}
                    />
                  )) ||
                  products?.map((product, index) => {
                    return (
                      <Product
                        product={product}
                        index={index}
                        key={product._id}
                        page={page}
                      />
                    );
                  })}
              </table>
            </div>
          )}
          {!selectCategory && (
            <Pagination
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          )}
          {!loading && !page && !pages && (
            <Pagination
              pages={newPages}
              page={newPage}
              keyword={keyword ? keyword : ""}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
