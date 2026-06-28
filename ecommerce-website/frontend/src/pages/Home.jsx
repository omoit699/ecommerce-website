import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;

        const response = await axios.get(`${API_URL}/api/products`);

        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🛒 Loris E-Commerce Store</h1>
        <p>Your trusted online hardware shop</p>
      </header>

      <section style={styles.section}>
        <h2>Featured Products</h2>

        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p>No products available at the moment.</p>
        )}

        <div style={styles.grid}>
          {products.map((product) => (
            <div key={product._id} style={styles.card}>
              <h3>{product.name}</h3>

              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.image}
                />
              )}

              <p style={styles.price}>
                UGX {product.price?.toLocaleString()}
              </p>

              <p style={styles.desc}>
                {product.description || "No description available"}
              </p>

              <button style={styles.button}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  section: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  price: {
    fontWeight: "bold",
    marginTop: "10px",
  },

  desc: {
    fontSize: "14px",
    color: "#555",
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
