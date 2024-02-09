// Contact.js

import React from 'react';
import './Contact.css'; // Import the CSS file for styling

const Contact = () => {
  return (
    <div className='outer'>
      <div className="form-container">
        <h1>Contact</h1>
        <input type="text" placeholder="Full Name" className="input-field" />
        <input type="email" placeholder="Email Address" className="input-field" />
        <input type="text" placeholder="Phone Number" className="input-field" />
        <textarea placeholder="Have anything to say?" className="message-field"></textarea>
        <button className="send-button">Send</button>
      </div>
    </div>
  );
}

export default Contact;
