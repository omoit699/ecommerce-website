import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/apiService';

const Shoes: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const data = await productAPI.getAllProducts('Shoes');
                setProducts(data || []);
            } catch (err) {
                setError('Failed to load shoes');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="category-page">
            <h1>Shoes Collection</h1>
            {isLoading && <p>Loading products...</p>}
            {error && <p className="error">{error}</p>}
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product: any) => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))
                ) : (
                    !isLoading && <p>No shoes available</p>
                )}
            </div>
        </div>
    );
};

export default Shoes;