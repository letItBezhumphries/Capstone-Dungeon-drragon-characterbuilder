import { CHARACTERS_URL } from '../constants/constants';
import { apiSlice } from './apiSlice';

export const charactersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: () => ({
        url: `${CHARACTERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getCharacterDetails: builder.query({
      query: (id) => ({
        url: `${CHARACTERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createCharacter: builder.mutation({
      query: (character) => ({
        url: `${CHARACTERS_URL}/new/${character.userId}`,
        method: 'POST',
        body: { ...character },
      }),
    }),
    initCreateCharacter: builder.mutation({
      query: () => ({
        url: `${CHARACTERS_URL}`,
        method: 'POST',
      }),
      // invalidateTags will stop this from getting cached since will use update instead and it wont cause page to refresh
      invalidatesTags: ['Character'],
    }),
    updateCharacter: builder.mutation({
      query: (character) => ({
        url: `${CHARACTERS_URL}/${character.id}`,
        method: 'PUT',
        body: { ...character },
      }),
    }),
    deleteCharacter: builder.mutation({
      query: (id) => ({
        url: `${CHARACTERS_URL}/${id}`,
        method: 'DELETE',
        body: { id },
      }),
    }),
  }),
  overrideExisting: true,
});

// export the query
export const {
  useGetCharactersQuery,
  useGetCharacterDetailsQuery,
  useCreateCharacterMutation,
  useInitCreateCharacterMutation,
  useUpdateCharacterMutation,
  useDeleteCharacterMutation,
} = charactersApiSlice;
