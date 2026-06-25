import React from "react";
import { useApp } from "../context/AppContext.jsx";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    cartTotal,
    removeFromCart,
    updateCartQuantity,
  } = useApp();

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQty = async (id, qty) => {
    const quantity = Number(qty);
    if (quantity < 1) return;

    try {
      await updateCartQuantity(id, quantity);
    } catch (err) {
      console.error(err);
    }
  };

  const safeCart = Array.isArray(cart) ? cart : [];

  return (
    <div className="container">
      <div style={{ padding: 20, background: "#fff" }}>
        <h2>Shopping Cart</h2>

        {safeCart.length === 0 ? (
          <div>
            <p>Your cart is empty</p>
            <Link to="/products">Continue Shopping</Link>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 20 }}>
            
            {/* ITEMS */}
            <div style={{ flex: 2 }}>
              {safeCart.map((item) => (
                <div
                  key={item.productId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 15,
                    border: "1px solid #ddd",
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <h4>{item.name}</h4>
                    <p>UGX {Number(item.price || 0).toLocaleString()}</p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        handleQty(item.productId, e.target.value)
                      }
                      style={{ width: 60 }}
                    />

                    <p>
                      UGX{" "}
                      {(
                        Number(item.price || 0) * item.quantity
                      ).toLocaleString()}
                    </p>

                    <button onClick={() => handleRemove(item.productId)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div
              style={{
                flex: 1,
                padding: 15,
                background: "#f4f4f4",
              }}
            >
              <h3>Order Summary</h3>

              <p>
                Total:{" "}
                <b>
                  UGX {Number(cartTotal || 0).toLocaleString()}
                </b>
              </p>

              <Link to="/checkout">
                <button style={{ width: "100%", padding: 10 }}>
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;