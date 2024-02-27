import React from 'react';
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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const SignInForm = ({ onClose, onSignUp }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle sign-in form submission here
      console.log('Sign In Form Submitted:', values);
      onClose(); // Close the modal after form submission
    },
  });

  const handleSignUpClick = () => {
    onClose();
    onSignUp();
  };

  return (
    <Dialog open={true} onClose={onClose}>
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
