import React from 'react';

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        price: number;
        imageUrl: string;
    };
    onAddToCart: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: {product.price} UGX</p>
            <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;