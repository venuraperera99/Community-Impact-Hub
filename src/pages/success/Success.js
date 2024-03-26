import React, {useState, useEffect, useContext } from 'react';
import "./Success.css";
import LanguageContext from '../../contexts/LanguageContext/LanguageContext';

const Success = () => {
  const [successData, setSuccessData] = useState(null);
  const { selectedLanguage } = useContext(LanguageContext);

  useEffect(() => {
    fetchSuccessData();
  }, [selectedLanguage]);

  const fetchSuccessData = async () => {
    if(selectedLanguage === "English"){
      try {
        const response = await fetch('http://localhost:1337/api/success');
        const data = await response.json();
        setSuccessData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    } else if (selectedLanguage === "French"){
      try {
        const response = await fetch('http://localhost:1337/api/success-french');
        const data = await response.json();
        setSuccessData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    }
    
  };

  return (
    <div className='outer-container-success'>
      {successData ? 
      <>
        <div className='success-message'>
          <h1>Payment Successful!</h1>
          <p>Thank you for your payment. An invoice has been sent to your email address.</p>
        </div>
      </> : 
      <p>Loading...</p>}
    </div>
  );
}

export default Success;
