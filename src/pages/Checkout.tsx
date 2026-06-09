import React from 'react';
import { useCart } from '../components/Cart';

const Checkout: React.FC = () => {
    const { cartItems, totalAmount } = useCart();

    const handleCheckout = () => {
        // Logic for handling the checkout process
        alert('Proceeding to checkout...');
    };

    return (
        <div className="checkout">
            <h1>Checkout</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <h2>Order Summary</h2>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price}
                            </li>
                        ))}
                    </ul>
                    <h3>Total Amount: ${totalAmount}</h3>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;