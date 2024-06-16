import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSkills } from '../formSlice';
import { TextField, Button, Container, Grid } from '@mui/material';

const SkillsForm = ({ handleNext, handleBack }) => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.form.skills);
  const [form, setForm] = useState(skills.join(', '));
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(e.target.value);
  };

  const validateSkills = () => {
    const skillArray = form.split(',').map((skill) => skill.trim()).filter((skill) => skill !== '');
    if (skillArray.length === 0) {
      setError('Please enter at least one skill.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validateSkills()) {
      dispatch(updateSkills(form.split(',').map((skill) => skill.trim())));
      handleNext(true); 
    } else {
      handleNext(false); 
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="skills"
            label="Technical Skills"
            value={form || ''}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            error={!!error}
            helperText={error}
          />
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

export default SkillsForm;
