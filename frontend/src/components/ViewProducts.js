import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './ViewProducts.css';

function ViewProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.statusText}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError('Failed to load products. Please try again later.');
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="view-products-container">
            <Container fluid>
                <h2 className="products-heading">Available Products</h2>
                {error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : (
                    <Row className="justify-content-center product-grid">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={product._id} className="mb-4">
                                    <Card className="product-card">
                                        <Card.Img variant="top" src={product.imageUrl} alt={product.name} className="product-image" />
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>
                                                Current Bid: ${product.currentBid}
                                            </Card.Text>
                                            <Button variant="primary" href={`/product/${product._id}`} className="custom-btn">
                                                View Product
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col xs={12}>
                                <p className="text-center">No products available</p>
                            </Col>
                        )}
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default ViewProducts;