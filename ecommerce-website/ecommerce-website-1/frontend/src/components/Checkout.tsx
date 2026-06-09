import React, { useState } from 'react';

const Checkout = () => {
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({
            ...paymentInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle payment processing and order confirmation here
        console.log('Payment Info:', paymentInfo);
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Card Number</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Expiration Date</label>
                    <input
                        type="text"
                        name="expirationDate"
                        value={paymentInfo.expirationDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>CVV</label>
                    <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Confirm Payment</button>
            </form>
        </div>
    );
};

export default Checkout;