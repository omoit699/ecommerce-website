import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/apiService';

const Clothes = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const data = await productAPI.getAllProducts('Clothes');
                setProducts(data || []);
            } catch (err) {
                setError('Failed to load clothing items');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="category-page">
            <h1>Clothing Items</h1>
            {isLoading && <p>Loading products...</p>}
            {error && <p className="error">{error}</p>}
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product: any) => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))
                ) : (
                    !isLoading && <p>No clothing items available</p>
                )}
            </div>
        </div>
    );
};

export default Clothes;