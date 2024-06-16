import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import WorkExperienceForm from './WorkExperienceForm';
import SkillsForm from './SkillsForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import ReviewForm from './ReviewForm';
import { Container, Stepper, Step, StepLabel, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const steps = [
    'Personal Information',
    'Education',
    'Work Experience',
    'Skills and Qualifications',
    'Additional Information',
    'Review and Submit',
  ];

  const handleNext = (isStepValid) => {
    if (isStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <PersonalInfoForm handleNext={handleNext} setIsValid={setIsValid} />;
      case 1:
        return <EducationForm handleNext={handleNext} handleBack={handleBack} setIsValid={setIsValid} />;
      case 2:
        return <WorkExperienceForm handleNext={handleNext} handleBack={handleBack} setIsValid={setIsValid} />;
      case 3:
        return <SkillsForm handleNext={handleNext} handleBack={handleBack} />;
      case 4:
        return <AdditionalInfoForm handleNext={handleNext} handleBack={handleBack} setIsValid={setIsValid} />;
      case 5:
        return <ReviewForm handleBack={handleBack} handleSubmit={handleSubmit} />;
      default:
        return 'Unknown stepIndex';
    }
  };

  return (
    <Container>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          {getStepContent(activeStep)}
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogTitle id="success-dialog-title">
          <Grid container alignItems="center">
            <Grid item>
              <CheckCircleIcon sx={{ color: 'green', fontSize: 40 }} />
            </Grid>
            <Grid item>
              Success
            </Grid>
            <Grid item>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="success-dialog-description">
            Form submitted successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MultiStepForm;
