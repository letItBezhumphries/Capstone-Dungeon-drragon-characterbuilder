import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateFormData } from '../../../slices/formSlice';
import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
import FilterOptionItem from '../../../components/FilterOptionItem';
import CharacterNameForm from '../CharacterNameForm';
import PageContainer from '../../../components/PageContainer';
import StepFormControlWrapper from '../StepFormWrapper';
import ChooseRaceModal from './ChooseRaceModal';

import { characterRaces } from '../../../data/selectors';
import './ChooseRaceScreen.css';

const ChooseRaceScreen = () => {
  const { register, handleSubmit } = useForm();
  const formData = useSelector((state) => state.form.formData);
  const [temporaryRace, setTemporaryRace] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedRace, setSelectedRace] = useState({});
  const dispatch = useDispatch();

  console.log('state:', formData);

  // closes the modal
  const handleClose = () => setShowConfirmationModal(false);

  /* sets up the ConfirmationModal to open with the race selected to view as a search filter of sorts */
  const handleRaceFilter = (race) => {
    console.log('in handleRaceFilter -> race:', race);
    let raceObj = characterRaces.find((r) => r.index === race);
    setTemporaryRace({
      name: raceObj.name,
      index: raceObj.index,
      imgSrc: raceObj.imgSrc,
    });
    setShowConfirmationModal(true);
  };

  const handleConfirmSelection = (selection) => {
    // send the selection to the store selection for race
    // console.log('in handleConfirmSelection:', selection);
    // set the selectedRace
    console.log('in handle FINAL Selection:', selection);

    setSelectedRace({
      name: selection.name,
      index: selection.index,
      imgSrc: selection.imgSrc,
      ...selection,
    });
    // close the Confirmation Model
    handleClose();
  };

  const onSubmit = (data) => {
    dispatch(updateFormData(data));
    // useNavigate('/character/chclass');
  };

  const handleCancelSelection = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div id='chrace'>
      <CharacterBuilderStepMenu step0 step1></CharacterBuilderStepMenu>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CharacterNameForm />
      </div>

      {/* if there is a selectedRace.name property and we're not showing the confirmation modal then Return the PageContainer
        which includes the SHOWS THE FINAL RACE FORM
       */}
      {selectedRace?.name && !showConfirmationModal ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <StepFormControlWrapper>
            <input
              value={JSON.stringify(selectedRace)}
              name='race'
              {...register('race')}
              style={{ display: 'none' }}
            ></input>
            <PageContainer
              isModal={false}
              isRace={true}
              selectedRace={selectedRace}
            />
          </StepFormControlWrapper>
        </form>
      ) : (
        <StepFormControlWrapper>
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
        </StepFormControlWrapper>
      )}

      {showConfirmationModal ? (
        <ChooseRaceModal
          show={showConfirmationModal}
          onHide={handleClose}
          isRace={true}
          selection={temporaryRace}
          onSelectionConfirm={handleConfirmSelection}
          onSelectionCancel={handleCancelSelection}
        />
      ) : null}
    </div>
  );
};

export default ChooseRaceScreen;
