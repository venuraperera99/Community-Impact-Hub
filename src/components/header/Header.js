import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';
import { FaUser } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';

export const Header = () => {
  return (
    <div className="header-container">
      <h3>Community Impact Hubs</h3>
      <nav>
        <ul className="header-tabs">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/programs">Programs & Services</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </nav>

      <nav>
        <ul>
          <li><FaUser size={24} color={'black'} /></li>
          <li><IoMdSearch size={28} color={'black'} /></li>
        </ul>
      </nav>
    </div>
  );
};
