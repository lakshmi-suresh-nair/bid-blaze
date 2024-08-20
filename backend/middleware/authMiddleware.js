const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    // Check for token in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log('Decoded Token:', decoded); // Debugging: Log decoded token

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                console.error('User not found'); // Debugging: Log if user not found
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            console.error('Token verification failed:', error); // Debugging: Log token verification error
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        console.error('No token provided'); // Debugging: Log no token
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
