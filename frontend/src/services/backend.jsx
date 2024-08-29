import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const backendMonstersApi = createApi({
  reducerPath: 'backendMonstersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5005' }),
  endpoints: (builder) => ({
    getBackendMonsters: builder.query({
      query: () => `/api/monsters`,
    }),
    keepUnusedDataFor: 5,
  }),
});

export const backendCharactersApi = createApi({
  reducerPath: 'backendCharactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5005' }),
  endpoints: (builder) => ({
    getBackendCharacters: builder.query({
      query: () => `/api/characters`,
    }),
    getCharacterDetails: builder.query({
      query: (id) => ({
        url: `/api/characters/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createCharacter: builder.mutation({
      query: (character) => ({
        url: `/api/characters/new/${character.userId}`,
        method: 'POST',
        body: { ...character },
      }),
    }),
    initCharacter: builder.mutation({
      query: () => ({
        url: `/api/characters/new`,
        method: 'POST',
      }),
      // invalidateTags will stop this from getting cached since will use update instead and it wont cause page to refresh
      invalidatesTags: ['Character'],
    }),
    updateCharacter: builder.mutation({
      query: (character) => ({
        url: `/api/characters/update/${character._id}`,
        method: 'PUT',
        body: { ...character },
      }),
      keepUnusedDataFor: 5,
    }),
    deleteCharacter: builder.mutation({
      query: (id) => ({
        url: `/api/characters/${id}`,
        method: 'DELETE',
        body: { id },
      }),
    }),
    keepUnusedDataFor: 5,
  }),
});

export const backendUsersApi = createApi({
  reducerPath: 'backendUsersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5005' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/api/users`,
      providesTags: ['User'],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/api/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/api/users`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/api/users/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `/api/users/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/users/${userId}`,
        method: 'DELETE',
      }),
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `/api/users/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/api/users/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    keepUnusedDataFor: 5,
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBackendMonstersQuery } = backendMonstersApi;

export const {
  useGetBackendCharactersQuery,
  useGetCharacterDetailsQuery,
  useCreateCharacterMutation,
  useUpdateCharacterMutation,
  useDeleteCharacterMutation,
} = backendCharactersApi;

export const {
  useGetBackendUsersQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} = backendUsersApi;
