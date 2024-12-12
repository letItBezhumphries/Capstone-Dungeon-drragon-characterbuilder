import { useState } from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

const FormInputLabel = styled.span`
  font-family: 'Roboto Condensed';
  font-size: 16px;
  font-weight: 700;
  margin: 10px 0;
  white-space: nowrap;
`;

const FormInputField = styled.span``;

const FormInput = styled.input`
  padding: 10px;
  width: 100%;
  background: none rgb(255, 255, 255);
  border: 1px solid rgb(221, 221, 221);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.075) 0px 1px 1px inset;
  color: rgb(0, 0, 0);
  padding: 4px;
  transition: border 0.2s linear, box-shadow 0.2s linear;
`;

const NameInput = styled.input`
  padding: 10px;
  width: 100%;
`;

export const InputContainer = ({ label, name, register }) => {
  const [inputVal, setInputVal] = useState('');

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  return (
    <Container>
      <FormInputLabel>
        <label>{label}</label>
      </FormInputLabel>
      <FormInputField>
        <FormInput
          type='text'
          {...register(name)}
          id={name}
          onChange={handleInputChange}
          value={inputVal}
          maxLength={'512'}
          spellCheck={false}
          autoComplete='off'
        />
      </FormInputField>
    </Container>
  );
};
