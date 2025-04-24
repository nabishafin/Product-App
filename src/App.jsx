import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast"; // make sure you import this
import Checkout from "./pages/checkout";
import Header from "./components/Header";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </Provider>
  );
}

export default App;
