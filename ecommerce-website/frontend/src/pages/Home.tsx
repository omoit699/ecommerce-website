import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/apiService';

const Home: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const data = await productAPI.getAllProducts();
                setProducts(data.slice(0, 4) || []);
            } catch (err) {
                setError('Failed to load products');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="home-page">
            <section className="hero">
                <h1>Welcome to Our E-commerce Store</h1>
                <p>Discover amazing products at great prices</p>
            </section>

            <section className="featured-products">
                <h2>Featured Products</h2>
                {isLoading && <p>Loading products...</p>}
                {error && <p className="error">{error}</p>}
                <div className="product-list">
                    {products.length > 0 ? (
                        products.map((product: any) => (
                            <ProductCard key={product._id || product.id} product={product} />
                        ))
                    ) : (
                        !isLoading && <p>No products available</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;