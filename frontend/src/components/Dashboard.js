import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [myListings, setMyListings] = useState([]);
  const [myBids, setMyBids] = useState([]);

  useEffect(() => {
    // Fetch user's listings and bids from the backend
    fetch('/api/products/mylistings', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMyListings(data))
      .catch((error) => console.error('Error fetching listings:', error));

    // Fetch user's bids
    fetch('/api/users/mybids', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMyBids(data))
      .catch((error) => console.error('Error fetching bids:', error));
  }, []);

  return (
    <div>
      <h1>Your Dashboard</h1>

      <h2>Your Listings</h2>
      <ul>
        {myListings.map((listing) => (
          <li key={listing._id}>
            {listing.name} - Current Bid: ${listing.currentBid}
          </li>
        ))}
      </ul>

      <h2>Your Bids</h2>
      <ul>
        {myBids.map((bid) => (
          <li key={bid._id}>
            {bid.productName} - Your Bid: ${bid.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
