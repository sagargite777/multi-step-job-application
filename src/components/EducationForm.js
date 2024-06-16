import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEducation } from '../formSlice';
import { TextField, Button, Container, Grid, IconButton, Typography, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const EducationForm = ({ handleNext, handleBack, setIsValid }) => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.form.education);

  const [form, setForm] = useState(
    Array.isArray(education) && education.length > 0
      ? education
      : [
          { level: 'ssc', school: '', board: '', cgpa: '', year: new Date().getFullYear() },
          { level: 'hsc', school: '', board: '', cgpa: '', year: new Date().getFullYear() },
          { level: 'graduation', school: '', board: '', cgpa: '', year: new Date().getFullYear() },
          { level: 'postGraduation', school: '', board: '', cgpa: '', year: new Date().getFullYear() }
        ]
  );

  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedForm = [...form]; 
    updatedForm[index] = {
      ...updatedForm[index], 
      [name]: value 
    };
    setForm(updatedForm); 
  };

  const handleAddEducation = () => {
    setForm([
      ...form,
      { level: '', school: '', board: '', cgpa: '', year: new Date().getFullYear() }
    ]);
  };

  const handleRemoveEducation = (index) => {
    setForm(form.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = form.map((edu) => ({
      school: edu.school.trim() === '',
      board: edu.board.trim() === '',
      cgpa: isNaN(edu.cgpa) || edu.cgpa === '',
      year: isNaN(edu.year) || edu.year < 1900 || edu.year > new Date().getFullYear(),
    }));
    setErrors(newErrors);
    return newErrors.every((error) => !Object.values(error).some(Boolean));
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [form, setIsValid]);

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(updateEducation(form));
      handleNext(true); 
    } else {
      setShowErrors(true);
      handleNext(false); 
    }
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Education Information
      </Typography>
      <Grid container spacing={3}>
        {form.map((edu, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12}>
              <TextField
                name="school"
                label={`School/Institute Name ${edu.level.toUpperCase()}`}
                value={edu.school}
                onChange={(e) => handleChange(e, index)}
                fullWidth
                required
                size="small"
                error={showErrors && errors[index]?.school}
                helperText={showErrors && errors[index]?.school ? 'School/Institute Name is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="board"
                label={`Board/University ${edu.level.toUpperCase()}`}
                value={edu.board}
                onChange={(e) => handleChange(e, index)}
                fullWidth
                required
                size="small"
                error={showErrors && errors[index]?.board}
                helperText={showErrors && errors[index]?.board ? 'Board/University is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="cgpa"
                label={`CGPA ${edu.level.toUpperCase()}`}
                type="number"
                value={edu.cgpa}
                onChange={(e) => handleChange(e, index)}
                fullWidth
                required
                size="small"
                error={showErrors && errors[index]?.cgpa}
                helperText={showErrors && errors[index]?.cgpa ? 'Please enter a valid CGPA' : ''}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                name="year"
                label={`Passing Year ${edu.level.toUpperCase()}`}
                value={edu.year}
                onChange={(e) => handleChange(e, index)}
                fullWidth
                required
                size="small"
                error={showErrors && errors[index]?.year}
                helperText={showErrors && errors[index]?.year ? 'Passing Year is required' : ''}
              >
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {index > 0 && (
              <Grid item xs={12}>
                <IconButton onClick={() => handleRemoveEducation(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            )}
          </React.Fragment>
        ))}
        <Grid item xs={12}>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddEducation}>
            Add Education
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Next
          </Button>
        </div>
      </Grid>
    </Container>
  );
};

export default EducationForm;
