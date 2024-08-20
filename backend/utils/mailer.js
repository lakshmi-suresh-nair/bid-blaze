const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Function to send a welcome email to new users
const sendWelcomeEmail = (to, username) => {
    const subject = 'Welcome to Bid Blaze!';
    const text = `Dear ${username},

Welcome to Bid Blaze! Your account has been successfully set up.

We're excited to have you on board. If you have any questions or need support, feel free to reach out to lakshsuresh82@gmail or reply to this email.

Happy bidding!

Best regards,
The Bid Blaze Team`;

    sendEmail(to, subject, text);
};

// Function to send an email when a product is listed
const sendProductListedEmail = (to, product) => {
    const subject = 'Your Product Listing Details';
    const text = `Dear User,

Thank you for listing your product on Bid Blaze.

Product Details:
- Name: ${product.name}
- Description: ${product.description}
- Starting Bid: ${product.startingBid}
- Auction End Time: ${new Date(product.auctionEndTime).toLocaleString()}

Best of luck with your auction!

Best regards,
The Bid Blaze Team`;

    sendEmail(to, subject, text);
};

// Function to send an email to notify the highest bidder they won the auction
const sendWinningBidEmail = (to, product, paymentUrl) => {
    const subject = `Congratulations! You've won the auction for ${product.name}`;
    const text = `Dear User,

You have won the auction for ${product.name} with a bid of $${product.currentBid}. 

Please proceed to payment within the next 2 hours by clicking the link below:
${paymentUrl}

Best regards,
The Bid Blaze Team`;

    sendEmail(to, subject, text);
};

// Function to send a verification email
const sendVerificationEmail = (to, verificationUrl) => {
    const subject = 'Verify your email for Bid Blaze';
    const text = `Dear User,

Please verify your email address by clicking the link below:
${verificationUrl}

Best regards,
The Bid Blaze Team`;

    sendEmail(to, subject, text);
};

module.exports = { sendEmail, sendWelcomeEmail, sendProductListedEmail, sendWinningBidEmail, sendVerificationEmail };
