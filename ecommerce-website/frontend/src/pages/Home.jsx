import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <header style={styles.navbar}>
        <h2 style={styles.logo}>🛒 Loris E9</h2>

        <input
          type="text"
          placeholder="Search products..."
          style={styles.search}
        />

        <div style={styles.navRight}>
          <span>Login</span>
          <span>Cart 🛒</span>
        </div>
      </header>

      {/* HERO BANNER */}
      <section style={styles.hero}>
        <h1>Welcome to Loris E9 Store</h1>
        <p>Hardware, Tools, Building Materials & More</p>
      </section>

      {/* CATEGORIES */}
      <section style={styles.categories}>
        <div style={styles.catBox}>Cement</div>
        <div style={styles.catBox}>Tools</div>
        <div style={styles.catBox}>Plumbing</div>
        <div style={styles.catBox}>Electrical</div>
        <div style={styles.catBox}>Paint</div>
      </section>

      {/* PRODUCTS */}
      <section style={styles.products}>
        <h2>Featured Products</h2>

        {loading && <p>Loading products...</p>}

        <div style={styles.grid}>
          {products.map((p) => (
            <div key={p._id} style={styles.card}>
              <div style={styles.imgBox}>
                {p.image ? (
                  <img src={p.image} alt={p.name} style={styles.image} />
                ) : (
                  <div style={styles.noImage}>No Image</div>
                )}
              </div>

              <h3>{p.name}</h3>
              <p style={styles.price}>
                UGX {p.price?.toLocaleString()}
              </p>

              <button style={styles.btn}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Arial",
    background: "#f5f5f5",
    minHeight: "100vh",
  },

  /* NAVBAR */
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ff6600",
    padding: "10px 20px",
    color: "white",
  },

  logo: {
    margin: 0,
  },

  search: {
    width: "40%",
    padding: "8px",
    borderRadius: "5px",
    border: "none",
  },

  navRight: {
    display: "flex",
    gap: "15px",
    cursor: "pointer",
  },

  /* HERO */
  hero: {
    background: "#fff",
    padding: "40px",
    textAlign: "center",
    marginBottom: "10px",
  },

  /* CATEGORIES */
  categories: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    padding: "10px",
    flexWrap: "wrap",
  },

  catBox: {
    background: "#fff",
    padding: "10px 15px",
    borderRadius: "20px",
    cursor: "pointer",
  },

  /* PRODUCTS */
  products: {
    padding: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
  },

  imgBox: {
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    maxWidth: "100%",
    maxHeight: "120px",
    objectFit: "contain",
  },

  noImage: {
    color: "#999",
  },

  price: {
    fontWeight: "bold",
  },

  btn: {
    background: "#ff6600",
    color: "white",
    border: "none",
    padding: "8px",
    width: "100%",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
