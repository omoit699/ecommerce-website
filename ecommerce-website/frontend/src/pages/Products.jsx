import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { productAPI } from "../services/api.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        const data = await productAPI.getAllProducts();

        const safeData = Array.isArray(data)
          ? data
          : data?.products || [];

        setProducts(safeData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>All Products</h1>

      {isLoading && <p>Loading...</p>}

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
            />
          ))
        ) : (
          !isLoading && <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;