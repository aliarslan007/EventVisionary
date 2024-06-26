// RootLayout.js

import React from 'react';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import './index.css';

const RootLayout = ({ children }) => {
  return (
    <div className="HOC_container">
      
      {/* <script src="https://cdn-eu.seatsio.net/chart.js"></script> */}
      <div className="w_effect"></div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
