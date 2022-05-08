import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainCategories from "./../components/Categories/MainCategories";

const CategoriesScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainCategories keyword={keyword} pagenumber={pagenumber} />
      </main>
    </>
  );
};

export default CategoriesScreen;
