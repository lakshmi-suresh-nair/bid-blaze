import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/add-product">Add Product</Link></li>
                        <li><Link to="/checkout">Checkout</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Categories</h3>
                    <ul>
                        <li><Link to="/category/Electronics">Electronics</Link></li>
                        <li><Link to="/category/Clothing">Clothing</Link></li>
                        <li><Link to="/category/Accessories">Accessories</Link></li>
                        <li><Link to="/category/Home Decor">Home Decor</Link></li>
                        <li><Link to="/category/Watches">Watches</Link></li>
                        <li><Link to="/category/Appliances">Appliances</Link></li>
                        <li><Link to="/category/Others">Others</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Connect With Us</h3>
                    <div className="social-icons">
                        <button onClick={() => window.location.href='https://www.facebook.com'} className="social-icon" aria-label="Facebook">FB</button>
                        <button onClick={() => window.location.href='https://www.twitter.com'} className="social-icon" aria-label="Twitter">TW</button>
                        <button onClick={() => window.location.href='https://www.linkedin.com'} className="social-icon" aria-label="LinkedIn">IN</button>
                        <button onClick={() => window.location.href='https://www.instagram.com'} className="social-icon" aria-label="Instagram">IG</button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Bid Blaze. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
