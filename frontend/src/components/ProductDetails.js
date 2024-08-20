import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './ProductDetails.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [bid, setBid] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`);
                if (!response.ok) throw new Error('Failed to load product details');
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleBid = async () => {
        if (!bid || parseFloat(bid) <= parseFloat(product.currentBid)) {
            return setError('Your bid must be higher than the current bid');
        }

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('You need to log in to place a bid');
                return navigate('/login');
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}/bid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ amount: bid }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to place bid');
            setProduct(data);
            setBid('');
        } catch (err) {
            setError(err.message);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (error) return <div className="error-message">{error}</div>;
    if (!product) return <div className="loading-message">Loading product details...</div>;

    return (
        <div className="product-details-container">
            <h1 className="product-name">{product.name}</h1>
            <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
                onClick={openModal}
            />
            <p className="product-description">{product.description}</p>
            <p className="product-bid">Current Bid: ${product.currentBid}</p>
            <p className="product-auction-end">Auction Ends: {new Date(product.auctionEndTime).toLocaleString()}</p>
            <div className="bid-container">
                <input
                    type="number"
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    placeholder="Enter your bid"
                    className="bid-input"
                />
                <button onClick={handleBid} className="bid-button">Place Bid</button>
            </div>

            {/* Modal for Image Zoom */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Product Image Zoom"
                className="zoom-modal"
                overlayClassName="zoom-overlay"
            >
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="zoomed-image"
                />
            </Modal>
        </div>
    );
}

export default ProductDetails;
