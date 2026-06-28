import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ddd", padding: 10 }}>
            <h3>{item.name}</h3>
            <p>UGX {item.price}</p>

            <button onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
        ))
      )}

      <h2>Total: UGX {total.toLocaleString()}</h2>
    </div>
  );
};

export default Cart;
