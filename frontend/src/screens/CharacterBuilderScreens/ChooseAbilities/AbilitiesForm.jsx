import { styled } from 'styled-components';
import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
// import { autoAbilityRollsUpdated } from '../../../slices/characterBuilderSlice';
import { characterAbilities } from '../../../data/selectors';
import SelectAbilityScore from './SelectAbilityScore';
import AbilityScoreCalculations from './AbilityScoreCalculations';

// import './AbilitiesForm.css';

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
  background-color: yellow;
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
  // const dispatch = useDispatch();

  // const remainingAbilityRolls = useSelector(
  //   (state) => state.character.ability_autorolls_available
  // );

  // const [rollOptions, setRollOptions] = useState(remainingAbilityRolls);
  // const [strength, setStrength] = useState(0);
  // const [constitution, setConstitution] = useState(0);
  // const [intelligence, setIntelligence] = useState(0);
  // const [wisdom, setWisdom] = useState(0);
  // const [dexterity, setDexterity] = useState(0);
  // const [charisma, setCharisma] = useState(0);

  // const values = [
  //   strength,
  //   constitution,
  //   intelligence,
  //   wisdom,
  //   dexterity,
  //   charisma,
  // ];

  // const setters = [
  //   setStrength,
  //   setConstitution,
  //   setIntelligence,
  //   setWisdom,
  //   setDexterity,
  //   setCharisma,
  // ];

  const [abilityRollType, setAbilityRollType] = useState('standard');

  const handleRollTypeSelect = (e) => {
    console.log('the type of roll selected is :', e.target.value);
    setAbilityRollType(e.target.value);
  };

  // const handleAbilityScoreAdded = (e, index) => {
  //   console.log(
  //     'handleAbilityScoreAdded - target:',
  //     typeof parseInt(e.target.value),
  //     'index:',
  //     index
  //   );
  //   setters[index](parseInt(e.target.value));

  //   dispatch(
  //     autoAbilityRollsUpdated(
  //       parseInt({ ability: values[index], roll: parseInt(e.target.value) })
  //     )
  //   );
  // };

  // useEffect(() => {
  //   if (strength > 0) {
  //     setRollOptions();
  //   }

  //   console.log(
  //     'in AbilitiesForm.jsx -> remainingAbilityRolls:',
  //     remainingAbilityRolls,
  //     'strength:',
  //     strength,
  //     'intelligence:',
  //     intelligence,
  //     'constitution:',
  //     constitution,
  //     'wisdom:',
  //     wisdom,
  //     'charisma:',
  //     charisma,
  //     'dexterity:',
  //     dexterity
  //   );
  //   setRollOptions(remainingAbilityRolls);
  // }, [remainingAbilityRolls, strength]);

  console.log('abilityRollType:', abilityRollType);

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
