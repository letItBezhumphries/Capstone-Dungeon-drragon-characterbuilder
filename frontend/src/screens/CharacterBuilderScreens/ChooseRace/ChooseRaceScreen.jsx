import React from 'react';
import { useState, useEffect } from 'react';
import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
import FilterOptionItem from '../../../components/FilterOptionItem';
import CharacterNameForm from '../CharacterNameForm';
import PageContainer from '../../../components/PageContainer';
import StepFormControlWrapper from '../StepFormWrapper';
import ChooseRaceModal from '../../../components/ChooseRaceModal';

import { characterRaces } from '../../../data/selectors';
import './ChooseRaceScreen.css';

const ChooseRaceScreen = () => {
  const [temporaryRace, setTemporaryRace] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedRace, setSelectedRace] = useState({});

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
        which includes the final race manager options
        otherwise we should only see the filtering options for selecting the race
       */}
      {selectedRace?.name && !showConfirmationModal ? (
        <StepFormControlWrapper>
          <PageContainer
            isModal={false}
            isRace={true}
            selectedRace={selectedRace}
            // selection={selectedRace}
            // traits={selectedRace.traits}
            // // HHRERE is THE TRAITLIST
            // traitNames={selectedRace.traitList}
            // description={selectedRace.desc}
          />
        </StepFormControlWrapper>
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
