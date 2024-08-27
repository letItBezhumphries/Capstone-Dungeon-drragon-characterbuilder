import React from 'react';
import { useState } from 'react';
import FormContainer from '../../components/FormContainer';
import InputContainer from '../../components/InputContainer';

import './CharacterNameForm.css';

const CharacterNameForm = ({ avatar }) => {
  const [hasAvatar, setHasAvatar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submited');
  };

  return (
    <form
      style={{
        display: 'flex',
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onSubmit={handleSubmit}
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
        <InputContainer
          query_num={3}
          label={'Character Name'}
          classType={'character-name-input'}
          value={'Profile 123persons name'}
        />
      </div>
    </form>
  );
};

export default CharacterNameForm;
