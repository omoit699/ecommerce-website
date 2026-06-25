const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* =========================================================
   SAFE REQUEST HELPER (IMPORTANT)
========================================================= */
async function request(url, options = {}) {
  try {
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
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}

/* =========================================================
   AUTH API
========================================================= */
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

  logout: () =>
    request(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  getUser: (userId) =>
    request(`${API_BASE_URL}/auth/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};

/* =========================================================
   PRODUCT API
========================================================= */
export const productAPI = {
  getAllProducts: (category) => {
    const url = category
      ? `${API_BASE_URL}/products?category=${category}`
      : `${API_BASE_URL}/products`;

    return request(url);
  },

  getProductById: (id) =>
    request(`${API_BASE_URL}/products/${id}`),

  createProduct: (product) =>
    request(`${API_BASE_URL}/products`, {
      method: "POST",
      body: product,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  updateProduct: (id, product) =>
    request(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      body: product,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  deleteProduct: (id) =>
    request(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};

/* =========================================================
   CART API
========================================================= */
export const cartAPI = {
  getCart: (userId) =>
    request(`${API_BASE_URL}/cart/${userId}`),

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

/* =========================================================
   CHECKOUT API
========================================================= */
export const checkoutAPI = {
  processOrder: (userId, shippingAddress) =>
    request(`${API_BASE_URL}/checkout/process`, {
      method: "POST",
      body: { userId, shippingAddress },
    }),

  getOrderHistory: (userId) =>
    request(`${API_BASE_URL}/checkout/history/${userId}`),

  getOrderById: (orderId) =>
    request(`${API_BASE_URL}/checkout/order/${orderId}`),

  updateOrderStatus: (orderId, status) =>
    request(`${API_BASE_URL}/checkout/order/${orderId}/status`, {
      method: "PUT",
      body: { status },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};

/* =========================================================
   INVENTORY API
========================================================= */
export const inventoryAPI = {
  getInventory: () =>
    request(`${API_BASE_URL}/inventory`),

  getInventoryByCategory: (category) =>
    request(`${API_BASE_URL}/inventory/category/${category}`),

  getLowStockItems: (threshold) =>
    request(
      threshold
        ? `${API_BASE_URL}/inventory/low-stock?threshold=${threshold}`
        : `${API_BASE_URL}/inventory/low-stock`
    ),

  updateStock: (id, stock) =>
    request(`${API_BASE_URL}/inventory/${id}/stock`, {
      method: "PUT",
      body: { stock },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};

/* =========================================================
   DEFAULT EXPORT
========================================================= */
export default {
  authAPI,
  productAPI,
  cartAPI,
  checkoutAPI,
  inventoryAPI,
};