import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';
import { FaUser } from 'react-icons/fa';
import Image from "../../images/Logo.png";
import LanguagePicker from '../languagepicker/LanguagePicker';
import LanguageContext from '../../contexts/LanguageContext/LanguageContext';

export const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const { selectedLanguage } = useContext(LanguageContext);

  useEffect(() => {
    fetchHeaderData();
  }, [selectedLanguage]);

  const fetchHeaderData = async () => {
    if(selectedLanguage === "English"){
      try {
        const response = await fetch('http://localhost:1337/api/header');
        const data = await response.json();
        setHeaderData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    } else if (selectedLanguage === "French"){
      try {
        const response = await fetch('http://localhost:1337/api/header-french');
        const data = await response.json();
        setHeaderData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    }
    
  };

  return (
    <div className="header-container">
        <img src={Image} alt="Community Impact Hub" style={{  width: '200px', height: 'auto%' }} />
        {headerData ? 
        <>
          <nav>
            <ul className="header-tabs">
              <li><Link to="/">{headerData.headerLink1}</Link></li>
              <li><Link to="/about">{headerData.headerLink2}</Link></li>
              <li><Link to="/resources">{headerData.headerLink3}</Link></li>
              <li><Link to="/programs">{headerData.headerLink4}</Link></li>
              <li><Link to="/register">{headerData.headerLink5}</Link></li>
              <li><Link to="/contact">{headerData.headerLink6}</Link></li>
              <li><Link to="/summercamp">{headerData.headerLink7}</Link></li>
            </ul>
          </nav>

          <nav >
            <ul>
              <li><FaUser size={24} color={'black'} />{headerData.signIn}</li>
              <li><LanguagePicker/></li>
            </ul>
          </nav>
        </> : 
        <p>Loading...</p>}
      
    </div>
  );
};
