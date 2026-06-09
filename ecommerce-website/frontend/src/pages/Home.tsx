import React from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
    const products = [
        {
            id: 1,
            name: 'Smartphone',
            price: 500000,
            image: 'path/to/smartphone.jpg',
        },
        {
            id: 2,
            name: 'Laptop',
            price: 1500000,
            image: 'path/to/laptop.jpg',
        },
        {
            id: 3,
            name: 'T-Shirt',
            price: 20000,
            image: 'path/to/tshirt.jpg',
        },
        {
            id: 4,
            name: 'Sneakers',
            price: 80000,
            image: 'path/to/sneakers.jpg',
        },
    ];

    return (
        <div>
            <Header />
            <h1>Welcome to Our E-commerce Store</h1>
            <h2>Featured Products</h2>
            <div className="product-list">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;