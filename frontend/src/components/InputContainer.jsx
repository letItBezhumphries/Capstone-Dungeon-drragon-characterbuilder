import React from 'react';
import { useState } from 'react';
import './InputContainer.css';

const InputContainer = ({ label, value, classType, register }) => {
  const [inputVal, setInputVal] = useState(value);

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  return (
    <div className='input-container'>
      <span className='form-input-label'>
        <label htmlFor={`name`}>{label}</label>
      </span>
      <span className='form-input-field'>
        <input
          type='text'
          {...register('name')}
          id='name'
          className={classType}
          onChange={handleInputChange}
          value={inputVal}
        />
      </span>
    </div>
  );
};

export default InputContainer;
