// Home.js

import React from 'react';
import { Header } from '../../components/header/Header';
import './Home.css';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <div>

      {/* Call to Action Section */}
      <div className="call-to-action">
        <h4>we believe in . . .</h4>
        <h1>Making a difference through collective action</h1>
        <button className="learn-more-button">Learn more about us here</button>
      </div>

      {/* Resources Section */}
      <div className="resources-section">
        <h1>Explore Our Resources</h1>
        <h4>Explore the diverse range of resources we offer to support your journey in innovation and professional growth</h4>

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
          <button className="section-button">Help</button>
          <button className="section-button">Contact Us</button>
          <button className="section-button">Register</button>
        </div>
      </div>

    </div>
  );
}

export default Home;
