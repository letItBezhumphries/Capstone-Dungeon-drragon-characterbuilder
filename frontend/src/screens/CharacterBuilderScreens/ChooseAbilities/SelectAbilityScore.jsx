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

const RollOption = styled.option`
  font-size: 15px;
  color: rgb(0, 0, 0);
`;

const ScoreBox = styled.div`
  width: 16%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LabelBox = styled.span`
  text-align: center;
`;

const Label = styled.label`
  font-family: 'Roboto Condensed';
  font-size: 1rem;
  font-weight: 700;
  line-height: normal;
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

const SelectAbilityScore = ({ register, ability }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const abilityRolls = [8, 10, 12, 13, 14, 15];

  const abilityRollsSelected = useSelector(
    (state) => state.character.ability_autorolls_selected
  );
  const abilityScores = useSelector((state) => state.character.ability_scores);
  let key = ability.toLowerCase();
  const currentAbility = abilityScores[key];
  const [value, setValue] = useState('');

  useEffect(() => {
    if (currentAbility.base_score > 0) {
      setValue(currentAbility.base_score);
    }
  }, [currentAbility.base_score]);

  const handleAbilityScoreAdded = (e) => {
    let capturedValue = parseInt(e.target.value);
    setValue(capturedValue);
    dispatch(
      autoAbilityRollsUpdated({
        ability: ability.toLowerCase(),
        roll: capturedValue,
      })
    );
  };

  return (
    <ScoreBox>
      <LabelBox>
        <Label>{ability.toUpperCase()}</Label>
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
          <RollOption value={0} disabled={false}>
            --
          </RollOption>
          {abilityRolls.map((ab, idx) => (
            <RollOption
              key={idx}
              value={ab}
              disabled={abilityRollsSelected.indexOf(ab) === -1 ? false : true}
              style={
                abilityRollsSelected.indexOf(ab) !== -1
                  ? {
                      display: 'none',
                    }
                  : {
                      display: 'block',
                    }
              }
            >
              {ab}
            </RollOption>
          ))}
        </ScoreSelect>
      </AbilityScore>
      <ScoreTotal>
        Total:
        {value + currentAbility.bonus}
      </ScoreTotal>
    </ScoreBox>
  );
};

export default SelectAbilityScore;
