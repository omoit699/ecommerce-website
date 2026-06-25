import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Electronics from "./pages/Electronics";
import Clothes from "./pages/Clothes";
import Shoes from "./pages/Shoes";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import SignIn from "./components/SignIn";
import AdminDashboard from "./pages/AdminDashboard";

import "./styles/app.css";
import Orders from "./pages/Orders";
const App = () => {
  return (
    <AppProvider>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;