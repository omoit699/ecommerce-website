import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

const ProductCard = ({ product }) => {
    const { addToCart } = useApp();
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const productId = product._id || product.id?.toString() || '';
    const imageUrl = product.imageUrl || product.image || 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(product.name);

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

    const isOutOfStock = product.stock !== undefined && product.stock <= 0;

    return (
        <div className="product-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <img src={imageUrl} alt={product.name} className="product-image" />
            
            <div className="product-info" style={{ padding: '10px 0', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '400', margin: '0 0 8px 0', color: '#313131', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {product.name}
                    </h3>
                    {product.description && (
                        <p className="description" style={{ fontSize: '13px', color: '#75757A', margin: '0 0 8px 0', textAlign: 'left' }}>
                            {product.description}
                        </p>
                    )}
                </div>

                <div>
                    <p className="price" style={{ fontSize: '20px', fontWeight: 'bold', color: '#313131', margin: '5px 0', textAlign: 'left' }}>
                        UGX {product.price?.toLocaleString()}
                    </p>
                    
                    {product.stock !== undefined && (
                        <p className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`} style={{ fontSize: '12px', textAlign: 'left', margin: '5px 0', color: product.stock > 0 ? '#2A8737' : '#D62929', fontWeight: 'bold' }}>
                            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                        </p>
                    )}

                    <div className="product-actions" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <input
                            type="number"
                            min="1"
                            max={product.stock || 100}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="quantity-input"
                            disabled={isLoading || isOutOfStock}
                            style={{ width: '60px', padding: '8px', border: '1px solid #F1F1F2', borderRadius: '4px', textAlign: 'center', boxSizing: 'border-box' }}
                        />
                        <button
                            onClick={handleAddToCart}
                            disabled={isLoading || isOutOfStock}
                            className="btn"
                            style={{ padding: '10px', fontSize: '13px', backgroundColor: isOutOfStock ? '#A1A1A6' : '#F68B1E' }}
                        >
                            {isLoading ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                    
                    {message && (
                        <p className="message" style={{ fontSize: '13px', marginTop: '8px', fontWeight: 'bold', color: message.includes('Error') || message.includes('missing') ? '#D62929' : '#2A8737' }}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
