import React, {useState, useEffect, useContext} from 'react';
import './Resources.css';
import LanguageContext from '../../contexts/LanguageContext/LanguageContext';


const Resources = () => {
  const [resourceData, setResourceData] = useState(null);
  const { selectedLanguage } = useContext(LanguageContext);

  useEffect(() => {
    fetchResourceData();
  }, [selectedLanguage]);

  const fetchResourceData = async () => {
    if(selectedLanguage === "English"){
      try {
        const response = await fetch('http://localhost:1337/api/resource?populate=deep');
        const data = await response.json();
        console.log(data.data.attributes)
        setResourceData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    } else if (selectedLanguage === "French"){
      try {
        const response = await fetch('http://localhost:1337/api/about-page-french');
        const data = await response.json();
        setResourceData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    }
    
  };
  return (
    <div className='resources-outer-container'>
      {resourceData ? 
      <>
        <div className='resources-container'>
          <h1 className='resources-title'>{resourceData.formTitle}</h1>
          {resourceData.ResourceGroup.map((resource, index) => (
            <div className='resources-page-section'>
              <h2 className='resources-subtitle'>{resource.groupTitle}</h2>
              <ul className='resources-list'>
                {resource.ResourceLink.map((resourcelink, index) => (
                  <li className='resources-item'>
                    <a href={resourcelink.link} target='_blank' rel='noopener noreferrer'>{resourcelink.linkName}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </> :
      <p>Loading...</p>}
      
    </div>
  );
};

export default Resources;
