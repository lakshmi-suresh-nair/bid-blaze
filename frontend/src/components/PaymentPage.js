// src/components/PaymentPage.js

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import './PaymentPage.css';

// Load your publishable Stripe key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function PaymentPage() {
    const [clientSecret, setClientSecret] = useState('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const productId = searchParams.get('productId');

        const createPaymentIntent = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/payments/create-payment-intent`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ productId }),
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to create payment intent');
                }

                setClientSecret(data.clientSecret);
            } catch (err) {
                console.error('Error creating payment intent:', err.message);
            }
        };

        if (productId) {
            createPaymentIntent();
        }
    }, [searchParams]);

    return (
        <div className="payment-page-container">
            <h2>Complete Your Payment</h2>
            {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <p>Loading payment details...</p>
            )}
        </div>
    );
}

export default PaymentPage;
