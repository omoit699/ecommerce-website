import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, cartTotal, removeFromCart, updateCartQuantity } = useApp();

    const handleRemove = async (productId) => {
        try {
            await removeFromCart(productId);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleQuantityChange = async (productId, quantity) => {
        if (quantity <= 0) return;
        try {
            await updateCartQuantity(productId, quantity);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    return (
        <div className="container">
            <div className="cart-page" style={{ background: '#FFFFFF', padding: '25px', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h2 style={{ borderBottom: '2px solid #F1F1F2', paddingBottom: '10px', margin: '0 0 20px 0', color: '#313131' }}>Shopping Cart</h2>
                
                {cart.length === 0 ? (
                    <div className="empty-cart" style={{ textAlign: 'center', padding: '40px 0' }}>
                        <p style={{ color: '#75757A', fontSize: '16px', marginBottom: '20px' }}>Your cart is empty.</p>
                        <Link to="/products" className="btn" style={{ textDecoration: 'none', display: 'inline-block', maxWidth: '250px' }}>
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="cart-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                        
                        {/* Shopping Bag Item Stream Grid */}
                        <div className="cart-items" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {cart.map((item) => (
                                <div key={item.productId} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #F1F1F2', borderRadius: '4px' }}>
                                    <div className="item-details">
                                        <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#313131' }}>{item.name}</h3>
                                        <p className="price" style={{ margin: '0', fontWeight: 'bold', color: '#75757A', fontSize: '14px' }}>
                                            UGX {item.price?.toLocaleString()}
                                        </p>
                                    </div>
                                    
                                    <div className="item-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
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
                                            style={{ width: '55px', padding: '6px', border: '1px solid #BBBBBB', borderRadius: '4px', textAlign: 'center' }}
                                        />
                                        <p className="item-total" style={{ margin: '0', fontWeight: 'bold', color: '#313131', minWidth: '100px', textAlign: 'right' }}>
                                            UGX {(item.price * item.quantity).toLocaleString()}
                                        </p>
                                        <button
                                            onClick={() => handleRemove(item.productId)}
                                            style={{ background: 'none', border: 'none', color: '#D62929', fontWeight: 'bold', cursor: 'pointer', padding: '0 5px' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Checkout Calculation Summary Panel */}
                        <div className="cart-summary" style={{ background: '#F1F1F2', padding: '20px', borderRadius: '4px', height: 'fit-content' }}>
                            <h3 style={{ margin: '0 0 15px 0', color: '#313131', borderBottom: '1px solid #BBBBBB', paddingBottom: '10px' }}>Order Summary</h3>
                            <p style={{ display: 'flex', justifyContent: 'space-between', margin: '0 0 10px 0', fontSize: '14px' }}>
                                Subtotal: <span style={{ fontWeight: 'bold' }}>UGX {cartTotal?.toLocaleString()}</span>
                            </p>
                            <p style={{ display: 'flex', justifyContent: 'space-between', margin: '0 0 15px 0', fontSize: '14px' }}>
                                Shipping: <span style={{ color: '#2A8737', fontWeight: 'bold' }}>Free</span>
                            </p>
                            <h2 style={{ display: 'flex', justifyContent: 'space-between', margin: '0 0 20px 0', fontSize: '20px', color: '#313131', borderTop: '1px solid #BBBBBB', paddingTop: '15px' }}>
                                Total: <span style={{ color: '#F68B1E' }}>UGX {cartTotal?.toLocaleString()}</span>
                            </h2>
                            <Link to="/checkout" className="btn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', boxSizing: 'border-box' }}>
                                Proceed to Checkout
                            </Link>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
