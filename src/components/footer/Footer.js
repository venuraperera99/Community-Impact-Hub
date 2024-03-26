import React, {useState, useEffect, useContext} from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'; 
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaFacebook, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import LanguageContext from '../../contexts/LanguageContext/LanguageContext';

const Footer = () => {
    const [footerData, setFooterData] = useState(null);
    const { selectedLanguage } = useContext(LanguageContext);

    useEffect(() => {
      fetchFooterData();
    }, [selectedLanguage]);

    const fetchFooterData = async () => {
      if(selectedLanguage === "English"){
        try {
          const response = await fetch('http://localhost:1337/api/footer?populate=deep');
          const data = await response.json();
          setFooterData(data.data.attributes);
        } catch (error) {
          console.error('Error fetching about data:', error);
        }
      } else if (selectedLanguage === "French") {
        try {
          const response = await fetch('http://localhost:1337/api/footer-french?populate=*');
          const data = await response.json();
          setFooterData(data.data.attributes);
        } catch (error) {
          console.error('Error fetching about data:', error);
        }
      }
    };

    return (
      <div className="footer">
        {footerData ? 
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Section - Company Info */}
          <div className="company-info">
            <h1>{footerData.footerTitle}</h1>
            <p>{footerData.footerDescription[0].children[0].text}</p>
              <div className='socials-icons'>
                <FaFacebook size={28} color={'white'} style={{ marginRight: '45px' }} />
                <FaTwitter size={28} color={'white'} style={{ marginRight: '45px' }} />
                <RiInstagramFill size={28} color={'white'} style={{ marginRight: '20px' }} />
              </div>
          </div>
    
          {/* Right Section - Links and Contact */}
          <div className="links-and-contact">

            <div className="links-column">
              <h5>{footerData.LinksColumn[0].LinksColumnHeader}</h5>
                <li><Link to="/">{footerData.LinksColumn[0].Link[0].link}</Link></li>
                <li><Link to="/resources">{footerData.LinksColumn[0].Link[1].link}</Link></li>
                <li><Link to="/programs">{footerData.LinksColumn[0].Link[2].link}</Link></li>
                <li><Link to="/register">{footerData.LinksColumn[0].Link[3].link}</Link></li>
                <li><Link to="/contact">{footerData.LinksColumn[0].Link[4].link}</Link></li>
                <li><Link to="/summercamp">{footerData.LinksColumn[0].Link[5].link}</Link></li>
            </div>
            <div className="links-column">
              <h5>{footerData.LinksColumn[1].LinksColumnHeader}</h5>
                {footerData.LinksColumn[1].Link.map((linklst, index) => (
                  <li key={index} ><Link to="/about">{linklst.link}</Link></li>
                ))}
            </div>

            <div className="links-column">
              <h5>{footerData.LinksColumn[2].LinksColumnHeader}</h5>
                {footerData.LinksColumn[2].Link.map((linklst, index) => (
                  <li key={index} ><Link to="/programs">{linklst.link}</Link></li>
                ))}

            </div>

            <div className="links-column">
              <h5>{footerData.LinksColumn[3].LinksColumnHeader}</h5>
                {footerData.LinksColumn[3].Link.map((linklst, index) => (
                  <li key={index} ><Link to="/resources">{linklst.link}</Link></li>
                ))}
            </div>

            <div className="links-column">
              <h5>{footerData.LinksColumn[4].LinksColumnHeader}</h5>
              <li><Link to="/contact">{footerData.LinksColumn[4].Link[0].link}</Link></li>
              <p><MdEmail size={"16"} />{footerData.footerEmail}</p>
              <p><FaPhoneAlt size={"16"} />{footerData.footerPhone}</p>
            </div>
          </div>
          </div>
          <p>&copy; {footerData.copyright}</p>
        </> : 
        <p>Loading...</p> }
      </div>
    );
  }

export default Footer;