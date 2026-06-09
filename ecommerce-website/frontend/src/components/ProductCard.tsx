import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
    product: {
        _id?: string;
        id?: number;
        name: string;
        price: number;
        imageUrl?: string;
        image?: string;
        description?: string;
        stock?: number;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useApp();
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const productId = product._id || product.id?.toString() || '';
    const imageUrl = product.imageUrl || product.image || 'https://via.placeholder.com/300x300?text=' + product.name;

    const handleAddToCart = async () => {
        if (!productId) {
            setMessage('Product ID is missing');
            return;
        }

        setIsLoading(true);
        try {
            await addToCart(productId, product.name, product.price, quantity);
            setMessage('Added to cart!');
            setTimeout(() => setMessage(''), 2000);
            setQuantity(1);
        } catch (error) {
            setMessage('Error adding to cart');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="product-card">
            <img src={imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
                <h3>{product.name}</h3>
                {product.description && <p className="description">{product.description}</p>}
                <p className="price">UGX {product.price?.toLocaleString()}</p>
                {product.stock !== undefined && (
                    <p className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        Stock: {product.stock}
                    </p>
                )}
                <div className="product-actions">
                    <input
                        type="number"
                        min="1"
                        max={product.stock || 100}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="quantity-input"
                        disabled={isLoading || (product.stock !== undefined && product.stock <= 0)}
                    />
                    <button
                        onClick={handleAddToCart}
                        disabled={isLoading || (product.stock !== undefined && product.stock <= 0)}
                        className="add-to-cart-btn"
                    >
                        {isLoading ? 'Adding...' : 'Add to Cart'}
                    </button>
                </div>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default ProductCard;