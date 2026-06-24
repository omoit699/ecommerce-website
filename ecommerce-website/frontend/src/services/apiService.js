// Vite uses import.meta.env instead of process.env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Auth APIs
export const authAPI = {
    register: async (username, email, password, confirmPassword) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, confirmPassword }),
        });
        return response.json();
    },

    signin: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    },

    logout: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.json();
    },

    getUser: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/auth/user/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.json();
    },
};

// Product APIs
export const productAPI = {
    getAllProducts: async (category) => {
        const url = category
            ? `${API_BASE_URL}/products?category=${category}`
            : `${API_BASE_URL}/products`;
        const response = await fetch(url);
        return response.json();
    },

    getProductById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        return response.json();
    },

    createProduct: async (product) => {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(product),
        });
        return response.json();
    },

    updateProduct: async (id, product) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(product),
        });
        return response.json();
    },

    deleteProduct: async (id) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.json();
    },
};

// Cart APIs
export const cartAPI = {
    getCart: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
        return response.json();
    },

    addItem: async (userId, productId, quantity) => {
        const response = await fetch(`${API_BASE_URL}/cart/${userId}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity }),
        });
        return response.json();
    },

    removeItem: async (userId, productId) => {
        const response = await fetch(`${API_BASE_URL}/cart/${userId}/remove/${productId}`, {
            method: 'DELETE',
        });
        return response.json();
    },

    updateQuantity: async (userId, productId, quantity) => {
        const response = await fetch(`${API_BASE_URL}/cart/${userId}/update/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity }),
        });
        return response.json();
    },

    clearCart: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/cart/${userId}/clear`, {
            method: 'POST',
        });
        return response.json();
    },
};

// Checkout APIs
export const checkoutAPI = {
    processOrder: async (userId, shippingAddress) => {
        const response = await fetch(`${API_BASE_URL}/checkout/process`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, shippingAddress }),
        });
        return response.json();
    },

    getOrderHistory: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/checkout/history/${userId}`);
        return response.json();
    },

    getOrderById: async (orderId) => {
        const response = await fetch(`${API_BASE_URL}/checkout/order/${orderId}`);
        return response.json();
    },

    updateOrderStatus: async (orderId, status) => {
        const response = await fetch(`${API_BASE_URL}/checkout/order/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ status }),
        });
        return response.json();
    },
};

// Inventory APIs
export const inventoryAPI = {
    getInventory: async () => {
        const response = await fetch(`${API_BASE_URL}/inventory`);
        return response.json();
    },

    getInventoryByCategory: async (category) => {
        const response = await fetch(`${API_BASE_URL}/inventory/category/${category}`);
        return response.json();
    },

    getLowStockItems: async (threshold) => {
        const url = threshold
            ? `${API_BASE_URL}/inventory/low-stock?threshold=${threshold}`
            : `${API_BASE_URL}/inventory/low-stock`;
        const response = await fetch(url);
        return response.json();
    },

    updateStock: async (id, stock) => {
        const response = await fetch(`${API_BASE_URL}/inventory/${id}/stock`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ stock }),
        });
        return response.json();
    },
};

// Default export containing all API objects
export default {
    authAPI,
    productAPI,
    cartAPI,
    checkoutAPI,
    inventoryAPI,
};
