import React, {useState} from 'react';
import './SignInForm.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { IoClose } from "react-icons/io5";
import { signIn } from '../../firebase/firebaseAuth'; // Import signIn function for user sign-in

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const SignInForm = ({ onClose, onSignUp }) => {

  const [signInError, setSignInError] = useState(null);


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signIn(values.email, values.password);
        onClose(); 
      } catch (error) {
        console.error('Sign In Error:', error.message);
        setSignInError('Incorrect email or password. Please try again.');
      }
    },
  });

  const handleClose = () => {
    onClose();
  };

  const handleSignUpClick = () => {
    onClose();
    onSignUp();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <div className='icon-container-sign-in'>
        <IoClose size={24} className='icon close-sign-in' onClick={handleClose} />
      </div>
      <DialogTitle style={{ marginBottom: '10px' }}>Sign In</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className="form">
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            error={Boolean(signInError) || (formik.touched.password && Boolean(formik.errors.password))}
            helperText={Boolean(signInError) ? <span style={{ color: 'red' }}>{signInError}</span> : (formik.touched.password && formik.errors.password)}
            variant="outlined"
            size="large"
            className="form-field"
          />
          <DialogActions className="actions">
            <Button style={{backgroundColor: "#5a8375", width: "100%"}} type="submit" variant="contained">
              Sign In
            </Button>
          </DialogActions>
        </form>
        <Typography variant="body2" align="center">
          Don't have an account? <span className="sign-up-link" onClick={handleSignUpClick}>SIGN UP</span>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default SignInForm;
