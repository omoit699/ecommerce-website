import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
// Pointing to your correct, clean JavaScript api file
import { productAPI } from '../services/api.js'; 

const Home = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const data = await productAPI.getAllProducts();
                // Safely slices the top 4 items for the featured display block
                if (Array.isArray(data)) {
                    setProducts(data.slice(0, 4));
                } else if (data && Array.isArray(data.products)) {
                    setProducts(data.products.slice(0, 4));
                } else {
                    setProducts([]);
                }
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
            {/* Jumia-Style Premium Hero Banner Section */}
            <section className="hero" style={{ backgroundColor: '#F68B1E', color: '#FFFFFF', padding: '40px 20px', textAlign: 'center', marginBottom: '30px', borderRadius: '4px' }}>
                <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>Welcome to Loris E-9</h1>
                <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: '300' }}>Your everything you need is here for you to shop.</p>
            </section>

            {/* Featured Showcase Grid */}
            <div className="container">
                <section className="featured-products">
                    <h2 style={{ marginBottom: '20px', borderBottom: '2px solid #F1F1F2', paddingBottom: '10px' }}>Featured Products</h2>
                    
                    {isLoading && <p style={{ textAlign: 'center' }}>Loading products...</p>}
                    {error && <p className="error" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    
                    <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product._id || product.id} product={product} />
                            ))
                        ) : (
                            !isLoading && <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No products available</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
