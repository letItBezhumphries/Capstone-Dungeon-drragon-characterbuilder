import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CharacterName.css';

const CharacterName = ({ register, avatar, ...rest }) => {
  const location = useLocation();
  const [hasAvatar, setHasAvatar] = useState(false);
  const [name, setName] = useState('');
  const characterName = useSelector((state) => state.form.formData.name);

  useEffect(() => {
    // console.log('location:', location);
    if (location.pathname !== '/character') {
      setName(characterName);
    }
  }, [location]);

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
          <img className='avatar' src='' alt='' />
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
              characterName !== undefined
                ? `${characterName}`
                : 'Name your Adventurerer!'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterName;
