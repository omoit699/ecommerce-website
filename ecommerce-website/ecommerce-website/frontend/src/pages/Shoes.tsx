import React from 'react';
import ProductCard from '../components/ProductCard';

const shoesData = [
    {
        id: 1,
        name: 'Running Shoes',
        price: 150000,
        image: 'path/to/running-shoes.jpg',
    },
    {
        id: 2,
        name: 'Casual Sneakers',
        price: 120000,
        image: 'path/to/casual-sneakers.jpg',
    },
    {
        id: 3,
        name: 'Formal Shoes',
        price: 200000,
        image: 'path/to/formal-shoes.jpg',
    },
];

const Shoes: React.FC = () => {
    return (
        <div>
            <h1>Shoes Collection</h1>
            <div className="product-grid">
                {shoesData.map((shoe) => (
                    <ProductCard key={shoe.id} product={shoe} />
                ))}
            </div>
        </div>
    );
};

export default Shoes;