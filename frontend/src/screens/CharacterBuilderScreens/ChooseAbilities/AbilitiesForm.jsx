import { styled } from 'styled-components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { characterAbilities } from '../../../data/selectors';
import SelectAbilityScore from './SelectAbilityScore';
import AbilityScoreCalculations from './AbilityScoreCalculations';

const AbilitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0;
  padding: 0 0;
  height: 100%;
`;

const AbilitiesInnerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 0;

  & h3 {
    margin-bottom: 20px;
    font-family: 'Roboto' 'sans-serif';
    font-size: 24px;
    font-weight: 400;
  }
`;

const RollManagerContainer = styled.div`
  margin-bottom: 20px;
`;

const AbilityScoresBoard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 25px;
  padding-bottom: 20px;
`;

const AbilityManagerSelect = styled.select`
  display: block;
  max-width: 100%;
  width: 400px;
  max-width: 50%;
  height: 40px;
`;

const ManagerOption = styled.option``;

const AbilitiesForm = ({ register }) => {
  const managerRef = useRef();

  const [abilityRollType, setAbilityRollType] = useState('standard');

  const handleRollTypeSelect = (e) => {
    console.log('the type of roll selected is :', e.target.value);
    setAbilityRollType(e.target.value);
  };

  return (
    <AbilitiesContainer>
      <AbilitiesInnerContainer>
        <h3>Ability Scores</h3>

        <RollManagerContainer>
          <AbilityManagerSelect
            ref={managerRef}
            name='ability'
            id='ability'
            onChange={handleRollTypeSelect}
          >
            <option value='standard'>Standard Array</option>
            <option value='manual'>Manual Rolled</option>
          </AbilityManagerSelect>
        </RollManagerContainer>

        <AbilityScoresBoard>
          {characterAbilities.map((ability, idx) => {
            return (
              <SelectAbilityScore
                key={idx}
                ability={ability}
                index={idx}
                register={register}
              />
            );
          })}
        </AbilityScoresBoard>
      </AbilitiesInnerContainer>
      <AbilityScoreCalculations />
    </AbilitiesContainer>
  );
};

export default AbilitiesForm;
