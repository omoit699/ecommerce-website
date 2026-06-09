import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Header.css';

const Header: React.FC = () => {
    const { user, logout, cart } = useApp();
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">🛒 E-Commerce Store</Link>
                </div>
                <nav className="nav">
                    <ul>
                        <li><Link to="/products">All Products</Link></li>
                        <li><Link to="/electronics">Electronics</Link></li>
                        <li><Link to="/clothes">Clothes</Link></li>
                        <li><Link to="/shoes">Shoes</Link></li>
                    </ul>
                </nav>
                <div className="header-actions">
                    <Link to="/cart" className="cart-link">
                        🛒 Cart ({cartCount})
                    </Link>
                    {user ? (
                        <div className="user-menu">
                            <span className="user-name">👤 {user.username}</span>
                            <button onClick={logout} className="logout-btn">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/signin" className="signin-link">
                            Sign In
                        </Link>
                    )}
                    <Link to="/admin" className="admin-link">
                        Admin
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;