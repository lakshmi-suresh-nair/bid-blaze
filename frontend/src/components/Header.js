// src/components/Header.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    <img src="/assets/images/circular_logo_image.png" alt="Bid Blaze Logo" className="logo-image" />
                    <span>Bid Blaze</span>
                </Link>
                <nav className="main-nav">
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/add-product">Add Product</Link></li>
                        <li><Link to="/checkout">Checkout</Link></li>
                        {user ? (
                            <>
                                <li><Link to="/my-account">My Account</Link></li> {/* My Account link */}
                                <li className="welcome-message">Welcome, {user.username}</li>
                                <li><button onClick={logout} className="btn">Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" className="btn">Login</Link></li>
                                <li><Link to="/sign-up" className="btn">Sign Up</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
