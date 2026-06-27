import apiClient from "./apiClient";

/* ================= AUTH ================= */
export const authAPI = {
  register: (username, email, password, confirmPassword) =>
    apiClient.post("/auth/register", {
      username,
      email,
      password,
      confirmPassword,
    }),

  signin: (email, password) =>
    apiClient.post("/auth/signin", { email, password }),
};

/* ================= PRODUCTS ================= */
export const productAPI = {
  getAllProducts: (category) =>
    apiClient.get(
      category ? `/products?category=${category}` : "/products"
    ),
};

/* ================= CART ================= */
export const cartAPI = {
  getCart: (userId) => apiClient.get(`/cart/${userId}`),

  addItem: (userId, productId, quantity) =>
    apiClient.post(`/cart/${userId}/add`, {
      productId,
      quantity,
    }),

  removeItem: (userId, productId) =>
    apiClient.delete(`/cart/${userId}/remove/${productId}`),

  updateQuantity: (userId, productId, quantity) =>
    apiClient.put(`/cart/${userId}/update/${productId}`, {
      quantity,
    }),

  clearCart: (userId) =>
    apiClient.post(`/cart/${userId}/clear`),
};

/* ================= CHECKOUT ================= */
export const checkoutAPI = {
  processOrder: (payload) =>
    apiClient.post("/checkout/process", payload),

  getOrderHistory: (userId) =>
    apiClient.get(`/checkout/history/${userId}`),
};