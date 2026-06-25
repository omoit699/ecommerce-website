import React, { createContext, useState, useContext } from "react";
import { authAPI, cartAPI } from "../services/api.js";

const AppContext = createContext(null);

export const AppProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const generateUserId = () =>
    localStorage.getItem("userId") || "guest-" + Date.now();

  const login = async (email, password) => {
    const response = await authAPI.signin(email, password);

    if (response.token) {
      setUser(response.user);
      setToken(response.token);

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.user.id);

      await fetchCart();
    } else {
      throw new Error(response.message);
    }
  };

  const register = async (username, email, password, confirmPassword) => {
    const response = await authAPI.register(
      username,
      email,
      password,
      confirmPassword
    );

    if (response.token) {
      setUser(response.user);
      setToken(response.token);

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.user.id);
    } else {
      throw new Error(response.message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    setCartTotal(0);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const fetchCart = async () => {
    try {
      const userId =
        localStorage.getItem("userId") || generateUserId();

      const cartData = await cartAPI.getCart(userId);

      if (cartData?.items) {
        setCart(
          cartData.items.map((item) => ({
            productId: item.productId._id || item.productId,
            name: item.productId.name,
            quantity: item.quantity,
            price: item.price,
          }))
        );

        setCartTotal(cartData.totalPrice || 0);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  const addToCart = async (productId, name, price, quantity) => {
    const userId =
      localStorage.getItem("userId") || generateUserId();

    const cartData = await cartAPI.addItem(
      userId,
      productId,
      quantity
    );

    if (cartData?.items) {
      setCart(
        cartData.items.map((item) => ({
          productId: item.productId._id || item.productId,
          name: item.productId.name,
          quantity: item.quantity,
          price: item.price,
        }))
      );

      setCartTotal(cartData.totalPrice || 0);
    }
  };

  const removeFromCart = async (productId) => {
    const userId =
      localStorage.getItem("userId") || generateUserId();

    const cartData = await cartAPI.removeItem(userId, productId);

    if (cartData?.items) {
      setCart(
        cartData.items.map((item) => ({
          productId: item.productId._id || item.productId,
          name: item.productId.name,
          quantity: item.quantity,
          price: item.price,
        }))
      );

      setCartTotal(cartData.totalPrice || 0);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    const userId =
      localStorage.getItem("userId") || generateUserId();

    const cartData = await cartAPI.updateQuantity(
      userId,
      productId,
      quantity
    );

    if (cartData?.items) {
      setCart(
        cartData.items.map((item) => ({
          productId: item.productId._id || item.productId,
          name: item.productId.name,
          quantity: item.quantity,
          price: item.price,
        }))
      );

      setCartTotal(cartData.totalPrice || 0);
    }
  };

  const clearCart = async () => {
    const userId =
      localStorage.getItem("userId") || generateUserId();

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

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }

  return context;
};

export default AppContext;