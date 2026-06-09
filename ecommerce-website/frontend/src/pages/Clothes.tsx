import React from 'react';
import ProductCard from '../components/ProductCard';

const Clothes = () => {
    const clothingItems = [
        {
            id: 1,
            name: 'T-Shirt',
            price: 25000,
            imageUrl: '/images/clothes/tshirt.jpg',
        },
        {
            id: 2,
            name: 'Jeans',
            price: 50000,
            imageUrl: '/images/clothes/jeans.jpg',
        },
        {
            id: 3,
            name: 'Jacket',
            price: 75000,
            imageUrl: '/images/clothes/jacket.jpg',
        },
    ];

    return (
        <div>
            <h1>Clothing Items</h1>
            <div className="product-list">
                {clothingItems.map(item => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};

export default Clothes;