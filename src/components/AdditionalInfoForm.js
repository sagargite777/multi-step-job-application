import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdditionalInfo } from '../formSlice';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';

const AdditionalInfoForm = ({ handleNext, handleBack }) => {
  const dispatch = useDispatch();
  const additionalInfo = useSelector((state) => state.form.additionalInfo);
  const [form, setForm] = useState(additionalInfo);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
    if (!file) {
      setResumeError('Please upload your resume.');
    } else {
      setResumeError('');
    }
  };

  const handleSubmit = () => {
    if (!resumeFile) {
      setResumeError('Please upload your resume.');
      return;
    }

    dispatch(updateAdditionalInfo({
      ...form,
      resume: resumeFile,
    }));
    handleNext(true); 
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="coverLetter"
            label="Cover Letter"
            value={form.coverLetter || ''}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Upload Resume or CV
          </Typography>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
          />
          {resumeError && (
            <Typography variant="caption" color="error">
              {resumeError}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button variant="contained" onClick={handleBack}>
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdditionalInfoForm;
