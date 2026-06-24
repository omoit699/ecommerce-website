import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
// Pointing to your correct, clean JavaScript api file
import { checkoutAPI } from '../services/api.js'; 
// Upgraded from useHistory to useNavigate to match your React Router v6 setup
import { useNavigate } from 'react-router-dom'; 

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useApp();
    const navigate = useNavigate();
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
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
                navigate('/signin');
                return;
            }

            const shippingAddress = `${formData.shippingAddress}, ${formData.city}, ${formData.postalCode}`;
            const response = await checkoutAPI.processOrder(userId, shippingAddress);

            if (response && response.order) {
                setOrderId(response.order._id);
                setOrderConfirmed(true);
                await clearCart();
            } else {
                setError(response.message || 'Order processing failed');
            }
        } catch (err) {
            setError(err.message || 'Error processing order');
        } finally {
            setIsLoading(false);
        }
    };

    // Style helper for inputs
    const inputStyle = {
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
        border: '1px solid #F1F1F2',
        borderRadius: '4px',
        marginTop: '5px'
    };

    // Style helper for form grouping
    const groupStyle = {
        marginBottom: '15px'
    };

    if (orderConfirmed) {
        return (
            <div className="container">
                <div className="checkout-confirmation" style={{ textAlign: 'center', padding: '40px', background: '#FFFFFF', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginTop: '30px' }}>
                    <div className="confirmation-message">
                        <h2 style={{ color: '#2A8737' }}>✓ Order Confirmed!</h2>
                        <p style={{ fontSize: '16px' }}>Your order has been successfully placed.</p>
                        <p className="order-id" style={{ fontWeight: 'bold', background: '#F1F1F2', padding: '10px', display: 'inline-block', borderRadius: '4px' }}>
                            Order ID: {orderId}
                        </p>
                        <p style={{ color: '#75757A' }}>Thank you for your purchase at Loris E-9!</p>
                        <button onClick={() => navigate('/')} className="btn" style={{ maxWidth: '250px', marginTop: '10px' }}>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="checkout-page" style={{ background: '#FFFFFF', padding: '25px', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h2 style={{ borderBottom: '2px solid #F1F1F2', paddingBottom: '10px', margin: '0 0 20px 0' }}>Checkout</h2>

                {cart.length === 0 ? (
                    <div className="empty-checkout" style={{ textAlign: 'center', padding: '30px 0' }}>
                        <p style={{ color: '#75757A', marginBottom: '20px' }}>Your cart is empty. Please add items before checking out.</p>
                        <button onClick={() => navigate('/products')} className="btn" style={{ maxWidth: '250px' }}>
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div AclassName="checkout-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                        <div className="checkout-form">
                            <form onSubmit={handleSubmit}>
                                <section className="shipping-section" style={{ marginBottom: '25px' }}>
                                    <h3 style={{ color: '#F68B1E', margin: '0 0 15px 0' }}>Shipping Information</h3>
                                    <div className="form-group" style={groupStyle}>
                                        <label style={{ fontWeight: '500' }}>Shipping Address:</label>
                                        <input
                                            type="text"
                                            name="shippingAddress"
                                            value={formData.shippingAddress}
                                            onChange={handleChange}
                                            placeholder="Street address"
                                            required
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div className="form-group" style={groupStyle}>
                                        <label style={{ fontWeight: '500' }}>City:</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                            required
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div className="form-group" style={groupStyle}>
                                        <label style={{ fontWeight: '500' }}>Postal Code:</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                            placeholder="Postal Code"
                                            required
                                            style={inputStyle}
                                        />
                                    </div>
                                </section>

                                <section className="payment-section" style={{ marginBottom: '25px' }}>
                                    <h3 style={{ color: '#F68B1E', margin: '0 0 15px 0' }}>Payment Information</h3>
                                    <div className="form-group" style={groupStyle}>
                                        <label style={{ fontWeight: '500' }}>Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                            required
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
                                        <div className="form-group" style={{ flex: 1 }}>
                                            <label style={{ fontWeight: '500' }}>Expiration Date</label>
                                            <input
                                                type="text"
                                                name="expirationDate"
                                                value={formData.expirationDate}
                                                onChange={handleChange}
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                required
                                                style={inputStyle}
                                            />
                                        </div>
                                        <div className="form-group" style={{ flex: 1 }}>
                                            <label style={{ fontWeight: '500' }}>CVV</label>
                                            <input
                                                type="text"
