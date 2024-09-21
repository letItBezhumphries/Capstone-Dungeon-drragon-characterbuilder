import React from 'react';
import { useState, useEffect } from 'react';
import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
import CharacterName from '../CharacterName';
import AbilitiesForm from './AbilitiesForm';

import './ChooseAbilitiesScreen.css';

const ChooseAbilitiesScreen = () => {
  return (
    <div id='chabilities'>
      <CharacterBuilderStepMenu
        step0
        step1
        step2
        step3
      ></CharacterBuilderStepMenu>
      <form
        className={'stepper-container'}
        // onSubmit={handleSubmit(onNextStepClick)}
      >
        <Button
          step='Prev'
          text='Prev'
          color='#74C0FC'
          icon='fa-solid fa-chevron-left fa-2xl'
        />
        <Container className='stepper-form-inner' fluid>
          <CharacterName register={register} />

          <AbilitiesForm />
        </Container>
        <Button
          step='Next'
          text='Next'
          color='#74C0FC'
          icon='fa-solid fa-chevron-right fa-2xl'
          type='submit'
        />
      </form>
    </div>
  );
};

export default ChooseAbilitiesScreen;
