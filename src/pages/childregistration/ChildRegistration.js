import React from 'react';
import './ChildRegistration.css';

const ChildRegistration = () => {
  return (
    <div className='outer-container-child' >
      <div className='container'>
        <div className='info'>
          <h1>Summer Camp Registration</h1>
          <p className='description'>
            Welcome to our exciting summer camp! Let your child explore the great outdoors,
            make new friends, and create unforgettable memories. Spaces are limited, so
            enroll your child today!
          </p>
          <div className='camp-details'>
            <p><strong>Age Range:</strong> 6 - 12 years old</p>
            <p><strong>Drop-off Time:</strong> 8:00 AM</p>
            <p><strong>Pickup Time:</strong> 4:00 PM</p>
            <p><strong>Camp Location:</strong> Sunny Valley Campground</p>
            <p><strong>Date Range:</strong> July 15th - August 15th</p>
          </div>
          <div className='pricing'>
            <h2>Pricing</h2>
            <p>Regular Price: $200 per week</p>
            <p>Early Bird Discount: $180 per week (Register before May 1st)</p>
            <p>Sibling Discount: $20 off for each additional sibling</p>
          </div>
        </div>
        
        <form className='registration-form'>
          <h2>Child Information</h2>
          <label htmlFor='childName'>Child's Name:</label>
          <input type='text' id='childName' name='childName' placeholder="Enter child's name' required" />

          <label htmlFor='age'>Age:</label>
          <input type='number' id='age' name='age' placeholder="Enter child's age required" />

          <label htmlFor='parentName'>Parent's Name:</label>
          <input type='text' id='parentName' name='parentName' placeholder="Enter parent's name required "/>

          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' placeholder='Enter email' required />

          <label htmlFor='phone'>Phone:</label>
          <input type='tel' id='phone' name='phone' placeholder='Enter phone number' required />

          <label htmlFor='emergencyContact'>Emergency Contact:</label>
          <input type='text' id='emergencyContact' name='emergencyContact' placeholder='Enter emergency contact' required />

          <button type='submit' className='enroll-button'>Enroll Now</button>
        </form>
      </div>
    </div>
  );
};

export default ChildRegistration;
