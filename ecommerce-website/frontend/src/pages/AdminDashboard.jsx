import React, { useEffect, useState } from "react";
import { productAPI } from "../services/api.js";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getAllProducts();
      setProducts(data || []);
    } catch (error) {
      setError("Failed to load products");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {products.map((p) => (
          <div key={p._id || p.id}>
            <h4>{p.name}</h4>
            <p>UGX {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;