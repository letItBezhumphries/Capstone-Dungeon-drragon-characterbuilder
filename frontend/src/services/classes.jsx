import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const open5eClassApi = createApi({
  reducerPath: 'open5eClassApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.open5e.com/' }),
  endpoints: (builder) => ({
    getClassData: builder.query({
      query: (classType) => `classes/${classType}`,
    }),
    getSpellsForClass: builder.query({
      query: (classType) =>
        `spells/?limit=1000&search=${classType}&document__slug=wotc-srd`,
    }),
    keepUnusedDataFor: 5,
  }),
});

//'https://www.dnd5eapi.co/api/classes/bard/levels/1' \

export const dnd5eClassApi = createApi({
  reducerPath: 'dnd5eClassApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.dnd5eapi.co/api/' }),
  endpoints: (builder) => ({
    getdnd5eClassData: builder.query({
      query: (classType) => `classes/${classType}`,
    }),
    getdnd5eClassResourcesForLevel: builder.query({
      query: (classType, level) => `classes/${classType}/levels/${level}`,
    }),
    keepUnusedDataFor: 5,
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetClassDataQuery, useGetSpellsForClassQuery } =
  open5eClassApi;

export const {
  useGetdnd5eClassDataQuery,
  useGetdnd5eClassResourcesForLevelQuery,
} = dnd5eClassApi;
// spells/?search=${classType}?limit=1000&spell_level=${level}
