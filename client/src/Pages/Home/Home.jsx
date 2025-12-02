import React from "react";
import Header from "../../Componets/Header/Header";
import Footer from "../../Componets/Footer/Footer";
import Banner from "../../Componets/Banner/Banner";
import RowList from "../../Componets/Rows/RowList/RowList";

function Home() {
  return (
    <>
      <Header />
      <Banner />
      <RowList />
      <Footer />
    </>
  );
}

export default Home;
