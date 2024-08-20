import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext for managing authentication

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            element={
                user ? (
                    <Element />
                ) : (
                    <Navigate to="/login" replace />
                )
            }
        />
    );
};

export default PrivateRoute;
