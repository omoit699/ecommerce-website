import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* 🏠 Home Page */}
        <Route path="/" element={<Home />} />

        {/* 📦 Products Page (optional but useful) */}
        <Route path="/products" element={<Products />} />

        {/* 🛒 Cart Page */}
        <Route path="/cart" element={<Cart />} />

        {/* 💳 Checkout Page */}
        <Route path="/checkout" element={<Checkout />} />

      </Routes>
    </Router>
  );
}
