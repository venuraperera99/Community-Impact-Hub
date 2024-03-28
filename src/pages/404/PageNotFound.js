import React, {useState, useEffect, useContext} from 'react'
import "./PageNotFound.css"
import LanguageContext from '../../contexts/LanguageContext/LanguageContext';


export const PageNotFound = () => {
  const [pageNotFoundData, setPageNotFoundData] = useState(null);
  const { selectedLanguage } = useContext(LanguageContext);

  useEffect(() => {
    fetchPageNotFoundData();
  }, [selectedLanguage]);

  const fetchPageNotFoundData = async () => {
    if(selectedLanguage === "English"){
      try {
        const response = await fetch('http://localhost:1337/api/page-not-found');
        const data = await response.json();
        setPageNotFoundData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching pagenotfound data:', error);
      }
    } else if (selectedLanguage === "French"){
      try {
        const response = await fetch('http://localhost:1337/api/page-not-found-french');
        const data = await response.json();
        setPageNotFoundData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching pagenotfound data:', error);
      }
    }
    
  };

  return (
    <div className="not-found-container">
      {pageNotFoundData ? 
      <>
        <div className="not-found-content">
          <h1 className='errorh1'>{pageNotFoundData.error}</h1>
          <p>{pageNotFoundData.textOne}</p>
          <p>{pageNotFoundData.textTwo}</p>
        </div>
      </> :
      <p>Loading...</p>}
      
    </div>
  )
}
