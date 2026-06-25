import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
// Import your clean, centralized API services file
import { productAPI } from "../services/api.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Uses the pre-configured base URL instead of a broken relative route
        const data = await productAPI.getAllProducts();
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="products-page">
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>
          Available Products
        </h1>

        {isLoading && (
          <p style={{ textAlign: "center" }}>Loading products...</p>
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
                  No products found
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default Products;
