const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";


// ================================
// 🔥 SAFE RESPONSE HANDLER
// ================================
const request = async (url, options = {}) => {
  const res = await fetch(url, options);

  let data;

  try {
    data = await res.json();
  } catch (err) {
    throw new Error("Invalid server response");
  }

  // ❌ handle HTTP errors properly
  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
};


// ================================
// 🧠 NUMBER CLEANER (FIXES 7,M BUG)
// ================================
export const cleanNumber = (value) => {
  if (value === null || value === undefined) return 0;

  return Number(
    String(value)
      .replace(/,/g, "")   // remove commas
      .replace(/[^\d.]/g, "") // remove weird symbols like M, UGX text
  ) || 0;
};


// ================================
// AUTH API
// ================================
export const authAPI = {
  signin: (email, password) =>
    request(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }),

  register: (username, email, password, confirmPassword) =>
    request(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
    }),
};


// ================================
// PRODUCT API
// ================================
export const productAPI = {
  getAll: (category) => {
    const url = category
      ? `${API_BASE_URL}/products?category=${category}`
      : `${API_BASE_URL}/products`;

    return request(url);
  },

  getById: (id) =>
    request(`${API_BASE_URL}/products/${id}`),
};


// ================================
// CART API
// ================================
export const cartAPI = {
  getCart: (userId) =>
    request(`${API_BASE_URL}/cart/${userId}`),

  addItem: (userId, productId, quantity) =>
    request(`${API_BASE_URL}/cart/${userId}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    }),

  removeItem: (userId, productId) =>
    request(`${API_BASE_URL}/cart/${userId}/remove/${productId}`, {
      method: "DELETE",
    }),

  updateQuantity: (userId, productId, quantity) =>
    request(`${API_BASE_URL}/cart/${userId}/update/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    }),

  clearCart: (userId) =>
    request(`${API_BASE_URL}/cart/${userId}/clear`, {
      method: "POST",
    }),
};


// ================================
// CHECKOUT API (FIXED)
// ================================
export const checkoutAPI = {
  processOrder: (payload) =>
    request(`${API_BASE_URL}/checkout/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  getOrderHistory: (userId) =>
    request(`${API_BASE_URL}/checkout/history/${userId}`),

  getOrderById: (orderId) =>
    request(`${API_BASE_URL}/checkout/order/${orderId}`),

  updateOrderStatus: (orderId, status) =>
    request(`${API_BASE_URL}/checkout/order/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }),
};