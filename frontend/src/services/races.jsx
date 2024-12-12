import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const open5eRaceApi = createApi({
  reducerPath: 'open5eRaceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.open5e.com/' }),
  endpoints: (builder) => ({
    getDataForRace: builder.query({
      query: (race) => `races/${race}`,
    }),
    keepUnusedDataFor: 5,
  }),
});

// https://www.dnd5eapi.co/api/races/dragonborn

export const dnd5eRaceApi = createApi({
  reducerPath: 'dnd5eRaceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.dnd5eapi.co/api/' }),
  endpoints: (builder) => ({
    getdnd5eRaceData: builder.query({
      query: (race) => `races/${race}`,
    }),
    keepUnusedDataFor: 5,
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDataForRaceQuery } = open5eRaceApi;

export const { useGetdnd5eRaceDataQuery } = dnd5eRaceApi;
