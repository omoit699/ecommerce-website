import React from 'react';
import ProductCard from '../components/ProductCard';

const electronicsData = [
    {
        id: 1,
        name: 'Smartphone',
        price: 500000,
        image: 'path/to/smartphone-image.jpg',
    },
    {
        id: 2,
        name: 'Laptop',
        price: 1500000,
        image: 'path/to/laptop-image.jpg',
    },
    {
        id: 3,
        name: 'Headphones',
        price: 100000,
        image: 'path/to/headphones-image.jpg',
    },
];

const Electronics = () => {
    return (
        <div>
            <h1>Electronics</h1>
            <div className="product-list">
                {electronicsData.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Electronics;