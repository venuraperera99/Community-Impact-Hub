import React, {useState, useEffect, useContext} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Contact.css';
import LanguageContext from '../../contexts/LanguageContext/LanguageContext';


const Contact = () => {

  const [contactData, setContactData] = useState(null);
  const { selectedLanguage } = useContext(LanguageContext);

  useEffect(() => {
    fetchContactData();
  }, [selectedLanguage]);

  const fetchContactData = async () => {
    if(selectedLanguage === "English"){
      try {
        const response = await fetch('http://localhost:1337/api/contact-us');
        const data = await response.json();
        setContactData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    } else if (selectedLanguage === "French"){
      try {
        const response = await fetch('http://localhost:1337/api/contact-us-french');
        const data = await response.json();
        setContactData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    }
    
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$|^[0-9]{10}$/, 'Invalid phone number format').required('Phone Number is required'),
    message: Yup.string().required('Message is required'),
  });

  // Initial form values
  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
  };

  // Form submission handler
  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        console.log('Email sent successfully!');
        // Optionally reset form fields or show success message
        resetForm();
      } else {
        console.error('Failed to send email');
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className='outer-contact'>
      {contactData ?
      <>
        <div className="form-container">
          <h1>{contactData.formTitle}</h1>
          {/* Formik wrapper for the form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Full Name field */}
                <Field type="text" name="fullName" placeholder={contactData.namePlaceholder} className="input-field" />
                <ErrorMessage name="fullName" component="div" className="error-message" />

                {/* Email field */}
                <Field type="email" name="email" placeholder={contactData.emailPlaceholder} className="input-field" />
                <ErrorMessage name="email" component="div" className="error-message" />

                {/* Phone Number field */}
                <Field type="text" name="phoneNumber" placeholder={contactData.phonePlaceholder} className="input-field" />
                <ErrorMessage name="phoneNumber" component="div" className="error-message" />

                {/* Message textarea */}
                <Field as="textarea" name="message" placeholder={contactData.messagePlaceholder} className="message-field" />
                <ErrorMessage name="message" component="div" className="error-message" />
                
                {/* Submit button */}
                <button type="submit" className="send-button">{contactData.submitButton}</button>
              </Form>
            )}
          </Formik>
        </div>
      </> :
      <p className='outer-contact'>Loading...</p>}
    </div>
  );
}

export default Contact;
