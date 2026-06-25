import React, { useEffect, useState } from "react";
import { checkoutAPI } from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const data = await checkoutAPI.getOrderHistory(userId);
      setOrders(data.orders || []);
    };

    loadOrders();
  }, []);

  return (
    <div className="container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{ border: "1px solid #ddd", margin: 10, padding: 10 }}>
            <h4>Order ID: {order._id}</h4>
            <p>Status: {order.status}</p>
            <p>Total: UGX {order.total?.toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;