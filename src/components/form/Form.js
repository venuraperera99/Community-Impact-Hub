import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Form.css';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  birthday: Yup.date().required('Birthday is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const Form = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      birthday: '',
      phoneNumber: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Here you can handle form submission, for now just log the data
      console.log(values);
      onClose(); // Close the modal after form submission
    },
  });

  return (
    <Dialog open={true} onClose={onClose}>
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
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            size="large"
            className="form-field"
          />
          <DialogActions className="actions">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
