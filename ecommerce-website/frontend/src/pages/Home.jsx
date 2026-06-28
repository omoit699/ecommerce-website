import React, { useEffect, useState } from "react";
import axios from "axios";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Shoes",
  "Home & Living",
  "Kitchen & Dining",
  "Beauty",
  "Baby Products",
  "Sports",
  "Pets",
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API_URL}/api/products`);

        setProducts(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.log("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // ADD TO CART
  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    alert(`${product.name} added to cart 🛒`);
  };

  // FILTER CATEGORY
  const filterCategory = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      setFiltered(products);
    } else {
      const filteredData = products.filter(
        (p) => p.category === category
      );
      setFiltered(filteredData);
    }
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <header style={styles.header}>
        <h2>🛒 Loris E9 Store</h2>
        <input placeholder="Search products..." style={styles.search} />
        <div>
          Cart: <b>{cart.length}</b>
        </div>
      </header>

      {/* CATEGORY BAR */}
      <div style={styles.categoryBar}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => filterCategory(cat)}
            style={{
              ...styles.catBtn,
              background: activeCategory === cat ? "#ff6600" : "#eee",
              color: activeCategory === cat ? "white" : "black",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={styles.container}>

        <h3>{activeCategory} Products</h3>

        {loading && <p>Loading products...</p>}

        <div style={styles.grid}>
          {filtered.map((p) => (
            <div key={p._id} style={styles.card}>

              {p.image ? (
                <img src={p.image} alt={p.name} style={styles.img} />
              ) : (
                <div style={styles.noImg}>No Image</div>
              )}

              <h4>{p.name}</h4>

              <p style={styles.price}>
                UGX {p.price?.toLocaleString()}
              </p>

              <button
                onClick={() => addToCart(p)}
                style={styles.btn}
              >
                Add to Cart
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Arial",
    background: "#f4f4f4",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ff6600",
    padding: "10px 20px",
    color: "white",
  },

  search: {
    width: "40%",
    padding: "8px",
    borderRadius: "5px",
    border: "none",
  },

  categoryBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    padding: "10px",
    background: "#fff",
  },

  catBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  },

  container: {
    padding: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginTop: "15px",
  },

  card: {
    background: "#fff",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
  },

  img: {
    width: "100%",
    height: "120px",
    objectFit: "contain",
  },

  noImg: {
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#aaa",
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
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Home;
