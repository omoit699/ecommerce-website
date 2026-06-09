import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, cartTotal, removeFromCart, updateCartQuantity } = useApp();

    const handleRemove = async (productId: string) => {
        try {
            await removeFromCart(productId);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleQuantityChange = async (productId: string, quantity: number) => {
        if (quantity <= 0) return;
        try {
            await updateCartQuantity(productId, quantity);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    return (
        <div className="cart-page">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                    <Link to="/products" className="continue-shopping">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="cart-container">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.productId} className="cart-item">
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="price">UGX {item.price?.toLocaleString()}</p>
                                </div>
                                <div className="item-actions">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                item.productId,
                                                Math.max(1, parseInt(e.target.value) || 1)
                                            )
                                        }
                                        min="1"
                                        className="quantity-input"
                                    />
                                    <p className="item-total">
                                        UGX {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                    <button
                                        onClick={() => handleRemove(item.productId)}
                                        className="remove-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <p className="subtotal">
                            Subtotal: <span>UGX {cartTotal?.toLocaleString()}</span>
                        </p>
                        <p className="shipping">
                            Shipping: <span>Free</span>
                        </p>
                        <h2 className="total">
                            Total: <span>UGX {cartTotal?.toLocaleString()}</span>
                        </h2>
                        <Link to="/checkout" className="checkout-btn">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;