import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaUser } from 'react-icons/fa';
import Image from "../../images/Logo.png";
import LanguagePicker from '../languagepicker/LanguagePicker';
import LanguageContext from '../../contexts/LanguageContext/LanguageContext';
import { UserContext } from '../../contexts/UserContext/UserContext'
import { signOutUser } from '../../firebase/firebaseAuth';
import Form from '../form/Form';
import SignInForm from '../form/SignInForm';

export const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const { selectedLanguage } = useContext(LanguageContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const openSignInModal = () => {
    setShowSignInModal(true);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  useEffect(() => {
    fetchHeaderData();
  }, [selectedLanguage, user]);

  const fetchHeaderData = async () => {
    if (selectedLanguage === "English") {
      try {
        const response = await fetch('http://localhost:1337/api/header');
        const data = await response.json();
        setHeaderData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    } else if (selectedLanguage === "French") {
      try {
        const response = await fetch('http://localhost:1337/api/header-french');
        const data = await response.json();
        setHeaderData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      setUser(null); // Update the user context to clear the user
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const handleSignIn = async () => {
    if (user) {
      // User is logged in, redirect to child registration page
      navigate('/child-registration');
    } else {
      // User is not logged in, open sign in modal
      openSignInModal();
    }
  }

  return (
    <div className="header-container">
      <img src={Image} alt="Community Impact Hub" style={{ width: '200px', height: 'auto%' }} />
      {headerData ?
        <>
          <nav>
            <ul className="header-tabs">
              <li><Link to="/" className="header-link">{headerData.headerLink1}</Link></li>
              <li><Link to="/about" className="header-link">{headerData.headerLink2}</Link></li>
              <li><Link to="/resources" className="header-link">{headerData.headerLink3}</Link></li>
              <li><Link to="/programs" className="header-link">{headerData.headerLink4}</Link></li>
              <li><Link to="/register" className="header-link">{headerData.headerLink5}</Link></li>
              <li><Link to="/contact" className="header-link">{headerData.headerLink6}</Link></li>
              <li><Link to="/summercamp" className="header-link">{headerData.headerLink7}</Link></li>
            </ul>
          </nav>

          <nav>
            <ul>
              {user ? <>
                <li>{user.email}</li>
                <li><button onClick={handleLogout} className="header-button">Logout</button></li>
              </> : (
                <li><button onClick={handleSignIn} className="header-button">{headerData.signIn}</button></li>
              )}
              <li><LanguagePicker /></li>
            </ul>
          </nav>
          {showRegisterModal && <Form onClose={closeRegisterModal} onBack={openSignInModal} />}
          {showSignInModal && <SignInForm onClose={closeSignInModal} onSignUp={openRegisterModal} />}
        </> :
        <p>Loading...</p>}
    </div>
  );
};

export default Header;
