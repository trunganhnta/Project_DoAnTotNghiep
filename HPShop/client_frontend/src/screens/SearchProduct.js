import React from "react";
import Footer from "./../components/Footer";
import Header from "./../components/Header";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import ShopSection from "./../components/homeComponents/ShopSection";

export default function SearchProduct({ match }) {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
}
