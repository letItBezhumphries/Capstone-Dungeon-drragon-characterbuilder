import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
import ChooseClassModal from '../../../components/ChooseClassModal';
// import ConfirmationModal from '../../../components/ConfirmationModal';
import FilterOptionItem from '../../../components/FilterOptionItem';
import CharacterNameForm from '../CharacterNameForm';
import PageContainer from '../../../components/PageContainer';
import StepFormControlWrapper from '../StepFormWrapper';
import { setFilteredClass } from '../../../slices/characterBuilderSlice';

// import { useGetClassDataQuery } from '../../../services/classes';

import { characterClasses } from '../../../data/selectors';

const ChooseClassScreen = ({ classes }) => {
  const [temporaryClass, setTemporaryClass] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});
  const dispatch = useDispatch();

  const handleClose = () => setShowConfirmationModal(false);

  /* sets up the ConfirmationModal to open with the race selected to view as a search filter of sorts */
  const handleClassFilterSelect = (classType) => {
    console.log('in handleClassFilterSelect -> class:', classType);
    let classObj = characterClasses.find((c) => c.index === classType);
    setTemporaryClass({
      name: classObj.name,
      index: classObj.index,
      imgSrc: classObj.imgSrc,
    });
    setShowConfirmationModal(true);
  };

  const handleConfirmSelection = (selection) => {
    // send the selection to the store selection for class
    // console.log('in handleConfirmSelection:', selection);
    // set the selectedRace
    setSelectedClass({
      name: selection.name,
      index: selection.index,
      imgSrc: selection.imgSrc,
      ...selection,
    });

    dispatch(
      setFilteredClass({
        name: selection.name,
        index: selection.index,
        imgSrc: selection.imgSrc,
        ...selection,
      })
    );
    // close the Confirmation Model
    handleClose();
  };

  const handleCancelSelection = () => {
    setShowConfirmationModal(false);
  };

  // const { data, error, isLoading } = useGetClassDataQuery('bard');

  // if (!isLoading) {
  //   // parseClassTable(data.table);
  //   let selection = parseClassData(data);
  //   console.log('selection will look like:', selection);
  // }

  // console.log('in home - data:', data);

  return (
    <div id='chclass'>
      <CharacterBuilderStepMenu step0 step1 step2></CharacterBuilderStepMenu>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CharacterNameForm />
      </div>
      {selectedClass?.name && !showConfirmationModal ? (
        <StepFormControlWrapper>
          <PageContainer
            isModal={false}
            isRace={false}
            selection={selectedClass}
          />
        </StepFormControlWrapper>
      ) : (
        <StepFormControlWrapper>
          <div className='filtering-container'>
            {characterClasses.map((cls, idx) => (
              <FilterOptionItem
                key={cls.index}
                name={cls.name}
                index={cls.index}
                imgsrc={cls.imgSrc}
                showConfirmationModal={showConfirmationModal}
                onSelectOption={handleClassFilterSelect}
                optionSelected={temporaryClass}
                isRace={false}
              />
            ))}
          </div>
        </StepFormControlWrapper>
      )}

      {showConfirmationModal ? (
        <ChooseClassModal
          show={showConfirmationModal}
          onHide={handleClose}
          isRace={false}
          // isClass={true}
          selection={temporaryClass}
          onSelectionConfirm={handleConfirmSelection}
          onSelectionCancel={handleCancelSelection}
        />
      ) : null}
    </div>
  );
};

export default ChooseClassScreen;
