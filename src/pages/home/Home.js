import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Image from "../../images/HeroImage.png"

const Home = () => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/home-page');
      const data = await response.json();
      console.log(data.data.attributes.heroSmall)
      setHomeData(data.data.attributes);
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };
  return (
    <div className="home-container">

      {homeData ? (
        <>
          {/* Call to Action Section */}
          <div className="call-to-action">
            <h4>{homeData.heroSmall}</h4>
            <h1>{homeData.heroBig}</h1>
            <Link to="/about">
              <button className="learn-more-button">{homeData.learnMoreButton}</button>
            </Link>
            <img src={Image} alt=""/>
          </div>

          {/* Resources Section */}
          <div className="resources-section">
            <h1>{homeData.resourcesSectionTitle}</h1>
            <h4>{homeData.resourcesSectionDesc}</h4>

            <div className="resource-boxes-container">
              <div className="resource-box">
                <div className="resource-box-title">
                  <h2>Publications</h2>
                </div>
                <p>cutting-edge research and thought-provoking publications curated by experts in the field</p>
              </div>
              <div className="resource-box">
                <div className="resource-box-title">
                  <h2>Podcast</h2>
                </div>
                <p>where industry experts, thought leaders, and innovators share their stories and expertise</p>
              </div>
              <div className="resource-box">
                <div className="resource-box-title">
                  <h2>News</h2>
                </div>
                <p>latest noteworthy achievements, milestones, and relevant industry developments</p>
              </div>
              <div className="resource-box">
                <div className="resource-box-title">
                  <h2>Events</h2>
                </div>
                <p>previous highlights and diverse range of upcoming events to foster collaboration and community building</p>
              </div>
            </div>

            {/* Button Container */}
            <div className="button-container">
              <Link to="/contact" className="section-button">
                Contact Us
              </Link>
              <Link to="/register" className="section-button">
                Register
              </Link>
            </div>
          </div>
        </>
      ): (
        <p>Loading...</p>
      )}

    </div>
  );
}

export default Home;
