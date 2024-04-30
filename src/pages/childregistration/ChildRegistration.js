import React, { useState, useEffect, useContext } from 'react';
import './ChildRegistration.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import LanguageContext from '../../contexts/LanguageContext/LanguageContext';

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
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState(''); // State to hold the email
  const [payment, setPayment] = useState('')
  const [isWaiver1Checked, setIsWaiver1Checked] = useState(false);
  const [isWaiver2Checked, setIsWaiver2Checked] = useState(false);
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const [childRegistrationData, setChildRegistrationData] = useState(null);
  const { selectedLanguage } = useContext(LanguageContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchChildData();
  }, [selectedLanguage]);

  const fetchChildData = async () => {
    if(selectedLanguage === "English"){
      try {
        const response = await fetch('http://localhost:1337/api/child-registration');
        const data = await response.json();
        setChildRegistrationData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching childregistration data:', error);
      }
    } else if (selectedLanguage === "French"){
      try {
        const response = await fetch('http://localhost:1337/api/child-registration-french');
        const data = await response.json();
        setChildRegistrationData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching childregistration data:', error);
      }
    }
    
  };


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
    gender: Yup.string().required("Gender is required"),
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
      digitalSignature: '',
      gender: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (selectedWeeks.length === 0) {
        setError('Please select at least one week');
        return;
      }
/*

      // Prepare data to send to the server
    const childData = {
      ...values,
      selectedWeeks: selectedWeeks, // Include selected weeks
    };
    fetch('http://localhost:5000/api/add-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(childData),
    })
    .then(response => {
      if (response.ok) {
        // Data inserted successfully
        console.log('Child registration data inserted into the database successfully.');

      } else {
        // Error inserting data
        console.error('Error inserting child registration data:', response.statusText);
        // Handle error as needed
      }
    })
    .catch(error => {
      console.error('Error inserting child registration data:', error);
      // Handle error as needed
    });
  
    */
      // Prepare data to send to the server
      // Calculate payment amount
  const paymentAmount = selectedWeeks.includes('All Weeks') ? '499' : (199 * selectedWeeks.length).toString();

  // Determine payment type
  const paymentType = payment === 'creditcard' ? 'credit card' : 'e-transfer';
  // Prepare data to send to the server
  const childData2 = {
    childName: values.childName,
    age: values.age,
    parentName: values.parentName,
    email: values.email,
    phone: values.phone,
    emergencyContactName: values.emergencyContact,
    emergencyContactNumber: values.emergencyContactNumber,
    enrolledWeeks: JSON.stringify(selectedWeeks),
    //payment_amount: paymentAmount,
    //payment_type: paymentType,
    //gender: values.gender,
  };
  console.log(childData2)
      fetch('http://localhost:1337/api/register-children-tests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(childData2),
    })
    .then(response => {
      if (response.ok) {
        // Data inserted successfully
        console.log('Child registration data inserted into the strapi report successfully.');

      } else {
        // Error inserting data
        console.error('Error inserting child registration data 1:', response.statusText);
        // Handle error as needed
      }
    })
    .catch(error => {
      console.error('Error inserting child registration data:', error);
      // Handle error as needed
    });
    
      if (payment == "creditcard") {
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
          email: values.email
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

      } else {
        // ALSO SEND EMAIL?
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
          email: values.email,
          grandTotal: paymentAmount
        };
        fetch("http://localhost:5000/send-invoice", {
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
        navigate("/payment-success")
      }

      
      
      // Reset selected weeks after submission (you can adjust this behavior as needed)
      formik.resetForm();
      setSelectedWeeks([]);
      setEmail('');
    },
  });
  
  const handleCheckbox1Change = (e) => {
    // Update first waiver checkbox status
    const checked = e.target.checked;
    setIsWaiver1Checked(checked);
  };

  const handleCheckbox2Change = (e) => {
    // Update second waiver checkbox status
    const checked = e.target.checked;
    setIsWaiver2Checked(checked);
  };

  const handlePaymentChange = (e) => {
    const selectedPayment = e.target.value;
    setPayment(selectedPayment);
    setIsPaymentSelected(true); // Set payment selection status to true when a payment option is selected
  };

  return (
    <div className='outer-container-child'>
      {childRegistrationData ?
      <>
        <div className='container'>
          <div className='info'>
            <h1>{childRegistrationData.formTitle}</h1>
            <p className='description'>
            {childRegistrationData.formDescription}
            </p>
            <div className='camp-details'>
              <p><strong>{childRegistrationData.infoTitle1}:</strong> {childRegistrationData.infoData1}</p>
              <p><strong>{childRegistrationData.infoTitle2}:</strong> {childRegistrationData.infoData2}</p>
              <p><strong>{childRegistrationData.infoTitle3}:</strong> {childRegistrationData.infoData3}</p>
              <p><strong>{childRegistrationData.infoTitle4}:</strong> {childRegistrationData.infoData4}</p>
              <p><strong>{childRegistrationData.infoTitle5}:</strong> {childRegistrationData.infoData5}</p>
            </div>
            <div className='pricing'>
              <h2>{childRegistrationData.pricingTitle}</h2>
              <p><strong>{childRegistrationData.pricingDescription}</strong></p>
              <p>{childRegistrationData.regularPriceTitle}: {childRegistrationData.regularPriceData}</p>
              <p>{childRegistrationData.bundlePriceTitle}: {childRegistrationData.bundlePriceData}</p>
            </div>
          </div>

          <div className="info-box">
            <p className="info-text">Payment of fees are due upon registration by credit card.
            
            Contact the Office once registration is completed and you will be given the appropriate fees owed.
            Payment can then be made by etransfer to <strong>payments@ottawalions.com</strong> (the etransfer message MUST include
            name of child and the age group program registered in)
             
            Payment can also be paid by Cheque, or Cash which can be accepted by the registrat on the 1st day of practice
             
            FULL REFUNDS ARE GRANTED WITHIN 3 DAYS OF REGISTRATION. ALL REFUNDS BEYOND 3 DAYS WILL BE SUBJECT TO A $50 ADMIN FEE</p>
          </div>

          <form className='registration-form' onSubmit={formik.handleSubmit}>
          <h2>{childRegistrationData.childFormTitle}</h2>
            <div className='form-group'>
              <label htmlFor='childName'>{childRegistrationData.childName}:</label>
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
              <label htmlFor='age'>{childRegistrationData.childAge}:</label>
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
              <label>Gender:</label>
              <div className='gender-section'>
                <label>
                  Male
                  <input
                    type='radio'
                    name='gender'
                    value='male'
                    checked={formik.values.gender === 'male'}
                    onChange={formik.handleChange}
                  />
                </label>
                <label>
                  Female
                  <input
                    type='radio'
                    name='gender'
                    value='female'
                    checked={formik.values.gender === 'female'}
                    onChange={formik.handleChange}
                  />
                </label>
              </div>

              {formik.touched.gender && formik.errors.gender ? (
                <div className='error-message'>{formik.errors.gender}</div>
              ) : null}
            </div>

            <div className='form-group'>
              <label htmlFor='parentName'>{childRegistrationData.childParentName}:</label>
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
              <label htmlFor='email'>{childRegistrationData.childEmail}:</label>
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
              <label htmlFor='phone'>{childRegistrationData.childPhone}:</label>
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

            <label>{childRegistrationData.chooseWeeksTitle}:</label>
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
              <label htmlFor='emergencyContact'>{childRegistrationData.childEmergencyContactName}:</label>
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
              <label htmlFor='emergencyContactNumber'>{childRegistrationData.childEmergencyContactNumber}:</label>
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
            
            <hr className="form-separator"/>


            <h1>Waivers</h1>
            <div className='info-box'>
              <h1>WAIVER, CONSENT AND AUTHORIZATION</h1>
              <hr className='form-separator' />
              <p className='info-text'>In consideration of the Ottawa Lions Track & Field Club (The "Club") acceptoing my child's 
              application as a participant in the above said program, I aftree that my child will abide by the rules and 
              regulations, policies and procedures of the Club in respect to the said program. I am aware of the possibility of 
              health and safety risks associated with my child's participation in the activities and I freely accept all risks 
              associated with his/her participation. I assume all risks incidental to such participation, and do waive, release, 
              absolve, indemnify and agree to hold garmless, other than for willful defualt or negligence on their partm the 
              Club, its officers, directors, employees or agents, will notify the Club of my child's special medical condition 
              or health history, if any. If the emergency contact person identified in this form cannot be reached and my child
               has an enjury, accident or falls ill, I hereby authorize the Club to provide my child with or make arrangements 
               for emergency medical treatment.</p>
            </div>
            {/* Checkbox for the first waiver */}
            <div className='checkbox-container'>
              <label htmlFor='waiver1'>I have read and agree to the above *WAIVER, CONSENT AND AUTHORIZATION</label>
              <input 
                type='checkbox'
                onChange={handleCheckbox1Change}
                checked={isWaiver1Checked}
                id='waiver1' />
            </div>
            {!isWaiver1Checked && <p className='error-message'>Please agree to the waiver.</p>}
            {/* Info box */}
            <div className='info-box'>
              <h2>Ottawa Lions Photo Release Form</h2>
              <hr className='form-separator' />
              <p className='info-text'>I hereby grant the Ottawa Lions Track & Field Club Inc. permission to use my likeness in a
               photograph, video, or other digital media ("photo") in any and all of its publications, including web-based 
               publications, without payment or other consideration.</p>
            </div>
            {/* Checkbox for the second waiver */}
            <div className='checkbox-container'>
              <label htmlFor='waiver2'>I have read and agree to the above *Photo Release Form</label>
              <input 
                type='checkbox'
                onChange={handleCheckbox2Change}
                checked={isWaiver2Checked} 
                id='waiver2' />
            </div>
            {!isWaiver2Checked && <p className='error-message'>Please agree to the waiver.</p>}

            {/* Digital signature input */}
            <div className='form-group'>
              <label htmlFor='digitalSignature'>Digital signature (type your name):</label>
              <input
                type='text'
                id='digitalSignature'
                name='digitalSignature'
                placeholder='Enter your name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.digitalSignature}
                className={formik.touched.digitalSignature && formik.errors.digitalSignature ? 'error' : ''}
              />
              {formik.touched.digitalSignature && formik.errors.digitalSignature ? (
                <div className='error-message'>{formik.errors.digitalSignature}</div>
              ) : null}
            </div>

            <hr className="form-separator"/>


            <h2>Payment Method</h2>
            <div className='gender-section'>
              <label>
                Credit Card
                <input
                  type='radio'
                  name='paymentmethod'
                  value='creditcard'
                  checked={payment === 'creditcard'}
                  onChange={handlePaymentChange}
                />
              </label>
              <label>
                e-transfer
                <input
                  type='radio'
                  name='paymentmethod'
                  value='etransfer'
                  checked={payment === 'etransfer'}
                  onChange={handlePaymentChange}
                />
              </label>
            </div>
            {!isPaymentSelected && <p className='error-message'>Please select a payment method.</p>}


            <button 
              type='submit' 
              className='enroll-button'
              disabled={!formik.isValid || !isWaiver1Checked || !isWaiver2Checked || !isPaymentSelected}>
                {childRegistrationData.enrollButton}
            </button>
          </form>
        </div>
      </> :
      <p>Loading...</p>}
      
    </div>
  );
};

export default ChildRegistration;
