import React from 'react';
import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
import CharacterNameForm from '../CharacterNameForm';
import StepFormControlWrapper from '../StepFormWrapper';
import './CharacterBuilder.css';

const CharacterBuilder = () => {
  return (
    <>
      <CharacterBuilderStepMenu step0 />
      <StepFormControlWrapper>
        <CharacterNameForm />
      </StepFormControlWrapper>
    </>
  );
};

export default CharacterBuilder;
