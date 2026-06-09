import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">E-Commerce</Link>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/checkout">Checkout</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/admin">Admin Dashboard</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;