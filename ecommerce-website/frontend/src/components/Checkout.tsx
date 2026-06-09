import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { checkoutAPI } from '../services/apiService';
import { useHistory } from 'react-router-dom';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useApp();
    const history = useHistory();
    const [formData, setFormData] = useState({
        shippingAddress: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [orderId, setOrderId] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (cart.length === 0) {
            setError('Your cart is empty');
            return;
        }

        if (!formData.shippingAddress || !formData.city || !formData.postalCode) {
            setError('Please fill in all shipping information');
            return;
        }

        if (!formData.cardNumber || !formData.expirationDate || !formData.cvv) {
            setError('Please fill in all payment information');
            return;
        }

        setIsLoading(true);

        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('Please sign in to checkout');
                history.push('/signin');
                return;
            }

            const shippingAddress = `${formData.shippingAddress}, ${formData.city}, ${formData.postalCode}`;
            const response = await checkoutAPI.processOrder(userId, shippingAddress);

            if (response.order) {
                setOrderId(response.order._id);
                setOrderConfirmed(true);
                await clearCart();
            } else {
                setError(response.message || 'Order processing failed');
            }
        } catch (err: any) {
            setError(err.message || 'Error processing order');
        } finally {
            setIsLoading(false);
        }
    };

    if (orderConfirmed) {
        return (
            <div className="checkout-confirmation">
                <div className="confirmation-message">
                    <h2>✓ Order Confirmed!</h2>
                    <p>Your order has been successfully placed.</p>
                    <p className="order-id">Order ID: {orderId}</p>
                    <p>Thank you for your purchase!</p>
                    <button onClick={() => history.push('/')} className="continue-btn">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>

            {cart.length === 0 ? (
                <div className="empty-checkout">
                    <p>Your cart is empty. Please add items before checking out.</p>
                    <button onClick={() => history.push('/products')} className="continue-btn">
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="checkout-container">
                    <div className="checkout-form">
                        <form onSubmit={handleSubmit}>
                            <section className="shipping-section">
                                <h3>Shipping Information</h3>
                                <div className="form-group">
                                    <label>Shipping Address:</label>
                                    <input
                                        type="text"
                                        name="shippingAddress"
                                        value={formData.shippingAddress}
                                        onChange={handleChange}
                                        placeholder="Street address"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>City:</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Postal Code:</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder="Postal Code"
                                        required
                                    />
                                </div>
                            </section>

                            <section className="payment-section">
                                <h3>Payment Information</h3>
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Expiration Date</label>
                                        <input
                                            type="text"
                                            name="expirationDate"
                                            value={formData.expirationDate}
                                            onChange={handleChange}
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            placeholder="123"
                                            maxLength="3"
                                            required
                                        />
                                    </div>
                                </div>
                            </section>

                            {error && <p className="error-message">{error}</p>}
                            <button type="submit" disabled={isLoading} className="submit-btn">
                                {isLoading ? 'Processing...' : 'Place Order'}
                            </button>
                        </form>
                    </div>

                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        {cart.map((item) => (
                            <div key={item.productId} className="summary-item">
                                <span className="item-name">{item.name}</span>
                                <span className="item-qty">x{item.quantity}</span>
                                <span className="item-price">UGX {(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                        <div className="summary-total">
                            <h4>Total: UGX {cartTotal?.toLocaleString()}</h4>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;