// import { createSlice } from '@reduxjs/toolkit';

// const initialState = localStorage.getItem('spells')
//   ? JSON.parse(localStorage.getItem('spells'))
//   : { spells: {}, spell_casting: {}, userId: '' };

// const spellsSlice = createSlice({
//   name: 'spells',
//   initialState,
//   reducers: {
//     addAvailableSpells: (state, action) => {
//       state.spells = action.payload;
//       localStorage.setItem('spells', JSON.stringify(state));
//       return state;
//     },
//     // NOTE: here we need to reset state for when a user logs out so the next
//     // user doesn't inherit the previous users cart and shipping
//   },
// });

// export const { addAvailableSpells } = spellsSlice.actions;

// export const spellsSliceReducer = spellsSlice.reducer;
