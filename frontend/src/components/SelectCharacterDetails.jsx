import { characterAlignments, lifeStyles } from '../data/selectors';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';

const SelectContainer = styled.div`
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 20px;
  padding-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 700;
  margin-bottom: 9px;
`;

const Select = styled.select`
  display: block;
  height: 40px;
  background-color: hsla(0, 0%, 100%, 0.75);
  border: 1px solid #d8dde3;
  border-radius: 0;
  box-shadow: inset 0 0 4px 0 rgba(139, 178, 199, 0.48);
  width: 100%;
  color: rgb(0, 0, 0);
  padding: 4px;
  transition: border 0.2s linear, box-shadow 0.2s linear;
`;

export const SelectCharacterAlignment = ({ register, label }) => {
  const [selectionValue, setSelectionValue] = useState('');

  const handleSelection = function (e) {
    const capturedValue = e.target.value;
    // console.log('in handleSelect of SelectCharacterAlignment:', capturedValue);
    setSelectionValue(capturedValue);
  };

  let currentOptions = characterAlignments.map((alignment) => alignment.name);

  return (
    <SelectContainer>
      <Label>{label}</Label>
      <Select
        name='alignment'
        onChange={handleSelection}
        {...register('alignment')}
      >
        <option>- Choose an Option -</option>
        {currentOptions.map((opt, idx) => {
          return (
            <option key={idx} index={idx} value={opt}>
              {opt}
            </option>
          );
        })}
      </Select>
    </SelectContainer>
  );
};

export const SelectCharacterLifeStyle = ({ register, label }) => {
  const [selectionValue, setSelectionValue] = useState('');

  const handleSelection = function (e) {
    const capturedValue = e.target.value;
    // console.log('in SelectCharacterLifeStyle:', capturedValue);
    setSelectionValue(capturedValue);
  };

  let currentOptions = lifeStyles.map((lifestyle) => lifestyle.name);
  return (
    <SelectContainer>
      <Label>{label}</Label>
      <Select
        name='lifestyle'
        onChange={handleSelection}
        {...register('lifestyle')}
      >
        <option>- Choose an Option -</option>
        {currentOptions.map((opt, idx) => {
          return (
            <option key={idx} index={idx} value={opt}>
              {opt}
            </option>
          );
        })}
      </Select>
    </SelectContainer>
  );
};
