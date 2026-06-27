import React, { createContext, useContext, useState } from "react";
import { authAPI, cartAPI } from "../services/api.js";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const getUserId = () => localStorage.getItem("userId");

  /* ================= AUTH ================= */
  const login = async (email, password) => {
    const res = await authAPI.signin(email, password);

    setUser(res.user);

    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", res.user._id);

    await fetchCart();
  };

  const register = async (username, email, password, confirmPassword) => {
    const res = await authAPI.register(
      username,
      email,
      password,
      confirmPassword
    );

    setUser(res.user);

    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", res.user._id);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setCartTotal(0);
    localStorage.clear();
  };

  /* ================= CART ================= */
  const normalize = (items = []) =>
    items.map((i) => ({
      productId: i.productId?._id || i.productId,
      name: i.productId?.name || i.name,
      price: i.price || 0,
      quantity: i.quantity || 1,
    }));

  const fetchCart = async () => {
    const res = await cartAPI.getCart(getUserId());

    setCart(normalize(res?.items || []));
    setCartTotal(res?.totalPrice || 0);
  };

  const addToCart = async (productId, name, price, quantity) => {
    const res = await cartAPI.addItem(getUserId(), productId, quantity);

    setCart(normalize(res?.items || []));
    setCartTotal(res?.totalPrice || 0);
  };

  const removeFromCart = async (productId) => {
    const res = await cartAPI.removeItem(getUserId(), productId);

    setCart(normalize(res?.items || []));
    setCartTotal(res?.totalPrice || 0);
  };

  const updateCartQuantity = async (productId, quantity) => {
    const res = await cartAPI.updateQuantity(
      getUserId(),
      productId,
      quantity
    );

    setCart(normalize(res?.items || []));
    setCartTotal(res?.totalPrice || 0);
  };

  const clearCart = async () => {
    await cartAPI.clearCart(getUserId());

    setCart([]);
    setCartTotal(0);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        cart,
        cartTotal,
        login,
        register,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);