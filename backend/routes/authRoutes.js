const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const { sendWelcomeEmail, sendVerificationEmail } = require('../utils/mailer');

// Initialize the Google OAuth2 client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc Register a new user
// @route POST /api/users/register
// @access Public
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            username,
            email,
            password,
            role,
            isVerified: false,
        });

        await user.save();

        const verificationToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        sendVerificationEmail(user.email, verificationUrl);

        res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc Verify user's email
// @route GET /api/users/verify-email
// @access Public
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        if (user.isVerified) {
            return res.status(200).json({ message: 'Email already verified' });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});

// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!user.isVerified) {
            return res.status(401).json({ message: 'Please verify your email before logging in.' });
        }

        if (isMatch) {
            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: token,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc Google login or register a new user using Google OAuth
// @route POST /api/users/google-login
// @access Public
router.post('/google-login', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        const { email, name } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                username: name,
                email,
                password: '',
                role: 'buyer',
            });
            await user.save();
        }

        const jwtToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: jwtToken,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error during Google login' });
    }
});

module.exports = router;
