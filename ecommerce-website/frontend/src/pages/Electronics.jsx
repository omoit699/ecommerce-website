import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
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

        const safeData = Array.isArray(data)
          ? data
          : data?.products || [];

        setProducts(safeData);
      } catch (err) {
        setError("Failed to load electronics");
        console.error(err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>Electronics</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
            />
          ))
        ) : (
          !isLoading && <p>No electronics found</p>
        )}
      </div>
    </div>
  );
};

export default Electronics;