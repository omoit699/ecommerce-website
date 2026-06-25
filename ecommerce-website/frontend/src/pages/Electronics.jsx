import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
// Pointing to your correct, clean JavaScript api file
import { productAPI } from "../services/api.js";

const Electronics = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await productAPI.getAllProducts("Electronics");
        setProducts(data || []);
      } catch (err) {
        setError("Failed to load electronics");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="category-page">
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>
          Electronics Collection
        </h1>

        {isLoading && (
          <p style={{ textAlign: "center" }}>Loading products...</p>
        )}
        {error && (
          <p className="error" style={{ color: "red", textAlign: "center" }}>
            {error}
          </p>
        )}

        <div
          className="product-list"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.length > 0
            ? products.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))
            : !isLoading && (
                <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
                  No electronics available
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default Electronics;
