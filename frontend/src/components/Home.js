import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError('Failed to load products. Please try again later.');
            }
        };

        fetchProducts();
    }, []);

    const handleGetStarted = () => {
        navigate('/get-started');
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h1 className="display-4">Connecting Buyers and Sellers in a Thriving Auction Marketplace, One Bid at a Time!</h1>
                            <p className="lead">Bid Blaze is a cutting-edge online auction platform designed to bring together buyers and sellers from all corners of the globe. Our mission is to create a dynamic and engaging marketplace where users can easily participate in auctions, manage their listings, and connect with a community of enthusiasts. With a focus on user experience, Bid Blaze offers a robust bidding system, comprehensive seller management tools, and mobile-friendly design to ensure accessibility and convenience. Whether you're a casual bidder or a professional seller, Bid Blaze is the ultimate destination for a fair, transparent, and enjoyable auction experience.</p>
                            <Button variant="primary" size="lg" className="custom-btn" onClick={handleGetStarted}>Get Started</Button>
                        </Col>
                        <Col md={6}>
                            <img src="/assets/images/homepage.webp" alt="Welcome" className="img-fluid hero-image" />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* How it Works Section */}
            <section className="how-it-works">
                <Container fluid>
                    <h2 className="how-it-works-heading">How It Works</h2>
                    <Row className="justify-content-center how-it-works-grid">
                        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="how-it-works-card">
                                <Card.Body>
                                    <Card.Title>Step 1</Card.Title>
                                    <Card.Text>Create an account and sign in.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="how-it-works-card">
                                <Card.Body>
                                    <Card.Title>Step 2</Card.Title>
                                    <Card.Text>List your products for auction.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="how-it-works-card">
                                <Card.Body>
                                    <Card.Title>Step 3</Card.Title>
                                    <Card.Text>Browse and bid on listed products.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="how-it-works-card">
                                <Card.Body>
                                    <Card.Title>Step 4</Card.Title>
                                    <Card.Text>Finalize the auction and complete the payment.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Featured Products Section */}
            <section className="featured-products">
                <Container fluid>
                    <h2 className="products-heading">Featured Products</h2>
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
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <Container fluid>
                    <h2 className="faq-heading">Frequently Asked Questions</h2>
                    <div className="faq-container">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>What types of items can be sold on an online auction platform?</Accordion.Header>
                                <Accordion.Body>
                                    Almost anything can be sold on our auction platform, including antiques, art, collectibles, electronics, and more.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>How do I participate in an auction?</Accordion.Header>
                                <Accordion.Body>
                                    You can participate in an auction by creating an account, browsing the available items, and placing bids on the items you're interested in.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>What happens if I win an item in an auction?</Accordion.Header>
                                <Accordion.Body>
                                    If you win an item, you will be notified and will have a set amount of time to complete the payment process to finalize the purchase.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>What is a reserve price in an auction?</Accordion.Header>
                                <Accordion.Body>
                                    A reserve price is the minimum price that the seller is willing to accept for an item. If the bidding does not reach the reserve price, the item will not be sold.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>What happens if there is a dispute between the buyer and seller in an auction?</Accordion.Header>
                                <Accordion.Body>
                                    If there is a dispute between the buyer and seller, our platform offers mediation services to help resolve the issue.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>How does an online auction work?</Accordion.Header>
                                <Accordion.Body>
                                    An online auction works by allowing buyers to place bids on items during a specified time. The highest bid at the end of the auction wins the item.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Home;
