import React from "react";
import { useApp } from "../context/AppContext.jsx";

const ProductCard = ({ product = {} }) => {
  const { addToCart } = useApp();

  const {
    _id,
    id,
    name = "Unnamed product",
    price = 0,
    stock = 0,
    image,
    imageUrl,
    description = "No description available",
  } = product;

  const productId = _id || id || null;

  const handleAddToCart = async () => {
    if (!productId) {
      console.error("Invalid product ID");
      return;
    }

    try {
      await addToCart(productId, name, price, 1);
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const productImage = imageUrl || image || "/placeholder.png";

  return (
    <div className="product-card">
      <img
        src={productImage}
        alt={name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />

      <h3>{name}</h3>

      <p>UGX {Number(price).toLocaleString()}</p>

      <p>{description}</p>

      <p>
        {stock > 0 ? `In stock: ${stock}` : "Out of stock"}
      </p>

      <button
        className="btn"
        disabled={stock <= 0 || !productId}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;