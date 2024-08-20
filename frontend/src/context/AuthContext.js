// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                console.log('Decoded user from token:', decodedUser); // Debugging log
                setIsAuthenticated(true);
                setUser(decodedUser);
            } catch (error) {
                console.error('Error decoding token:', error);
                logout();
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        try {
            const decodedUser = jwtDecode(token);
            console.log('Decoded user from login:', decodedUser); // Debugging log
            setIsAuthenticated(true);
            setUser(decodedUser);
        } catch (error) {
            console.error('Error decoding token:', error);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
