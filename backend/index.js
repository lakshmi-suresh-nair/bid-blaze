const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cors = require('cors');  // Import the cors middleware

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express application
const app = express();

// Enable CORS
app.use(cors());  // Use the cors middleware here

// Increase payload size limit to 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Define routes
app.use('/api/users', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('Auction Platform Backend');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
