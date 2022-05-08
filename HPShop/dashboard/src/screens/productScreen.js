import React, { useEffect, useState } from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainProducts from "./../components/products/MainProducts";
import { useDispatch, useSelector } from "react-redux";
import { listAllProducts } from "../Redux/Actions/ProductActions";

const ProductScreen = ({ match }) => {
  //
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  //
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
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts keyword={keyword} pagenumber={pagenumber} arrProducts={arrProducts}/>
      </main>
    </>
  );
};

export default ProductScreen;
