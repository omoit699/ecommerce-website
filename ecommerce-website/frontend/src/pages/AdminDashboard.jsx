import React, { useEffect, useState } from "react";
import { checkoutAPI } from "../services/api";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await checkoutAPI.getOrderHistory("all");
      setOrders(res?.orders || []);
    } catch (err) {
      setError("Failed to load orders");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await checkoutAPI.updateOrderStatus(orderId, status);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && orders.length === 0 && (
        <p>No orders found</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        {orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              borderRadius: 5,
            }}
          >
            <h4>Order ID: {order._id}</h4>

            <p>
              Status:{" "}
              <b style={{ color: "green" }}>
                {order.status}
              </b>
            </p>

            <p>
              Total: UGX {Number(order.total || 0).toLocaleString()}
            </p>

            {/* STATUS CONTROL */}
            <div style={{ marginTop: 10 }}>
              <button
                onClick={() =>
                  updateStatus(order._id, "processing")
                }
              >
                Processing
              </button>

              <button
                onClick={() =>
                  updateStatus(order._id, "shipped")
                }
              >
                Shipped
              </button>

              <button
                onClick={() =>
                  updateStatus(order._id, "delivered")
                }
              >
                Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;