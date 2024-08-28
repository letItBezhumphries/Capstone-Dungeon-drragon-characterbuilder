import React from 'react';
import { useGetCharacterDetailsQuery } from '../../slices/charactersApiSlice';
import { useParams } from 'react-router-dom';

const CharacterDetailsScreen = () => {
  const { id: chrId } = useParams();

  const { data, isLoading, error } = useGetCharacterDetailsQuery(chrId);

  console.log('in CharacterDetailsScreen: -> fetched character:', data);

  return <div>CharacterDetailsScreen</div>;
};

export default CharacterDetailsScreen;
