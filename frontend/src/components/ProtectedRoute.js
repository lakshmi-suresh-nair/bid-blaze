// src/components/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) {
        // If the user is not authenticated, redirect to login page
        // and pass the intended destination in the state
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authenticated, render the children
    return children;
}

export default ProtectedRoute;
