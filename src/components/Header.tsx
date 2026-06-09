import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <h1>E-Commerce Website</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/checkout">Checkout</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;