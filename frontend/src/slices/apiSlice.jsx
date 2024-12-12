// because project is working with backend api we need to import both createApi, and
// fetchBaseQuery which allows us to make requests to our backend api
// helps to pass headers to handle endpoints differently ?
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// import the urls
import { BASE_URL } from '../constants/constants';

import { logout } from './authSlice'; // Import the logout action

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

async function baseQueryWithAuth(args, api, extra) {
  const result = await baseQuery(args, api, extra);
  // Dispatch the logout action on 401.
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
}

// tagTypes used to define what data type is being fetched from the api
// endpoints and builder is going to handle the try catch? to make other requests
export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Monster', 'Character', 'User'],
  endpoints: () => ({}),
});
