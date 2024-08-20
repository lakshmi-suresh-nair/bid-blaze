// src/components/About.js

import React from 'react';
import './About.css';
import aboutImage from '../assets/images/about.png';
import missionImage from '../assets/images/mission.png';
import visionImage from '../assets/images/vision.png';
import teamImage from '../assets/images/team.png';
import joinUsImage from '../assets/images/joinus.png';

function About() {
    return (
        <div className="about-container">
            <section className="about-section">
                <img src={aboutImage} alt="About Bid Blaze" className="about-image" />
                <div className="text-content">
                    <h2>About Bid Blaze</h2>
                    <p>Your Ultimate Auction Platform for Buyers and Sellers Across the Globe!</p>
                </div>
            </section>
            
            <section className="about-section">
                <img src={missionImage} alt="Our Mission" className="about-image" />
                <div className="text-content">
                    <h2>Our Mission</h2>
                    <p>At Bid Blaze, our mission is to create a dynamic, transparent, and fair marketplace where buyers and sellers can connect seamlessly. We believe in empowering individuals and businesses by providing them with a robust platform to auction their products and find unique items from around the world.</p>
                </div>
            </section>

            <section className="about-section">
                <img src={visionImage} alt="Our Vision" className="about-image" />
                <div className="text-content">
                    <h2>Our Vision</h2>
                    <p>We envision a world where auctions are not just for the elite but accessible to everyone. Whether you're a casual bidder or a professional seller, Bid Blaze is committed to offering a user-friendly experience, innovative features, and a vibrant community.</p>
                </div>
            </section>

            <section className="about-section">
                <img src={teamImage} alt="Meet Our Team" className="about-image" />
                <div className="text-content">
                    <h2>Meet Our Team</h2>
                    <p>Our team consists of passionate individuals dedicated to revolutionizing the auction industry. From tech enthusiasts to marketing professionals, we all share a common goal: to make Bid Blaze the best online auction platform.</p>
                </div>
            </section>

            <section className="about-section">
                <img src={joinUsImage} alt="Join Us" className="about-image" />
                <div className="text-content">
                    <h2>Join Us</h2>
                    <p>Become a part of the Bid Blaze community today! Whether you're looking to buy, sell, or simply explore, we welcome you to join us in creating a vibrant auction marketplace. Drop us an email at bidblazerecruitment@bidblaze.com</p>
                </div>
            </section>
        </div>
    );
}

export default About;
