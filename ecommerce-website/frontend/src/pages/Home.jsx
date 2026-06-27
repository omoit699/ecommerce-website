import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { productAPI } from "../services/api.js";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        const data = await productAPI.getAllProducts();

        // SAFE FIX (this is what I meant)
        const safeData = Array.isArray(data)
          ? data
          : data?.products || [];

        setProducts(safeData.slice(0, 4));
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Loris E-9</h1>
      </section>

      <div className="container">
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;