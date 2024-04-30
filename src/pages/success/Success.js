import React, { useState, useEffect, useContext } from 'react';
import './Success.css';
import LanguageContext from '../../contexts/LanguageContext/LanguageContext';

const Success = () => {
  const [successData, setSuccessData] = useState(null);
  const { selectedLanguage } = useContext(LanguageContext);

  useEffect(() => {
    fetchSuccessData();
  }, [selectedLanguage]);

  const fetchSuccessData = async () => {
    if (selectedLanguage === 'English') {
      try {
        const response = await fetch('http://localhost:1337/api/success');
        const data = await response.json();
        setSuccessData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching success data:', error);
      }
    } else if (selectedLanguage === 'French') {
      try {
        const response = await fetch('http://localhost:1337/api/success-french');
        const data = await response.json();
        setSuccessData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching success data:', error);
      }
    }
  };

  return (
    <div className='outer-container-success'>
      {successData ? (
        <>
          <div className='success-message'>
            <h1>Payment Successful!</h1>
            <p>Thank you for your payment. An invoice has been sent to your email address.</p>
            <p>Please read the info box below for e-transfer instructions if you have not paid already</p>
            <div className='info-box-light-green'>
              <h2>IMPORTANT MESSAGE:</h2>
              <p>Contact the Office once registration is completed and you will be given the appropriate fees owed.</p>
              <p>Payment can then be made by etransfer to <strong>payments@ottawalions.com</strong> (the etransfer message MUST include
              name of child and the age group program registered in)</p>
              
              <p>Payment can also be paid by Cheque, or Cash which can be accepted by the registrat on the 1st day of practice</p>
              
              <p>FULL REFUNDS ARE GRANTED WITHIN 3 DAYS OF REGISTRATION. ALL REFUNDS BEYOND 3 DAYS WILL BE SUBJECT TO A $50 ADMIN FEE</p>
              <p>If you have any questions please contact:</p>
              <p>info@communityimpacthub.ca</p>
              <p>613-406-2254</p>
            </div>
          </div>
          
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Success;
