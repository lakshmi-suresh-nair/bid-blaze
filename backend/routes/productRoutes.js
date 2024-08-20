const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');
const { sendEmail, sendWinningBidEmail } = require('../utils/mailer');

// @desc    Create a new product listing
// @route   POST /api/products
// @access  Private
router.post('/', protect, async (req, res) => {
    console.log('Creating a new product listing');
    const { name, description, startingBid, imageUrl, auctionEndTime, category } = req.body;

    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const product = new Product({
            name,
            description,
            startingBid,
            currentBid: startingBid,
            imageUrl,
            auctioneer: req.user._id,
            auctionEndTime,
            category,
        });

        const createdProduct = await product.save();
        console.log('Product created successfully:', createdProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Send email with product details after listing
// @route   POST /api/products/:id/send-email
// @access  Private
router.post('/:id/send-email', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('auctioneer', 'email');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const subject = 'Your Product Listing Details';
        const text = `
            Dear ${req.user.username},

            Thank you for listing your product on Bid Blaze.

            Product Details:
            - Name: ${product.name}
            - Description: ${product.description}
            - Starting Bid: ${product.startingBid}
            - Auction End Time: ${new Date(product.auctionEndTime).toLocaleString()}

            Best of luck with your auction!

            Best regards,
            The Bid Blaze Team
        `;

        sendEmail(req.user.email, subject, text);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get all products or filter by category
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    console.log('Fetching products');
    const { category } = req.query;

    try {
        const query = category ? { category } : {};
        const products = await Product.find(query);
        console.log('Products fetched successfully:', products);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get a specific product by ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
    console.log(`Fetching product with ID: ${req.params.id}`);
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Product fetched successfully:', product);
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Place a bid on a product
// @route   POST /api/products/:id/bid
// @access  Private
router.post('/:id/bid', protect, async (req, res) => {
    console.log(`Placing a bid on product with ID: ${req.params.id}`);
    const { amount } = req.body;

    try {
        const product = await Product.findById(req.params.id).populate('highestBidder', 'email');

        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the auction is still active
        if (product.auctionEndTime < Date.now()) {
            console.log('Auction has ended');
            return res.status(400).json({ message: 'Auction has ended' });
        }

        // Check if the bid is higher than the current highest bid
        if (amount <= product.currentBid) {
            console.log('Bid must be higher than the current bid');
            return res.status(400).json({ message: 'Bid must be higher than the current bid' });
        }

        // Notify the previous highest bidder that they've been outbid
        if (product.highestBidder) {
            const outbidEmail = product.highestBidder.email;
            console.log(`Notifying previous highest bidder: ${outbidEmail}`);
            sendEmail(outbidEmail, `You've been outbid on ${product.name}`, `Your bid on ${product.name} has been surpassed by another bidder.`);
        }

        // Update the product with the new highest bid
        product.currentBid = amount;
        product.highestBidder = req.user._id;
        product.bids.push({ bidder: req.user._id, amount });

        const updatedProduct = await product.save();
        console.log('Bid placed successfully:', updatedProduct);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error placing bid:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Finalize the auction for a product
// @route   PUT /api/products/:id/finalize
// @access  Private (Auctioneer only)
router.put('/:id/finalize', protect, async (req, res) => {
    console.log(`Finalizing auction for product with ID: ${req.params.id}`);
    try {
        const product = await Product.findById(req.params.id).populate('highestBidder', 'email');

        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the current user is the auctioneer
        if (product.auctioneer.toString() !== req.user._id.toString()) {
            console.log('Not authorized to finalize this auction');
            return res.status(401).json({ message: 'Not authorized to finalize this auction' });
        }

        // Check if the auction has already been finalized
        if (product.finalized) {
            console.log('Auction already finalized');
            return res.status(400).json({ message: 'Auction already finalized' });
        }

        // Check if the auction has ended
        if (product.auctionEndTime > Date.now()) {
            console.log('Auction has not yet ended');
            return res.status(400).json({ message: 'Auction has not yet ended' });
        }

        // Finalize the auction
        product.finalized = true;
        await product.save();

        // Notify the highest bidder that they have won the auction
        if (product.highestBidder) {
            const winnerEmail = product.highestBidder.email;
            const paymentUrl = `${process.env.FRONTEND_URL}/checkout?productId=${product._id}`;
            console.log(`Notifying auction winner: ${winnerEmail}`);
            sendWinningBidEmail(winnerEmail, product, paymentUrl);
        }

        console.log('Auction finalized successfully:', product);
        res.status(200).json({ message: 'Auction finalized successfully', product });
    } catch (error) {
        console.error('Error finalizing auction:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
