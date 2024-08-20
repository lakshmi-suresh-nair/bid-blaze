const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startingBid: {
        type: Number,
        required: true,
    },
    currentBid: {
        type: Number,
        default: 0,
    },
    highestBidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    bids: [
        {
            bidder: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            amount: {
                type: Number,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    imageUrl: {
        type: String,
    },
    auctioneer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    auctionEndTime: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true, // Ensure that the category is provided
    },
    finalized: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
