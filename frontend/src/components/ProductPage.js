import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch product details from the backend
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  const handleBid = () => {
    fetch(`/api/products/${id}/bid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're storing JWT in localStorage
      },
      body: JSON.stringify({ amount: bidAmount }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        } else {
          setMessage('Bid placed successfully!');
          setProduct(data); // Update product details with the latest bid
        }
      })
      .catch((error) => console.error('Error placing bid:', error));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Current Bid: ${product.currentBid}</p>
      <p>Auction Ends: {new Date(product.auctionEndTime).toLocaleString()}</p>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your bid"
      />
      <button onClick={handleBid}>Place Bid</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ProductPage;
