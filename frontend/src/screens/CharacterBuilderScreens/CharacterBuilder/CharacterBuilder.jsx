import React from 'react';
import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
import CharacterNameForm from '../CharacterNameForm';
import StepFormWrapper from '../StepFormWrapper';
import './CharacterBuilder.css';

const CharacterBuilder = () => {
  return (
    <>
      <CharacterBuilderStepMenu step0 />
      <StepFormWrapper>
        <CharacterNameForm />
      </StepFormWrapper>
    </>
  );
};

export default CharacterBuilder;
