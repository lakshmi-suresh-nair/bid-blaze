const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/Product');

const createPaymentIntent = async (req, res) => {
    const { productId } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!product.finalized) {
            return res.status(400).json({ message: 'Auction not finalized yet' });
        }

        if (product.highestBidder.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to pay for this product' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.currentBid * 100, // Stripe uses the smallest currency unit, so multiply by 100 for cents
            currency: 'usd',
            payment_method_types: ['card'],
            metadata: { productId: product._id.toString() }
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createPaymentIntent };
