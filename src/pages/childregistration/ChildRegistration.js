import React, { useState } from 'react';
import './ChildRegistration.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';


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
  const [error, setError] = useState('');

  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [email, setEmail] = useState(''); // State to hold the email


  const handleWeekChange = (week) => {
    if (week === 'All Weeks') {
      // If "All Weeks" is selected, toggle it
      if (selectedWeeks.includes('All Weeks')) {
        setSelectedWeeks([]);
      } else {
        setSelectedWeeks(['All Weeks']);
      }
    } else {
      if (selectedWeeks.includes('All Weeks')) {
        setSelectedWeeks([week]);
      } else {
        if (selectedWeeks.includes(week)) {
          setSelectedWeeks(selectedWeeks.filter((selected) => selected !== week));
        } else {
          setSelectedWeeks([...selectedWeeks, week]);
        }
      }
    }

    setError('');
  };

  const validationSchema = Yup.object().shape({
    childName: Yup.string().required('Child\'s Name is required'),
    age: Yup.number().required('Age is required').positive('Age must be a positive number'),
    parentName: Yup.string().required('Parent\'s Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    emergencyContact: Yup.string().required('Emergency Contact is required'),
    emergencyContactNumber: Yup.string().required('Emergency Contact Number is required'),
  });

  const formik = useFormik({
    initialValues: {
      childName: '',
      age: '',
      parentName: '',
      email: '',
      phone: '',
      emergencyContact: '',
      emergencyContactNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log('Form Values:', values);
      if (selectedWeeks.length === 0) {
        setError('Please select at least one week');
        return;
      }
      // You can use the selectedWeeks array for further processing or submission
      let items = [];
      if (selectedWeeks.includes('All Weeks')) {
        items = [{ id: 7, quantity: 1 }];
      } else {
        items = selectedWeeks.map((week) => {
          const weekNumber = parseInt(week.split(':')[0].replace('Week ', ''), 10);
          return {
            id: weekNumber,
            quantity: 1,
            week: week,
          };
        });
      }
  
      const data = {
        items,
        email: email
      };
      fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => {
        if(res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      }).then(({ url }) => {
        window.location = url
      }).catch(e => {
        console.error(e.error)
      })
      
      // Reset selected weeks after submission (you can adjust this behavior as needed)
      setSelectedWeeks([]);
      setEmail('');
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();

    
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

        <form className='registration-form' onSubmit={formik.handleSubmit}>
        <h2>Child Information</h2>
          <div className='form-group'>
            <label htmlFor='childName'>Child's Name:</label>
            <input
              type='text'
              id='childName'
              name='childName'
              placeholder="Enter child's name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.childName}
              className={formik.touched.childName && formik.errors.childName ? 'error' : ''}
            />
            {formik.touched.childName && formik.errors.childName ? (
              <div className='error-message'>{formik.errors.childName}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='age'>Age:</label>
            <input
              type='number'
              id='age'
              name='age'
              placeholder="Enter child's age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
              className={formik.touched.age && formik.errors.age ? 'error' : ''}
            />
            {formik.touched.age && formik.errors.age ? (
              <div className='error-message'>{formik.errors.age}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='parentName'>Parent's Name:</label>
            <input
              type='text'
              id='parentName'
              name='parentName'
              placeholder="Enter parent's name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.parentName}
              className={formik.touched.parentName && formik.errors.parentName ? 'error' : ''}
            />
            
            {formik.touched.parentName && formik.errors.parentName ? (
              <div className='error-message'>{formik.errors.parentName}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={formik.touched.email && formik.errors.email ? 'error' : ''}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='error-message'>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='phone'>Phone:</label>
            <input
              type='tel'
              id='phone'
              name='phone'
              placeholder='Enter phone number'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className={formik.touched.phone && formik.errors.phone ? 'error' : ''}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className='error-message'>{formik.errors.phone}</div>
            ) : null}
          </div>

          <label>Choose Weeks:</label>
          <div className='week-checkboxes'>
            <div className='week-checkbox'>
              <label htmlFor='allWeeks'>All Weeks</label>
              <input
                type='checkbox'
                id='allWeeks'
                name='allWeeks'
                value='All Weeks'
                checked={selectedWeeks.includes('All Weeks')}
                onChange={() => handleWeekChange('All Weeks')}
              />
            </div>
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
                  disabled={selectedWeeks.includes('All Weeks')}
                />
              </div>
            ))}
            {error && <p className='error-message'>{error}</p>}
          </div>

          <div className='form-group'>
            <label htmlFor='emergencyContact'>Emergency Contact:</label>
            <input
              type='text'
              id='emergencyContact'
              name='emergencyContact'
              placeholder='Enter emergency contact name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emergencyContact}
              className={formik.touched.emergencyContact && formik.errors.emergencyContact ? 'error' : ''}
            />
            {formik.touched.emergencyContact && formik.errors.emergencyContact ? (
              <div className='error-message'>{formik.errors.emergencyContact}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='emergencyContactNumber'>Emergency Contact Number:</label>
            <input
              type='tel'
              id='emergencyContactNumber'
              name='emergencyContactNumber'
              placeholder='Enter emergency contact number'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emergencyContactNumber}
              className={formik.touched.emergencyContactNumber && formik.errors.emergencyContactNumber ? 'error' : ''}
            />
            {formik.touched.emergencyContactNumber && formik.errors.emergencyContactNumber ? (
              <div className='error-message'>{formik.errors.emergencyContactNumber}</div>
            ) : null}
          </div>

          <button type='submit' className='enroll-button'>Enroll Now</button>
        </form>
      </div>
    </div>
  );
};

export default ChildRegistration;
