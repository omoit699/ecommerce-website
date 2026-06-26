import React, { createContext, useState, useContext } from "react";
import { authAPI, cartAPI } from "../services/api.js";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const getUserId = () =>
    localStorage.getItem("userId") || "guest-" + Date.now();

  /* ================= AUTH ================= */
  const login = async (email, password) => {
    const res = await authAPI.signin(email, password);

    setUser(res.user);
    setToken(res.token);

    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", res.user.id);

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
    setToken(res.token);

    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", res.user.id);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    setCartTotal(0);

    localStorage.clear();
  };

  /* ================= CART ================= */
  const normalizeCart = (items = []) =>
    items.map((item) => ({
      productId: item.productId?._id || item.productId,
      name: item.productId?.name || item.name,
      quantity: item.quantity,
      price: item.price,
    }));

  const fetchCart = async () => {
    const userId = localStorage.getItem("userId") || getUserId();
    const data = await cartAPI.getCart(userId);

    if (data?.items) {
      setCart(normalizeCart(data.items));
      setCartTotal(data.totalPrice || 0);
    }
  };

  const addToCart = async (productId, name, price, quantity) => {
    const userId = localStorage.getItem("userId") || getUserId();

    const data = await cartAPI.addItem(userId, productId, quantity);

    if (data?.items) {
      setCart(normalizeCart(data.items));
      setCartTotal(data.totalPrice || 0);
    }
  };

  const removeFromCart = async (productId) => {
    const userId = localStorage.getItem("userId") || getUserId();

    const data = await cartAPI.removeItem(userId, productId);

    if (data?.items) {
      setCart(normalizeCart(data.items));
      setCartTotal(data.totalPrice || 0);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    const userId = localStorage.getItem("userId") || getUserId();

    const data = await cartAPI.updateQuantity(
      userId,
      productId,
      quantity
    );

    if (data?.items) {
      setCart(normalizeCart(data.items));
      setCartTotal(data.totalPrice || 0);
    }
  };

  const clearCart = async () => {
    const userId = localStorage.getItem("userId") || getUserId();

    await cartAPI.clearCart(userId);

    setCart([]);
    setCartTotal(0);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
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