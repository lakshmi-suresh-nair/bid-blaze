import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

function CategoryPage() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products?category=${category}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.statusText}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError('Failed to load products. Please try again later.');
            }
        };

        fetchProductsByCategory();
    }, [category]);

    return (
        <div className="category-page-container">
            <Container fluid>
                <h2 className="category-heading">{category}</h2>
                {error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : (
                    <div className="products-container">
                        <Row className="product-grid">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <Col xs={12} sm={6} md={4} lg={3} key={product._id} className="mb-4">
                                        <Card className="product-card">
                                            <Card.Img variant="top" src={product.imageUrl} alt={product.name} className="product-image" />
                                            <Card.Body>
                                                <Card.Title>{product.name}</Card.Title>
                                                <Card.Text>Current Bid: ${product.currentBid}</Card.Text>
                                                <Button variant="primary" href={`/product/${product._id}`} className="custom-btn">
                                                    View Product
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Col xs={12}>
                                    <p className="text-center">No products available in this category.</p>
                                </Col>
                            )}
                        </Row>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default CategoryPage;