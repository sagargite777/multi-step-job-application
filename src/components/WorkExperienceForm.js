import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateWorkExperience,
  addWorkExperience,
  removeWorkExperience,
} from '../formSlice';
import { TextField, Button, Container, Grid, IconButton, Typography, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const WorkExperienceForm = ({ handleNext, handleBack, setIsValid }) => {
  const dispatch = useDispatch();
  const workExperience = useSelector((state) => state.form.workExperience);
  const [form, setForm] = React.useState([...workExperience]);

  useEffect(() => {
    setForm([...workExperience]);
  }, [workExperience]);

  useEffect(() => {
    const isFormValid = form.every(experience =>
      experience.companyName && experience.jobTitle && experience.startDate && experience.endDate
    );
    setIsValid(isFormValid);
  }, [form, setIsValid]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForm = form.map((experience, idx) =>
      idx === index ? { ...experience, [name]: value } : experience
    );
    setForm(updatedForm);
  };

  const handleDateChange = (index, dateType, selectedDate) => {
    const updatedForm = form.map((experience, idx) =>
      idx === index ? { ...experience, [dateType]: selectedDate } : experience
    );
    setForm(updatedForm);
  };

  const handleAddRow = () => {
    const newExperience = { companyName: '', jobTitle: '', startDate: '', endDate: '' };
    const updatedForm = [...form, newExperience];
    setForm(updatedForm);
    dispatch(addWorkExperience()); 
  };

  const handleRemoveRow = (index) => {
    const updatedForm = form.filter((_, idx) => idx !== index);
    setForm(updatedForm);
    dispatch(removeWorkExperience(index)); 
  };

  const handleSubmit = () => {
    dispatch(updateWorkExperience(form));
    handleNext(true);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {form.map((experience, index) => (
          <Grid item xs={12} key={index} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <TextField
              name="companyName"
              label="Company Name"
              value={experience.companyName || ''}
              onChange={(e) => handleChange(index, e)}
              fullWidth
              required
              size="small"
            />
            <TextField
              name="jobTitle"
              label="Job Title"
              value={experience.jobTitle || ''}
              onChange={(e) => handleChange(index, e)}
              fullWidth
              required
              size="small"
            />
            <Box display="flex" alignItems="center" gap={2}>
              <Typography>Start Date:</Typography>
              <TextField
                type="date"
                name="startDate"
                value={experience.startDate || ''}
                onChange={(e) => handleDateChange(index, 'startDate', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                size="small"
                sx={{ flex: 1 }}
              />
              <Typography>End Date:</Typography>
              <TextField
                type="date"
                name="endDate"
                value={experience.endDate || ''}
                onChange={(e) => handleDateChange(index, 'endDate', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                size="small"
                sx={{ flex: 1 }}
              />
            </Box>
            <IconButton onClick={() => handleRemoveRow(index)}>
              <Remove />
            </IconButton>
          </Grid>
        ))}
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={handleAddRow}>
            <Add />
            Add Experience
          </Button>
          <div>
            <Button variant="contained" onClick={handleBack} style={{ marginRight: '8px' }}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Next
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WorkExperienceForm;
