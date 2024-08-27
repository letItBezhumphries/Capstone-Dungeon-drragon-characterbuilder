import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../../components/FormContainer';
import './AbilitiesForm.css';

const AbilitiesForm = () => {
  const selectorRef = useRef();
  const [currentSelectValue, setCurrentSelectValue] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [strength, setStrength] = useState(0);
  const [constitution, setConstitution] = useState(0);
  const [intelligence, setIntelligence] = useState(0);
  const [wisdom, setWisdom] = useState(0);
  const [dexterity, setDexterity] = useState(0);
  const [charisma, setCharisma] = useState(0);

  const abilityRolls = [8, 10, 12, 13, 14, 15];
  const [remainingAbilityRolls, setRemainingAbilityRolls] = useState(
    abilityRolls.slice()
  );

  const [abilityScoresUsed, setAbilityScoresUsed] = useState([]);
  let usedAbilityScores = abilityScoresUsed.length;

  useEffect(() => {
    console.log(
      'the current selected value:',
      currentSelectValue,
      'is at index',
      currentIndex
    );
    setRemainingAbilityRolls();
  }, [usedAbilityScores, currentIndex]);

  const abilities = [
    'Strength',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Dexterity',
    'Charisma',
  ];

  const setters = [
    setStrength,
    setConstitution,
    setIntelligence,
    setWisdom,
    setDexterity,
    setCharisma,
  ];

  useEffect(() => {
    console.log(
      'charisma:',
      charisma,
      strength,
      dexterity,
      intelligence,
      wisdom,
      constitution
    );
  }, [charisma, strength, dexterity, intelligence, wisdom, constitution]);

  const [abilityRollType, setAbilityRollType] = useState('standard');

  const handleRollTypeSelect = (e) => {
    console.log('the type of roll selected is :', e.target.value);
    setAbilityRollType(e.target.value);
  };

  const handleAbilityScoreAdded = (e, index) => {
    // e.preventDefault();
    console.log('target element:', e.target, 'index of select el:', index);
    // call the matching index from abilities to set the correct value for the ability
    setters[index](parseInt(e.target.value));

    console.log('selectRef:', selectorRef);
    setCurrentSelectValue(parseInt(e.target.value));
    setCurrentIndex(index);
    setAbilityScoresUsed(parseInt(e.target.value));
    // setCurrentIndex(remainingAbilityRolls.indexOf())
    // console.log('in handleAbilityScoreAdded:', selectedRoll);
    // let remainingRolls = remainingAbilityRolls.filter((roll) => {
    //   return roll !== parseInt(selectedRoll);
    // });

    // console.log('remainingRolls:', remainingRolls);
    // setRemainingAbilityRolls([...remainingRolls]);
  };

  const handleResettingRolls = function (e) {
    e.preventDefault();
    let remainingRolls = remainingAbilityRolls.filter((roll) => {
      return roll !== parseInt(e.target.value);
    });

    setRemainingAbilityRolls([...remainingRolls]);
  };

  // console.log('abilityRollType:', abilityRollType);

  return (
    // <FormContainer width={'80%'}>
    <form className='abilities-form'>
      <div className='abilities-inner-container'>
        <h3>Ability Scores</h3>

        <div style={{ marginBottom: '20px' }}>
          <select
            ref={selectorRef}
            name='ability'
            id='ability'
            onChange={handleRollTypeSelect}
            className='select-ability'
          >
            <option value='standard'>Standard Array</option>
            <option value='manual'>Manual Rolled</option>
          </select>
        </div>

        <div className='ability-scores-board'>
          {abilities.map((ability, idx) => {
            return (
              <div className='ability-score-stat' key={idx}>
                <span className='ability-labelbox'>
                  <label
                    htmlFor={`qry_${ability}`}
                    className='ability-score-label'
                  >
                    {ability}
                  </label>
                </span>
                <span className='ability-score'>
                  <select
                    name='ability-score'
                    id={ability}
                    data-select-ability={ability}
                    className='select-ability'
                    onChange={(e) => {
                      handleAbilityScoreAdded(e, idx);
                      // handleResettingRolls(e);
                    }}
                  >
                    <option value='--'>--</option>
                    {remainingAbilityRolls.map((ab, idx) => (
                      <option key={idx} value={ab}>
                        {ab}
                      </option>
                    ))}
                  </select>
                </span>
                <div className='ability-score-total'>Total: </div>
              </div>
            );
          })}
        </div>
      </div>
    </form>

    // </FormContainer>
  );
};

export default AbilitiesForm;
