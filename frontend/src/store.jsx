import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { open5eRaceApi, dnd5eRaceApi } from './services/races';
import { open5eClassApi, dnd5eClassApi } from './services/classes';
import { open5eMonstersApi } from './services/monsters';
import { open5eSRDSpellsApi } from './services/spells';

import {
  backendMonstersApi,
  backendCharactersApi,
  backendUsersApi,
} from './services/backend';
import { apiSlice } from './slices/apiSlice';
// import { userApiSlice } from './slices/userApiSlice';
// import { charactersApiSlice } from './slices/charactersApiSlice';
import { characterBuilderSliceReducer } from './slices/characterBuilderSlice';
import formReducer from './slices/formSlice';
import authSliceReducer from './slices/authSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  // [userApiSlice.reducerPath]: userApiSlice.reducer,
  [open5eMonstersApi.reducerPath]: open5eMonstersApi.reducer,
  [open5eClassApi.reducerPath]: open5eClassApi.reducer,
  [dnd5eClassApi.reducerPath]: dnd5eClassApi.reducer,
  [dnd5eRaceApi.reducerPath]: dnd5eRaceApi.reducer,
  [open5eRaceApi.reducerPath]: open5eRaceApi.reducer,
  [open5eSRDSpellsApi.reducerPath]: open5eSRDSpellsApi.reducer,
  [backendMonstersApi.reducerPath]: backendMonstersApi.reducer,
  [backendCharactersApi.reducerPath]: backendCharactersApi.reducer,
  [backendUsersApi.reducerPath]: backendUsersApi.reducer,
  character: characterBuilderSliceReducer,
  form: formReducer,
  auth: authSliceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      // .concat(userApiSlice.middleware)
      .concat(open5eRaceApi.middleware)
      .concat(open5eClassApi.middleware)
      .concat(dnd5eClassApi.middleware)
      .concat(dnd5eRaceApi.middleware)
      .concat(open5eMonstersApi.middleware)
      .concat(open5eSRDSpellsApi.middleware)
      .concat(backendMonstersApi.middleware)
      .concat(backendCharactersApi.middleware)
      .concat(backendUsersApi.middleware),
  devTools: true,
});

export { store };
