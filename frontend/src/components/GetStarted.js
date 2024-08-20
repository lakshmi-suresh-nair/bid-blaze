import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './GetStarted.css';

function GetStarted() {
    const navigate = useNavigate();

    const handleViewProducts = () => {
        navigate('/view-products');
    };

    const handleListProduct = () => {
        navigate('/add-product');
    };

    return (
        <div className="get-started-container">
            <Container className="content-wrapper">
                <h2 className="get-started-title">Get Started</h2>
                <p className="intro-text">
                    Thank you for choosing Bid Blaze, the perfect auction and bidding platform for you. What would you like to do?
                </p>
                <div className="button-group">
                    <Button 
                        variant="primary" 
                        size="lg" 
                        className="get-started-button" 
                        onClick={handleViewProducts}
                    >
                        View Products
                    </Button>
                    <Button 
                        variant="secondary" 
                        size="lg" 
                        className="get-started-button" 
                        onClick={handleListProduct}
                    >
                        List a Product
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default GetStarted;