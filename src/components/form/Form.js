import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Form.css';
import { IoMdArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { signUp } from '../../firebase/firebaseAuth'; // Import signUp function for user registration

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]*$/, 'First Name should only contain letters')
    .required('First Name is required'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]*$/, 'Last Name should only contain letters')
    .required('Last Name is required'),
  birthday: Yup.date()
    .max(new Date(), "Birthday should be before today's date")
    .required('Birthday is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/, 'Phone Number should be in format 123-456-7890 or 1234567890')
    .required('Phone Number is required'),
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Form = ({ onClose, onBack }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      birthday: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Call signUp function with email and password
        await signUp(values.email, values.password);
        
        // Redirect or close modal after successful registration
        console.log("Registered Successfully: User: " + values.email + " Pass: " + values.password)
        onClose();
        onBack();
      } catch (error) {
        console.error('Registration Error:', error.message);
      }
    },
  });

  const handleBackClick = () => {
    onClose();
    onBack();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <div className='icon-container'>
        <IoMdArrowBack className="icon" size={24} onClick={handleBackClick}/>
        <IoClose className='icon close' size={24} onClick={handleClose}/>
      </div>
      <DialogTitle style={{ marginBottom: '10px' }}>Register Form</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className="form">
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            variant="outlined"
            size="large"
            className="form-field"
          />
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            variant="outlined"
            size="large"
            className="form-field"
          />
          <TextField
            fullWidth
            id="birthday"
            name="birthday"
            label="Birthday"
            type="date"
            value={formik.values.birthday}
            onChange={formik.handleChange}
            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
            helperText={formik.touched.birthday && formik.errors.birthday}
            variant="outlined"
            size="large"
            className="form-field"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            variant="outlined"
            size="large"
            className="form-field"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={
              (formik.touched.email && formik.errors.email) ||
              (!formik.errors.email && 'Enter a valid email address')
            }
            variant="outlined"
            size="large"
            className="form-field"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password ? formik.errors.password : 'Password must be at least 6 characters'}
            variant="outlined"
            size="large"
            className="form-field"
          />
          <DialogActions className="actions">
            <Button style={{backgroundColor: "#5a8375"}} type="submit" variant="contained">
              Submit
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
