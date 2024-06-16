import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo } from '../formSlice';
import { TextField, Button, Container, Grid } from '@mui/material';

const PersonalInfoForm = ({ handleNext }) => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.form.personalInfo);
  const [form, setForm] = useState(personalInfo);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Please enter your name';
    if (!form.email) newErrors.email = 'Please enter your email';
    else if (!validateEmail(form.email)) newErrors.email = 'Please enter a valid email address';
    if (!form.phone) newErrors.phone = 'Please enter your phone number';
    else if (!validatePhone(form.phone)) newErrors.phone = 'Please enter a valid phone number';
    if (!form.address) newErrors.address = 'Please enter your address';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const isValid = validateForm();
    if (isValid) {
      dispatch(updatePersonalInfo(form));
      handleNext(true);
    } else {
      handleNext(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [form]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Name"
            value={form.name || ''}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            error={isSubmitted && !!errors.name}
            helperText={isSubmitted && errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            type="email"
            value={form.email || ''}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            error={isSubmitted && !!errors.email}
            helperText={isSubmitted && errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="phone"
            label="Phone"
            type="tel"
            value={form.phone || ''}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            error={isSubmitted && !!errors.phone}
            helperText={isSubmitted && errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address"
            label="Address"
            value={form.address || ''}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            error={isSubmitted && !!errors.address}
            helperText={isSubmitted && errors.address}
          />
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PersonalInfoForm;
