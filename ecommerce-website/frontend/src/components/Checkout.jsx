import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { checkoutAPI } from "../services/api.js";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useApp();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!cart || cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        userId: localStorage.getItem("userId"),
        items: cart,
        total: cartTotal,
        shippingInfo: form,
      };

      const res = await checkoutAPI.processOrder(payload);

      setSuccess("Order placed successfully!");

      await clearCart();

      setTimeout(() => {
        navigate("/orders");
      }, 1500);
    } catch (err) {
      setError(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div
        style={{
          maxWidth: "600px",
          margin: "20px auto",
          padding: "20px",
          background: "#fff",
          borderRadius: "4px",
        }}
      >
        <h2>Checkout</h2>

        {/* CART SUMMARY */}
        <div style={{ marginBottom: 20 }}>
          <h3>Order Summary</h3>
          <p>Total Items: {cart.length}</p>
          <p>
            Total: <b>UGX {Number(cartTotal).toLocaleString()}</b>
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleCheckout}>
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn"
            style={{ marginTop: 10 }}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

export default Checkout;