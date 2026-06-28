import React, { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const placeOrder = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.reduce((sum, i) => sum + i.price, 0);

    const order = {
      products: cart.map((p) => ({
        productId: p._id,
        name: p.name,
        price: p.price,
        quantity: 1,
      })),
      totalAmount: total,
      customerName: name,
      phone,
      address,
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      await axios.post(`${API_URL}/api/orders`, order);

      alert("Order placed successfully 🎉");

      localStorage.removeItem("cart");
    } catch (err) {
      alert("Failed to place order");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Checkout</h1>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br />

      <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
      <br />

      <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
      <br />

      <button onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
