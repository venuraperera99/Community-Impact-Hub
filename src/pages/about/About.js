// About.js
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import './About.css'; // Import the CSS file for styling

const About = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/about-page');
      const data = await response.json();
      setAboutData(data.data.attributes);
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history stack
  };

  return (
    <div className='outer-container'>
      <div className="about-container">
      {aboutData ? (
          <>
            <h2 className="about-header">{aboutData.aboutUsTitle}</h2>
            <p className="about-paragraph">{aboutData.aboutUsContent[0].children[0].text}</p>

            <div className="columns">
              <div className="column">
                <h2>{aboutData.missionTitle}</h2>
                <p>{aboutData.missionContent[0].children[0].text}</p>

                <h2>{aboutData.diversityTitle}</h2>
                <p>{aboutData.diversityContent[0].children[0].text}</p>
              </div>

              <div className="column">
                <h2>{aboutData.visionTitle}</h2>
                <p>{aboutData.visionContent[0].children[0].text}</p>

                <h2>{aboutData.valuesTitle}</h2>
                <p>{aboutData.valuesContent[0].children[0].text}</p>
              </div>
            </div>

            <div className="additional-content">
              <h2>{aboutData.additionalTitle}</h2>
              <p>{aboutData.additionalContent[0].children[0].text}</p>
              <button className="big-button" onClick={handleGoBack}>Back</button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}

      </div>
    </div>
  );
}

export default About;
