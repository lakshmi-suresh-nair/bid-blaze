// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');

// router.get('/protected', protect, (req, res) => {
//     res.json({ message: 'Access granted to protected route' });
// });

// module.exports = router;


// src/components/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);

    if (!user) {
        // If user is not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If user is authenticated, allow access to the route
    return children;
}

export default ProtectedRoute;
