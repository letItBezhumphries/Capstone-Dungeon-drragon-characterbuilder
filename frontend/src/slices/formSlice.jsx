import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = {};
    },
  },
});

export const { updateFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
