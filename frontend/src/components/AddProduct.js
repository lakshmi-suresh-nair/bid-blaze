import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

function AddProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startingBid, setStartingBid] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [auctionEndTime, setAuctionEndTime] = useState('');
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let finalImageUrl = imageUrl;

            if (selectedFile) {
                finalImageUrl = imageUrl;
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({ name, description, startingBid, imageUrl: finalImageUrl, auctionEndTime, category }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add product');
            }

            await fetch(`${process.env.REACT_APP_API_URL}/products/${data._id}/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            navigate('/');
        } catch (err) {
            console.error('Error adding product:', err);
            setError('Failed to add product. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add New Product</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Starting Bid:</label>
                    <input
                        type="number"
                        value={startingBid}
                        onChange={(e) => setStartingBid(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Home Decor">Home Decor</option>
                        <option value="Watches">Watches</option>
                        <option value="Appliances">Appliances</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Upload from local device:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                {imageUrl && (
                    <div className="image-preview">
                        <img src={imageUrl} alt="Preview" />
                    </div>
                )}
                <div className="form-group">
                    <label>Auction End Time:</label>
                    <input
                        type="datetime-local"
                        value={auctionEndTime}
                        onChange={(e) => setAuctionEndTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-submit" disabled={isLoading}>
                    {isLoading ? 'Adding Product...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
