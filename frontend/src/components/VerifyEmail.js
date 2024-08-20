// src/components/VerifyEmail.js
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './VerifyEmail.css';

function VerifyEmail() {
    const [message, setMessage] = useState('Verifying your email...');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');

        const verifyEmail = async () => {
            if (!token) {
                setMessage('Invalid verification link.');
                return;
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users/verify-email?token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Email verification failed.');
                }

                const data = await response.json();
                setMessage(data.message);
                
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error) {
                setMessage(error.message || 'An error occurred during verification.');
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    return (
        <div className="verify-email-container">
            <h2>Email Verification</h2>
            <p>{message}</p>
        </div>
    );
}

export default VerifyEmail;
