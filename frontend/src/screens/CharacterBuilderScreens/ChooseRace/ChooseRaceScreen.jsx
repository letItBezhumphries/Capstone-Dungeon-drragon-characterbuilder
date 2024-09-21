import { Container } from 'react-bootstrap';
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

  const selectedRace = useSelector((state) => state.character.race_filter);

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

  const onNextStepClick = (data) => {
    // need to parse the stringified JSON
    // find the matching trait choice
    console.log('Race submited data:', data);
    const raceData = JSON.parse(data.race);
    console.log('Race submited data:', raceData);
    let targetTraits = [];
    for (let key in data) {
      if (key !== 'name' && key !== 'race') {
        targetTraits.push(key);
      }
    }

    console.log('targetTraits:', targetTraits);
    targetTraits.forEach((tr) => {
      let matchingTraitIndex = raceData.traits.map((t, idx) => {
        if (t.name === tr) {
          raceData.traits[idx].selected = data[tr];
        }
      });
    });
    console.log('after reassignment raceData:', raceData.traits);
    dispatch(setFilteredRace(raceData));
    /* setFormReady ? or */
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
        className={'stepper-container'}
        onSubmit={handleSubmit(onNextStepClick)}
      >
        <Button
          step='Prev'
          text='Prev'
          color='#74C0FC'
          icon='fa-solid fa-chevron-left fa-2xl'
        />
        <Container className='stepper-form-inner' fluid>
          <CharacterName register={register} />
          {showSelectionForm && selectedRace?.name ? (
            <>
              <ConfirmRace
                isModal={false}
                isRace={true}
                selectedRace={selectedRace}
                register={register}
                onFormReady={handleLastSelections}
              />
              <input
                value={JSON.stringify(selectedRace)}
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
        </Container>
        <Button
          step='Next'
          text='Next'
          color='#74C0FC'
          icon='fa-solid fa-chevron-right fa-2xl'
          type='submit'
        />
        {showConfirmationModal ? (
          <ChooseRaceModal
            show={showConfirmationModal}
            onHide={handleClose}
            selection={temporaryRace}
            onSelectionConfirm={handleConfirmSelection}
            onSelectionCancel={handleCancelSelection}
          />
        ) : null}
      </form>
    </div>
  );
};

export default ChooseRaceScreen;
