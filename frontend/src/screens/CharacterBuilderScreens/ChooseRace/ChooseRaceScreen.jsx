import {
  FormContainerInner,
  FormContainerOuter,
} from '../../../components/FormContainer';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateFormData } from '../../../slices/formSlice';
import {
  clearFilteredRace,
  setFilteredRace,
} from '../../../slices/characterBuilderSlice';
import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
import FilterOptionItem from '../../../components/FilterOptionItem';
import ConfirmRace from './ConfirmRace';
import CharacterName from '../CharacterName';
import Button from '../../../components/Button';
import ChooseRaceModal from './ChooseRaceModal';
import { characterRaces } from '../../../data/selectors';
import './ChooseRaceScreen.css';

const ChooseRaceScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const race = useSelector((state) => state.character.selected_race);

  const [temporaryRace, setTemporaryRace] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSelectionForm, setShowSelectionForm] = useState(false);
  const [formIsReady, setFormIsReady] = useState(false);

  const handleLastSelections = () => {
    setFormIsReady(true);
  };

  // closes the modal
  const handleClose = () => setShowConfirmationModal(false);

  /* eventhandler that set the starting race filter and 
  opens the confirm race modal when user clicks on a filteroption
  */
  const handleRaceFilter = (race) => {
    let raceObj = characterRaces.find((r) => r.index === race);
    setTemporaryRace({
      name: raceObj.name,
      index: raceObj.index,
      imgSrc: raceObj.imgSrc,
      description: raceObj.description,
    });
    setShowConfirmationModal(true);
  };

  /* event handler that is fired in the race confirm modal when user clicks the confirm button 
    this handler accepts a selection argument which it pass to the setFilteredRace action from character slice
    to set the confirmed race for the character,  and then closes the modal
  */
  const handleConfirmSelection = (selection) => {
    // console.log('FINAL Selection passed to eventhandler:', selection);
    setShowSelectionForm(true);
    // close the Confirmation Model

    handleClose();
  };

  const onPrevStepClick = (data) => {
    navigate('/character');
  };

  // click handler for the next button
  const onNextStepClick = (data) => {
    // need to parse the stringified JSON
    // find the matching trait choice
    console.log('these are the inputs captured data:', data);
    // store the parsed race data
    const raceData = JSON.parse(data.race);
    console.log('Race data submitted by form:', raceData);
    // create a cache object
    const targetCache = {};
    // loop over the keys in data and only target keys that aren't 'name', and 'race'
    for (let key in data) {
      if (key !== 'name' && key !== 'race') {
        // for the multiple select traits target only the keys that end with a 1 or 0
        if (key[key.length - 1] === '0' || key[key.length - 1] === '1') {
          // store the matching trait name by getting rid of index added to name
          let newKey = key.split('-')[0];
          // check if newKey exists on cache
          if (!targetCache[newKey]) {
            // it doesn't so just assign it to array literal with the value of the key as the only element
            targetCache[newKey] = [data[key]];
          } else {
            // it does exist therefore need to add the value for the key to the cache
            targetCache[newKey].push(data[key]);
          }
        } else {
          // here it is not a trait that has multple options so just assign the cache[key] to the value of the key in data
          targetCache[key] = data[key];
        }
      }
    }

    console.log('targetCache:', targetCache);
    for (let key in targetCache) {
      raceData.traits.map((tr, idx) => {
        if (tr.name === key) {
          raceData.traits[idx].selected = targetCache[key];
        }
      });
    }

    console.log(
      'ChooseRaceScreen - after raceData onNextStep click:',
      raceData.traits
    );
    dispatch(setFilteredRace(raceData));
    dispatch(updateFormData({ race: raceData }));
    navigate('/character/chclass');
  };

  const handleCancelSelection = () => {
    dispatch(clearFilteredRace());
    setShowConfirmationModal(false);
  };

  return (
    <div id='chrace'>
      <CharacterBuilderStepMenu step0 step1></CharacterBuilderStepMenu>
      <form
        className={'character-stepper-form'}
        onSubmit={handleSubmit(onNextStepClick)}
      >
        <FormContainerOuter>
          <Button
            step='Prev'
            text='Prev'
            color='#74C0FC'
            icon='fa-solid fa-chevron-left fa-2xl'
            click={onPrevStepClick}
          />
          <FormContainerInner>
            <CharacterName register={register} />
            {showSelectionForm && race?.name ? (
              <>
                <ConfirmRace
                  isModal={false}
                  race={race}
                  register={register}
                  onFormReady={handleLastSelections}
                />
                <input
                  value={JSON.stringify(race)}
                  name='race'
                  {...register('race')}
                  style={{ display: 'none' }}
                ></input>
              </>
            ) : (
              <div className='filtering-container'>
                {characterRaces.map((race, idx) => (
                  <FilterOptionItem
                    key={idx}
                    name={race.name}
                    index={race.index}
                    imgsrc={race.imgSrc}
                    onSelectOption={handleRaceFilter}
                    showConfirmationModal={showConfirmationModal}
                    optionSelected={temporaryRace}
                    isRace={true}
                  />
                ))}
              </div>
            )}
          </FormContainerInner>
          <Button
            step='Next'
            text='Next'
            color='#74C0FC'
            icon='fa-solid fa-chevron-right fa-2xl'
            type='submit'
          />
        </FormContainerOuter>

        {showConfirmationModal ? (
          <ChooseRaceModal
            show={showConfirmationModal}
            onHide={handleClose}
            selection={temporaryRace}
            onSelectionConfirm={handleConfirmSelection}
            onSelectionCancel={handleCancelSelection}
            register={register}
          />
        ) : null}
      </form>
    </div>
  );
};

export default ChooseRaceScreen;
