import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CharacterName.css';

const CharacterName = ({ register, avatar }) => {
  const location = useLocation();
  const [hasAvatar, setHasAvatar] = useState(true);
  const [name, setName] = useState('');
  const character = useSelector((state) => state.character);

  useEffect(() => {
    if (location.pathname !== '/character' && character.name !== '') {
      console.log('in character name useEffect -> :', character.name);
      setName(character.name);
    }
  }, [location, character]);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className='character-name-container'>
      <div className='avatar-container'>
        {!hasAvatar ? (
          <div className='avatar-placeholder'>
            <i className='fa-solid fa-circle-user fa-2xl'>
              <span style={{ color: '#fff' }}>+</span>
            </i>
          </div>
        ) : (
          <div className='avatar-placeholder'>
            <span>+</span>
          </div>
        )}
      </div>
      <div className='input-container'>
        <div className='form-input-label'>
          <label htmlFor={`name`}>Character Name:</label>
        </div>
        <div className='form-input-field'>
          <input
            type='text'
            {...register('name')}
            id={'name'}
            className='character-name-input'
            onChange={handleInputChange}
            value={name || ''}
            placeholder={
              character.name !== undefined
                ? `${character.name}`
                : 'Name your Adventurerer!'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterName;
