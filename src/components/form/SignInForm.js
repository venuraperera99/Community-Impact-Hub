import React, {useState, useEffect, useContext} from 'react';
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
import LanguageContext from '../../contexts/LanguageContext/LanguageContext';
import {UserContext} from '../../contexts/UserContext/UserContext'


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const SignInForm = ({ onClose, onSignUp }) => {

  const [signInError, setSignInError] = useState(null);
  const [signInData, setSignInData] = useState(null);
  const { selectedLanguage } = useContext(LanguageContext);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    fetchSignInData();
  }, [selectedLanguage]);

  const fetchSignInData = async () => {
    if(selectedLanguage === "English"){
      try {
        const response = await fetch('http://localhost:1337/api/sign-in');
        const data = await response.json();
        setSignInData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching signin data:', error);
      }
    } else if (selectedLanguage === "French"){
      try {
        const response = await fetch('http://localhost:1337/api/sign-in-french');
        const data = await response.json();
        setSignInData(data.data.attributes);
      } catch (error) {
        console.error('Error fetching signin data:', error);
      }
    }
    
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signIn(values.email, values.password, setUser);
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
      {signInData ? 
      <>
        <div className='icon-container-sign-in'>
          <IoClose size={24} className='icon close-sign-in' onClick={handleClose} />
        </div>
        <DialogTitle style={{ marginBottom: '10px' }}>{signInData.formTitle}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} className="form">
            <TextField
              fullWidth
              id="email"
              name="email"
              label={signInData.emailPlaceholder}
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
              label={signInData.passwordPlaceholder}
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
                {signInData.buttonTitle}
              </Button>
            </DialogActions>
          </form>
          <Typography variant="body2" align="center">
            {signInData.signUpText} <span className="sign-up-link" onClick={handleSignUpClick}>{signInData.signUp}</span>
          </Typography>
        </DialogContent>
      </> :
      <p>Loading...</p>}
      
    </Dialog>
  );
};

export default SignInForm;
