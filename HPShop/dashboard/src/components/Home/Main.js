import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllProducts } from "../../Redux/Actions/ProductActions";
import LatestOrder from "./LatestOrder";
import ProductsStatistics from "./ProductsStatistics";
import SaleStatistics from "./SalesStatistics";
import TopTotal from "./TopTotal";

const Main = () => {


  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  // const productList = useSelector((state) => state.productList);
  // const { products, pages } = productList;
  // const productListAll = useSelector((state) => state.productListAll);
  // const { products } = productListAll;
  const [arrProducts, setArrProducts] = useState([]);
  const dispatch = useDispatch();

  const productListAll = useSelector((state) => state.productListAll);
  const { products } = productListAll;
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setArrProducts([...products]);
    }
  }, [products]);

  useEffect(() => {
    dispatch(listAllProducts());
  }, [dispatch]);

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Trang chủ Admin</h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={orders} products={arrProducts}/>

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
