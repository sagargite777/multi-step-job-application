import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Grid, Typography } from '@mui/material';

const ReviewForm = ({ handleBack, handleSubmit }) => {
  const form = useSelector((state) => state.form);
  console.log("form", form);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Personal Information</Typography>
          <Typography>Name: {form.personalInfo.name}</Typography>
          <Typography>Email: {form.personalInfo.email}</Typography>
          <Typography>Phone: {form.personalInfo.phone}</Typography>
          <Typography>Address: {form.personalInfo.address}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Education</Typography>
          {form.education.map((edu, index) => {
            const { level, school, board, cgpa, year } = edu;

            if (!school && !board && !cgpa && !year) {
              return null;
            }

            return (
              <React.Fragment key={index}>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                  {level.toUpperCase()} School/Institute Name: {school}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                  {level.toUpperCase()} Board/University: {board}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                  {level.toUpperCase()} CGPA: {cgpa}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                  {level.toUpperCase()} Passing Year: {year}
                </Typography>
              </React.Fragment>
            );
          })}
        </Grid>
        {form.workExperience.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6">Work Experience</Typography>
            {form.workExperience.map((experience, index) => (
              <React.Fragment key={index}>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                  Company Name: {experience.companyName}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                  Job Title: {experience.jobTitle}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                  Duration: {experience.startDate} - {experience.endDate}
                </Typography>
              </React.Fragment>
            ))}
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="h6">Skills and Qualifications</Typography>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>
            Technical Skills: {form.skills.join(', ')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Additional Information</Typography>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>
            Cover Letter: {form.additionalInfo.coverLetter}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>
            Resume: {form.additionalInfo.resume?.name}
          </Typography>
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReviewForm;
