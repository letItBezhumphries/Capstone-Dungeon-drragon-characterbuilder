import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateFormData } from '../../slices/formSlice';

import './CharacterNameForm.css';

const CharacterNameForm = ({ avatar, name }) => {
  const [hasAvatar, setHasAvatar] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const onSubmit = (data) => {
    console.log('submited', data);
    dispatch(updateFormData(data));
    navigate('/character/chrace');
  };

  return (
    <form
      style={{
        display: 'flex',
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='character-name-container'>
        <div className='avatar-container'>
          {!hasAvatar ? (
            <div className='avatar-placeholder'>
              <i className='fa-solid fa-circle-user fa-2xl'>
                <span style={{ color: '#fff' }}>+</span>
              </i>
            </div>
          ) : (
            <img className='avatar' src='' alt='' />
          )}
        </div>
        <div className='input-container'>
          <span className='form-input-label'>
            <label htmlFor={`name`}>Character Name:</label>
          </span>
          <span className='form-input-field'>
            <input
              type='text'
              {...register('name')}
              id={'name'}
              className='character-name-input'
              onChange={handleInputChange}
              value={inputVal}
              placeholder={
                name !== undefined
                  ? `${name}'s Character Name`
                  : 'Choose Your Name Adventurer!'
              }
            />
          </span>
        </div>
        {/* GET RID OF */}
        <button type='submit'>NEXT</button>
      </div>
    </form>
  );
};

export default CharacterNameForm;
