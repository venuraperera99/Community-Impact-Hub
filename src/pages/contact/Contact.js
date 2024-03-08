// Contact.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Contact.css'; // Import the CSS file for styling

const Contact = () => {
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$|^[0-9]{10}$/, 'Invalid phone number format').required('Phone Number is required'),
    message: Yup.string(),
  });

  // Initial form values
  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
  };

  // Form submission handler
  const onSubmit = (values, { resetForm }) => {
    // Handle form submission logic here
    console.log(values);
    // Reset form after submission
    resetForm();
  };

  return (
    <div className='outer-contact'>
      <div className="form-container">
        <h1>Contact Us</h1>
        {/* Formik wrapper for the form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              {/* Full Name field */}
              <Field type="text" name="fullName" placeholder="Full Name" className="input-field" />
              <ErrorMessage name="fullName" component="div" className="error-message" />

              {/* Email field */}
              <Field type="email" name="email" placeholder="Email Address" className="input-field" />
              <ErrorMessage name="email" component="div" className="error-message" />

              {/* Phone Number field */}
              <Field type="text" name="phoneNumber" placeholder="Phone Number" className="input-field" />
              <ErrorMessage name="phoneNumber" component="div" className="error-message" />

              {/* Message textarea */}
              <Field as="textarea" name="message" placeholder="Have anything to say?" className="message-field" />
              
              {/* Submit button */}
              <button type="submit" className="send-button">Send</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Contact;
