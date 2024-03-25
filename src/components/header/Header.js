import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';
import { FaUser } from 'react-icons/fa';
import Image from "../../images/Logo.png";
import LanguagePicker from '../languagepicker/LanguagePicker';

export const Header = () => {
  return (
    <div className="header-container">
        <img src={Image} alt="Community Impact Hub" style={{  width: '200px', height: 'auto%' }} />
      <nav>
        <ul className="header-tabs">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/programs">Programs & Services</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/summercamp">Summer Camp Program</Link></li>
        </ul>
      </nav>

      <nav >
        <ul>
          <li><FaUser size={24} color={'black'} /></li>
          <li><LanguagePicker/></li>
        </ul>
      </nav>
    </div>
  );
};
