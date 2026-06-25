import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { checkoutAPI } from "../services/api.js";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shippingAddress: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!cart || cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/signin");
      return;
    }

    // validation
    if (
      !formData.shippingAddress ||
      !formData.city ||
      !formData.postalCode
    ) {
      setError("Please fill shipping information");
      return;
    }

    if (
      !formData.cardNumber ||
      !formData.expirationDate ||
      !formData.cvv
    ) {
      setError("Please fill payment information");
      return;
    }

    setLoading(true);

    try {
      const shippingAddress = `${formData.shippingAddress}, ${formData.city}, ${formData.postalCode}`;

      const payload = {
        userId,
        shippingAddress,
        items: cart,
        totalAmount: cartTotal,
        payment: {
          cardNumber: formData.cardNumber,
          expirationDate: formData.expirationDate,
          cvv: formData.cvv,
        },
      };

      const response = await checkoutAPI.processOrder(payload);

      const order = response?.order || response?.data || response;

      if (order?._id) {
        setOrderId(order._id);
        setOrderConfirmed(true);
        await clearCart();
      } else {
        setError(response?.message || "Checkout failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  if (orderConfirmed) {
    return (
      <div style={{ padding: 30 }}>
        <h2>Order Confirmed 🎉</h2>
        <p>Order ID: {orderId}</p>

        <button onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ padding: 20, background: "#fff" }}>
        <h2>Checkout</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="shippingAddress"
            placeholder="Address"
            value={formData.shippingAddress}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />

          <input
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
          />

          <input
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
          />

          <input
            name="expirationDate"
            placeholder="MM/YY"
            value={formData.expirationDate}
            onChange={handleChange}
          />

          <input
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading
              ? "Processing..."
              : `Pay UGX ${Number(cartTotal || 0).toLocaleString()}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;