import { styled } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autoAbilityRollsUpdated } from '../../../slices/characterBuilderSlice';

const ScoreSelect = styled.select`
  display: block;
  height: 40px;
  background-color: hsla(0, 0, 100%, 0.75);
  border: 1px solid #d8dde3;
  border-radius: 0;
  box-shadow: inset 0 0 4px 0 rgba(139, 178, 199, 0.48);
  width: 100%;
`;

const ScoreBox = styled.div`
  width: 16%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LabelBox = styled.div``;

const Label = styled.label`
  font-family: 'Roboto Condensed' 'sans-serif';
  font-size: 1rem;
  font-weight: 700;
  margin: 10px 0;
`;

const AbilityScore = styled.span`
  padding: 0px 0px;
  margin: 0px 0px;
  width: 100%;
`;

const ScoreTotal = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin: 10px 0;
  text-align: center;
  text-transform: uppercase;
`;

const ScoreOption = styled.option``;

const SelectAbilityScore = ({ register, ability, index }) => {
  const dispatch = useDispatch();

  const remainingAbilityRolls = useSelector(
    (state) => state.character.ability_autorolls_available
  );

  const abilityRollsSelected = useSelector(
    (state) => state.character.ability_autorolls_selected
  );

  const abilityScores = useSelector((state) => state.character.ability_scores);

  const [value, setValue] = useState('');
  const [hasMadeSelection, setHasMadeSelection] = useState(false);
  const [abilityRollsAvailable, setAbilityRollsAvailable] = useState(
    remainingAbilityRolls
  );

  const handleAbilityScoreAdded = (e) => {
    let capturedValue = parseInt(e.target.value);
    setValue(capturedValue);
    dispatch(
      autoAbilityRollsUpdated({ ability: ability, roll: capturedValue })
    );
    setHasMadeSelection((prevState) => !prevState);
  };

  console.log(
    'in SelectAbilityScore.jsx -> ability:',
    ability,
    '\nremainingAbilityRolls:',
    remainingAbilityRolls,
    '\nabilityRollsSelected:',
    abilityRollsSelected,
    '\nabilityScores:',
    abilityScores
  );

  useEffect(() => {
    console.log(
      'useEffect -> remainingAbilityRolls:',
      remainingAbilityRolls,
      '\nability:',
      ability,
      '\nremainingAbilityRolls:',
      remainingAbilityRolls,
      '\nabilityRollsSelected:',
      abilityRollsSelected,
      '\nabilityScores:',
      abilityScores
    );

    if (!hasMadeSelection && abilityRollsSelected.length > 0) {
      console.log(
        `the ability ${ability} - in state abilityScores:`,
        abilityScores
      );
      setAbilityRollsAvailable(remainingAbilityRolls);
    }
  }, [remainingAbilityRolls, abilityRollsSelected, abilityScores]);

  return (
    <ScoreBox>
      <LabelBox>
        <Label>{ability}</Label>
      </LabelBox>
      <AbilityScore>
        <ScoreSelect
          name={ability}
          id={ability}
          data-select-ability={ability}
          className='select-ability'
          onChangeCapture={handleAbilityScoreAdded}
          // onChange={handleAbilityScoreAdded}
          {...register(ability)}
        >
          <option value='--'>--</option>
          {abilityRollsAvailable.map((ab, idx) => (
            <option key={idx} value={ab}>
              {ab}
            </option>
          ))}
        </ScoreSelect>
      </AbilityScore>
      <ScoreTotal>
        Total:
        {value}
      </ScoreTotal>
    </ScoreBox>
  );
};

export default SelectAbilityScore;
