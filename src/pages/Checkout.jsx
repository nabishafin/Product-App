import React from "react";
import CardOverview from "../components/CardOverview";
import Checkout from "../components/Checkout";
import Header from "../components/Header";

const CheckoutPage = () => {
  return (
    <div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Checkout Information */}
          <Checkout />

          {/* Cart Overview */}
          <CardOverview />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
