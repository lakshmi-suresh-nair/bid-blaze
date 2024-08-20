import React, { useState } from 'react';

function Checkout() {
    const [paymentStatus, setPaymentStatus] = useState(null);

    const handlePayment = async () => {
        // This is where you'd call your payment API
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/payments/create-payment-intent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Include necessary payment details here, like product ID
                }),
            });

            if (!response.ok) {
                throw new Error(`Payment failed: ${response.statusText}`);
            }

            const data = await response.json();
            setPaymentStatus('Payment successful!');
            console.log('Payment Intent:', data);
        } catch (error) {
            setPaymentStatus('Payment failed. Please try again.');
            console.error('Error processing payment:', error);
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <p>Finalize your purchase here.</p>
            <button onClick={handlePayment}>Pay Now</button>
            {paymentStatus && <p>{paymentStatus}</p>}
        </div>
    );
}

export default Checkout;
