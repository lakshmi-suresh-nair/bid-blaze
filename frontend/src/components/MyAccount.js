// src/components/MyAccount.js

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './MyAccount.css';

function MyAccount() {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="my-account-container">
            <h2>My Account</h2>
            <div className="account-details">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
    );
}

export default MyAccount;
