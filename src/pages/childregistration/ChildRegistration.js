import React, { useState } from 'react';
import './ChildRegistration.css';
import { useNavigate } from 'react-router-dom';


const ChildRegistration = () => {
  const weeks = [
    'Week 1: July 8th - July 12th',
    'Week 2: July 15th - July 19st',
    'Week 3: July 22nd - July 26th',
    'Week 4: July 29th - August 2th',
    'Week 5: August 6th - August 9th',
    'Week 6: August 12th - August 16th',
  ];

  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const navigate = useNavigate();


  const handleWeekChange = (week) => {
    if (selectedWeeks.includes(week)) {
      setSelectedWeeks(selectedWeeks.filter((selected) => selected !== week));
    } else {
      setSelectedWeeks([...selectedWeeks, week]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can use the selectedWeeks array for further processing or submission
    console.log('Selected Weeks:', selectedWeeks);
    fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: [
          {id: 1, quantity: 2},
          {id: 2, quantity: 1}
        ]
      })
    }).then(res => {
      if(res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
      console.log("url", url)
      window.location = url
    }).catch(e => {
      console.error(e.error)
    })
    
    // Reset selected weeks after submission (you can adjust this behavior as needed)
    setSelectedWeeks([]);
    
    //navigate("/checkout")
  };

  return (
    <div className='outer-container-child'>
      <div className='container'>
        <div className='info'>
          <h1>Summer Camp Registration</h1>
          <p className='description'>
            Welcome to our exciting summer camp! Let your child explore the great outdoors,
            make new friends, and create unforgettable memories. Spaces are limited, so
            enroll your child today!
          </p>
          <div className='camp-details'>
            <p><strong>Age Range:</strong> 10 - 18 years old</p>
            <p><strong>Drop-off Time:</strong> 8:30 AM</p>
            <p><strong>Pickup Time:</strong> 4:30 PM</p>
            <p><strong>Camp Location:</strong> 485 Donald St, Ottawa, ON, K1K 1L8</p>
            <p><strong>Date Range:</strong> July 8th - August 16th</p>
          </div>
          <div className='pricing'>
            <h2>Pricing</h2>
            <p><strong>You can register your child for our summer camp, selecting any week</strong></p>
            <p>Regular Price: $199 per week</p>
            <p>Full Camp Bundle: $499 for 6 weeks</p>
          </div>
        </div>

        <form className='registration-form' onSubmit={handleSubmit}>
          <h2>Child Information</h2>
          <label htmlFor='childName'>Child's Name:</label>
          <input type='text' id='childName' name='childName' placeholder="Enter child's name" required />

          <label htmlFor='age'>Age:</label>
          <input type='number' id='age' name='age' placeholder="Enter child's age" required />

          <label htmlFor='parentName'>Parent's Name:</label>
          <input type='text' id='parentName' name='parentName' placeholder="Enter parent's name" required />

          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' placeholder='Enter email' required />

          <label htmlFor='phone'>Phone:</label>
          <input type='tel' id='phone' name='phone' placeholder='Enter phone number' required />

          <label>Choose Weeks:</label>
          <div className='week-checkboxes'>
            {weeks.map((week, index) => (
              <div key={index} className='week-checkbox'>
                <label htmlFor={`week-${index}`}>{week}</label>
                <input
                  type='checkbox'
                  id={`week-${index}`}
                  name={`week-${index}`}
                  value={week}
                  checked={selectedWeeks.includes(week)}
                  onChange={() => handleWeekChange(week)}
                />
              </div>
            ))}
          </div>

          <label htmlFor='emergencyContact'>Emergency Contact:</label>
          <input type='text' id='emergencyContact' name='emergencyContact' placeholder='Enter emergency contact' required />

          <button type='submit' className='enroll-button'>Enroll Now</button>
        </form>
      </div>
    </div>
  );
};

export default ChildRegistration;
