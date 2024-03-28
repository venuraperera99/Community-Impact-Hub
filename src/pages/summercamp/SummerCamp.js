import React, { useState, useEffect, useContext } from 'react';
import './SummerCamp.css';
import Form from '../../components/form/Form';
import SignInForm from '../../components/form/SignInForm'; // Import the SignInForm component
import { useNavigate } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext/LanguageContext';
import {UserContext} from '../../contexts/UserContext/UserContext'

const SummerCamp = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [summerData, setSummerData] = useState(null)
  const navigate = useNavigate();
  const { selectedLanguage } = useContext(LanguageContext);
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    fetchSummerData();
    
  }, [selectedLanguage]);
  
  const fetchSummerData = async () => {
    if (selectedLanguage === "English") {
      try {
        const response = await fetch('http://localhost:1337/api/summer-camp?populate=*');
        const data = await response.json();
        setSummerData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching summer camp data:', error);
      }
    } else if (selectedLanguage === "French"){
      try {
        const response = await fetch('http://localhost:1337/api/summer-camp-french?populate=*');
        const data = await response.json();
        setSummerData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching summer camp data:', error);
      }
    }
  };

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

  const handleRegisterClick = () => {
    if (user) {
      // User is logged in, redirect to child registration page
      navigate('/child-registration');
    } else {
      // User is not logged in, open sign in modal
      openSignInModal();
    }
  };

  return (
    <div className='summer-camp'>
      {summerData ? 
      <>
        <div className='banner'>
          <h1>{summerData.headerTitle}</h1>
          <h2>{summerData.headerAge}</h2>
        </div>
        
        <div className='content'>
          <h2 style={{color: "#5a8375"}}>{summerData.registrationHeader}<br/> {summerData.registrationHeaderDate}</h2>
          <button className='register-button' onClick={handleRegisterClick}>{summerData.registerButton1}</button>
          <div className='session'>
            <h2>{summerData.dateAndTimesTitle}</h2>
            <div className='session-list'>
              {summerData.SessionDates.map((session, index) => (
                <div>Session {index+1}: {session.weekstart} - {session.weekend}</div>
              ))}
            </div>
          </div>
          <div className='registration'>
            <h2>{summerData.paragraphTitle1}</h2>
            {summerData.paragraphText1.map((line, index) => (
              <p key={index}>{line.children[0].text}</p>
            ))}
            
          </div>
          <div className='learning'>
            <h2>{summerData.paragraphTitle2}</h2>
            <p>{summerData.paragraphText2[0].children[0].text}</p>
          </div>
          <div className='morning-learn'>
            <h2>{summerData.paragraphTitle3}</h2>
            <p>{summerData.paragraphText3[0].children[0].text}</p>
            <div className='morning-learn-list'>
            {summerData.paragraphText3.map((line, index) => {
              if (index !== 0) {
                return (
                  <div key={index}>{line.children[0].text}</div>
                );
              } 
            })}
            </div>
            
          </div>
          <div className='bring'>
            <h2>{summerData.paragraphTitle4}</h2>
            <div className='bring-list'>
              {summerData.paragraphText4.map((listitem, index) => (
                <div>{listitem.children[0].text}</div>
              ))}
            </div>
          </div>
          <div className='register-section'>
            <h2>{summerData.buttonTitle}</h2>
            <button onClick={handleRegisterClick}>{summerData.registerButton2}</button>
          </div>
        </div>
      </> :
      <p className='outer-container-success'>Loading...</p>
      }
      {showRegisterModal && <Form onClose={closeRegisterModal} onBack={openSignInModal}/>}
      {showSignInModal && <SignInForm onClose={closeSignInModal} onSignUp={openRegisterModal}/>}
    </div>
  );
}

export default SummerCamp;
