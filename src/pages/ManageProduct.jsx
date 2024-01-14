import React from "react";
import Header from "../components/Framework/Header";
import Footer from "../components/Framework/Footer";
import ManageProductPage from "../components/ManageProductPage";

import { useMediaQuery } from "../hooks/useMediaQuery";

function ManageProduct() {
  const isMobile = useMediaQuery("(max-width: 450px)");

  if (isMobile) {
    return (
      <>
        <Header />
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Header />
      <ManageProductPage />
      <Footer />
    </div>
  );
}

export default ManageProduct;
