import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('character')
  ? JSON.parse(localStorage.getItem('character'))
  : { name: '', race: {}, class_type: {}, abilities: {}, userId: '' };

const buildCharacterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    updateName: (state, action) => {
      const { user, name } = action.payload;
      state.name = name;
      localStorage.setItem('character', JSON.stringify(state));
      return state;
    },
    addName: (state, action) => {
      state.name = action.payload;
      localStorage.setItem('character', JSON.stringify(state));
    },
    saveRace: (state, action) => {
      state.race = action.payload;
      localStorage.setItem('character', JSON.stringify(state));
    },
    saveClass: (state, action) => {
      state.class = action.payload;
      localStorage.setItem('character', JSON.stringify(state));
    },
    saveAbilities: (state, action) => {
      state.abilities = action.payload;
      localStorage.setItem('character', JSON.stringify(state));
    },
    clearCharacter: (state, action) => {
      state.race = {};
      state.class_type = {};
      state.abilities = {};
      localStorage.setItem('character', JSON.stringify(state));
    },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: (state) => (state = initialState),
  },
});

export const { addName, saveClass, saveRace, saveAbilities, clearCharacter } =
  buildCharacterSlice.actions;

export default buildCharacterSlice.reducer;
