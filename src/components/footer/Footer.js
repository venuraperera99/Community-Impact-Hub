import React from 'react';
import './Footer.css'; // Create a separate CSS file for footer styles if needed
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaFacebook, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
    return (
      <div className="footer">

        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        </div>
  
        {/* Right Section - Links and Contact */}
        <div className="links-and-contact">

          <div className="links-column">
            <h5>Navigation</h5>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/programs">Programs & Services</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/summercamp">Summer Camp Program</Link></li>
          </div>
          <div className="links-column">
            <h5>About Us</h5>
              <li><Link to="/about">Mission</Link></li>
              <li><Link to="/about">Vision</Link></li>
              <li><Link to="/about">Our Values</Link></li>
              <li><Link to="/about">Diversity, Equity & Inclusion</Link></li>
              <li><Link to="/about">Our Team</Link></li>
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
              <li><Link to="/resources">Resources</Link></li>
              <li><a href="#">Publications</a></li>
              <li><a href="#">Podcast</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Events</a></li>
          </div>

          <div className="links-column">
            <h5>Contact</h5>
            <li><Link to="/contact">Contact Form</Link></li>
            <p><MdEmail size={"16"} color={"white"}/>info@communityimpacthub.com</p>
            <p><FaPhoneAlt color={"white"}/> 613-406-2254</p>
          </div>
  
        </div>

        </div>
        <p>&copy; 2024 communityimpacthub.ca</p>

          
      </div>
    );
  }

export default Footer;