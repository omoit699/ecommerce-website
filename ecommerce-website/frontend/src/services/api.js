const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* =========================
   SAFE REQUEST
========================= */
async function request(url, options = {}) {
  const res = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `HTTP Error ${res.status}`);
  }

  return data;
}

/* =========================
   AUTH API
========================= */
export const authAPI = {
  register: (username, email, password, confirmPassword) =>
    request(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      body: { username, email, password, confirmPassword },
    }),

  signin: (email, password) =>
    request(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      body: { email, password },
    }),
};

/* =========================
   PRODUCT API
========================= */
export const productAPI = {
  getAllProducts: (category) => {
    const url = category
      ? `${API_BASE_URL}/products?category=${category}`
      : `${API_BASE_URL}/products`;

    return request(url);
  },
};

/* =========================
   CART API
========================= */
export const cartAPI = {
  getCart: (userId) => request(`${API_BASE_URL}/cart/${userId}`),

  addItem: (userId, productId, quantity) =>
    request(`${API_BASE_URL}/cart/${userId}/add`, {
      method: "POST",
      body: { productId, quantity },
    }),

  removeItem: (userId, productId) =>
    request(`${API_BASE_URL}/cart/${userId}/remove/${productId}`, {
      method: "DELETE",
    }),

  updateQuantity: (userId, productId, quantity) =>
    request(`${API_BASE_URL}/cart/${userId}/update/${productId}`, {
      method: "PUT",
      body: { quantity },
    }),

  clearCart: (userId) =>
    request(`${API_BASE_URL}/cart/${userId}/clear`, {
      method: "POST",
    }),
};

/* =========================
   CHECKOUT API (FIXED)
========================= */
export const checkoutAPI = {
  processOrder: (payload) =>
    request(`${API_BASE_URL}/checkout/process`, {
      method: "POST",
      body: payload,
    }),

  getOrderHistory: (userId) =>
    request(`${API_BASE_URL}/checkout/history/${userId}`),
};