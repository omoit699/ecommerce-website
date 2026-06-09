import React, { createContext, useState, useContext, ReactNode } from 'react';
import { authAPI, cartAPI } from '../services/apiService';

interface User {
    id: string;
    username: string;
    email: string;
}

interface CartItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

interface AppContextType {
    user: User | null;
    token: string | null;
    cart: CartItem[];
    cartTotal: number;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
    logout: () => void;
    addToCart: (productId: string, name: string, price: number, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    fetchCart: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState(0);

    const generateUserId = () => localStorage.getItem('userId') || 'guest-' + Date.now();

    const login = async (email: string, password: string) => {
        const response = await authAPI.signin(email, password);
        if (response.token) {
            setUser(response.user);
            setToken(response.token);
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.user.id);
            await fetchCart();
        } else {
            throw new Error(response.message);
        }
    };

    const register = async (username: string, email: string, password: string, confirmPassword: string) => {
        const response = await authAPI.register(username, email, password, confirmPassword);
        if (response.token) {
            setUser(response.user);
            setToken(response.token);
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.user.id);
        } else {
            throw new Error(response.message);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setCart([]);
        setCartTotal(0);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    const fetchCart = async () => {
        try {
            const userId = localStorage.getItem('userId') || generateUserId();
            const cartData = await cartAPI.getCart(userId);
            if (cartData.items) {
                setCart(
                    cartData.items.map((item: any) => ({
                        productId: item.productId._id || item.productId,
                        name: item.productId.name,
                        quantity: item.quantity,
                        price: item.price,
                    }))
                );
                setCartTotal(cartData.totalPrice);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const addToCart = async (productId: string, name: string, price: number, quantity: number) => {
        try {
            const userId = localStorage.getItem('userId') || generateUserId();
            const cartData = await cartAPI.addItem(userId, productId, quantity);
            if (cartData.items) {
                setCart(
                    cartData.items.map((item: any) => ({
                        productId: item.productId._id || item.productId,
                        name: item.productId.name,
                        quantity: item.quantity,
                        price: item.price,
                    }))
                );
                setCartTotal(cartData.totalPrice);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            const userId = localStorage.getItem('userId') || generateUserId();
            const cartData = await cartAPI.removeItem(userId, productId);
            if (cartData.items) {
                setCart(
                    cartData.items.map((item: any) => ({
                        productId: item.productId._id || item.productId,
                        name: item.productId.name,
                        quantity: item.quantity,
                        price: item.price,
                    }))
                );
                setCartTotal(cartData.totalPrice);
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    };

    const updateCartQuantity = async (productId: string, quantity: number) => {
        try {
            const userId = localStorage.getItem('userId') || generateUserId();
            const cartData = await cartAPI.updateQuantity(userId, productId, quantity);
            if (cartData.items) {
                setCart(
                    cartData.items.map((item: any) => ({
                        productId: item.productId._id || item.productId,
                        name: item.productId.name,
                        quantity: item.quantity,
                        price: item.price,
                    }))
                );
                setCartTotal(cartData.totalPrice);
            }
        } catch (error) {
            console.error('Error updating cart quantity:', error);
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            const userId = localStorage.getItem('userId') || generateUserId();
            await cartAPI.clearCart(userId);
            setCart([]);
            setCartTotal(0);
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
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
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export default AppContext;
