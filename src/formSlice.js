import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {},
  education: [
    { level: 'ssc', school: '', board: '', cgpa: '', year: '' },
    { level: 'hsc', school: '', board: '', cgpa: '', year: '' },
    { level: 'graduation', school: '', board: '', cgpa: '', year: '' },
    { level: 'postGraduation', school: '', board: '', cgpa: '', year: '' }
  ],
  workExperience: [],
  skills: [],
  additionalInfo: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    updateEducation: (state, action) => {
      state.education = action.payload;
    },
    updateWorkExperience: (state, action) => {
      state.workExperience = action.payload;
    },
    updateSkills: (state, action) => {
      state.skills = action.payload;
    },
    updateAdditionalInfo: (state, action) => {
      state.additionalInfo = action.payload;
    },
    addWorkExperience: (state) => {
      state.workExperience.push({ companyName: '', jobTitle: '', startDate: '', endDate: '' });
    },
    removeWorkExperience: (state, action) => {
      state.workExperience.splice(action.payload, 1);
    },
  },
});

export const {
  updatePersonalInfo,
  updateEducation,
  updateWorkExperience,
  updateSkills,
  updateAdditionalInfo,
  addWorkExperience,
  removeWorkExperience,
} = formSlice.actions;

export default formSlice.reducer;
