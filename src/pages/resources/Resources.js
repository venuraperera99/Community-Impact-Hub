import React from 'react';
import './Resources.css';

const Resources = () => {
  return (
    <div className='resources-outer-container'>
      <div className='resources-container'>
        <h1 className='resources-title'>Resources</h1>
        <div className='resources-page-section'>
          <h2 className='resources-subtitle'>Summer Camps</h2>
          <ul className='resources-list'>
            <li className='resources-item'>
              <a href='https://www.ottawasummercamps.ca/' target='_blank' rel='noopener noreferrer'>Ottawa Summer Camps</a>
            </li>
            <li className='resources-item'>
              <a href='https://www.ottawaparentingtimes.ca/summer-camps-guide/' target='_blank' rel='noopener noreferrer'>Ottawa Parenting Times - Summer Camps Guide</a>
            </li>
          </ul>
        </div>
        <div className='resources-page-section'>
          <h2 className='resources-subtitle'>Coding Resources</h2>
          <ul className='resources-list'>
            <li className='resources-item'>
              <a href='https://code.org/' target='_blank' rel='noopener noreferrer'>Code.org</a>
            </li>
            <li className='resources-item'>
              <a href='https://www.khanacademy.org/computing' target='_blank' rel='noopener noreferrer'>Khan Academy - Computing</a>
            </li>
            <li className='resources-item'>
              <a href='https://scratch.mit.edu/' target='_blank' rel='noopener noreferrer'>Scratch - Imagine, Program, Share</a>
            </li>
          </ul>
        </div>
        <div className='resources-page-section'>
          <h2 className='resources-subtitle'>Basketball</h2>
          <ul className='resources-list'>
            <li className='resources-item'>
              <a href='https://www.basketball.ca/' target='_blank' rel='noopener noreferrer'>Canada Basketball</a>
            </li>
            <li className='resources-item'>
              <a href='https://www.basketball.on.ca/' target='_blank' rel='noopener noreferrer'>Ontario Basketball</a>
            </li>
            <li className='resources-item'>
              <a href='https://www.nba.com/canada/' target='_blank' rel='noopener noreferrer'>NBA Canada</a>
            </li>
          </ul>
        </div>
        <div className='resources-page-section'>
          <h2 className='resources-subtitle'>Other Helpful Resources</h2>
          <ul className='resources-list'>
            <li className='resources-item'>
              <a href='https://www.ottawa.ca/en' target='_blank' rel='noopener noreferrer'>City of Ottawa</a>
            </li>
            <li className='resources-item'>
              <a href='https://www.ottawapublichealth.ca/en/index.aspx' target='_blank' rel='noopener noreferrer'>Ottawa Public Health</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resources;
