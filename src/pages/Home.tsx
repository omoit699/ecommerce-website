import React from 'react';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
    const products = [
        { id: 1, name: 'Product 1', price: 29.99, image: 'path/to/image1.jpg' },
        { id: 2, name: 'Product 2', price: 39.99, image: 'path/to/image2.jpg' },
        { id: 3, name: 'Product 3', price: 49.99, image: 'path/to/image3.jpg' },
    ];

    return (
        <div className="home">
            <h1>Welcome to Our E-commerce Store</h1>
            <div className="product-list">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;