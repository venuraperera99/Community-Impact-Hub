// Footer.js

import React from 'react';
import './Footer.css'; // Create a separate CSS file for footer styles if needed
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaFacebook, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
    return (
      <div className="footer">

        {/* Left Section - Company Info */}
        <div className="company-info">
          <h1>Community Impact Hub</h1>
          <p>We are dedicated to empowering communities, fostering inclusivity, and contributing to the overall well-being of society. 
            Through collaborative efforts and a commitment to transparency we aim to create tangible and lasting impact, inspiring 
            individuals to actively engage in building a better, more equitable future.</p>
            <div className='socials-icons'>
            <FaFacebook size={28} color={'black'} style={{ marginRight: '45px' }} />
            <FaTwitter size={28} color={'black'} style={{ marginRight: '45px' }} />
            <RiInstagramFill size={28} color={'black'} style={{ marginRight: '20px' }} />
          </div>
          <p>&copy; 2024 communityimpacthub.ca</p>
        </div>
  
        {/* Right Section - Links and Contact */}
        <div className="links-and-contact">

          <div className="links-column">
            <h5>Navigation</h5>
              <li><a href="#">Home</a></li>
              <li><a href="#">Programs & Services</a></li>
              <li><a href="#">Register</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Help</a></li>
              <li><a href="#">Profile</a></li>
          </div>
          <div className="links-column">
            <h5>About Us</h5>
              <li><a href="#">Mission</a></li>
              <li><a href="#">Vision</a></li>
              <li><a href="#">Our Values</a></li>
              <li><a href="#">Diversity, Equity & Inclusion</a></li>
              <li><a href="#">Our Team</a></li>
          </div>

          <div className="links-column">
            <h5>Programs & Services</h5>
              <li><a href="#">Overview</a></li>
              <li><a href="#">Learn More</a></li>
              <li><a href="#">Schedule</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Register</a></li>
          </div>

          <div className="links-column">
            <h5>Resources</h5>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Publications</a></li>
              <li><a href="#">Podcast</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Events</a></li>
          </div>

          <div className="links-column">
            <h5>Contact</h5>
            <li><a href="#">Contact Form</a></li>
            <p><MdEmail size={"16"} color={"white"}/>info@communityimpacthub.com</p>
            <p><FaPhoneAlt color={"white"}/> 647-555-5555</p>
          </div>
  
        </div>
          
      </div>
    );
  }

export default Footer;

{/*
          <div className="copyright">
          <p>&copy; 2024 Company Name. All rights reserved. | <a href="#">Terms of Use</a></p>
        </div> */}