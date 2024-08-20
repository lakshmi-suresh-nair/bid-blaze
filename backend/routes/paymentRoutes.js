const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create a payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
const createPaymentIntent = async (req, res) => {
    const { productId } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            console.log('Product not found for ID:', productId);
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!product.finalized) {
            console.log('Auction not finalized:', product);
            return res.status(400).json({ message: 'Auction not finalized yet' });
        }

        if (!product.highestBidder) {
            console.log('No highest bidder yet for product:', productId);
            return res.status(400).json({ message: 'No highest bidder yet. Payment cannot be processed.' });
        }

        if (product.highestBidder.toString() !== req.user._id.toString()) {
            console.log('Not authorized for payment:', req.user._id);
            return res.status(401).json({ message: 'Not authorized to pay for this product' });
        }

        console.log('Attempting to create payment intent for product:', productId, 'with amount:', product.currentBid * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.currentBid * 100, // Stripe uses the smallest currency unit, so multiply by 100 for cents
            currency: 'usd',
            payment_method_types: ['card'],
            metadata: { productId: product._id.toString() }
        });

        console.log('Payment Intent created successfully:', paymentIntent);

        res.status(200).json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

router.post('/create-payment-intent', protect, createPaymentIntent);

module.exports = router;
