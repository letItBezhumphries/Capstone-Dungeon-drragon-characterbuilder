import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// https://www.dnd5eapi.co/api/classes/bard/spells

// Define a service using a base URL and expected endpoints
export const open5eSRDSpellsApi = createApi({
  reducerPath: 'open5eSRDSpellsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.dnd5eapi.co/api/classes/',
  }),
  endpoints: (builder) => ({
    getSpellsForClass: builder.query({
      query: (class_type) => `${class_type}/spells`,
    }),
    keepUnusedDataFor: 5,
  }),
});

export const { useGetSpellsForClassQuery } = open5eSRDSpellsApi;
