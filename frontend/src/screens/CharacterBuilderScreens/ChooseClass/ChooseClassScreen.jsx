import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../../slices/formSlice';
import { useNavigate } from 'react-router-dom';
import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
import ChooseClassModal from './ChooseClassModal';
// import ConfirmationModal from '../../../components/ConfirmationModal';
import FilterOptionItem from '../../../components/FilterOptionItem';
import CharacterNameForm from '../CharacterNameForm';
import PageContainer from '../../../components/PageContainer';
import StepFormControlWrapper from '../StepFormWrapper';
import ChooseClassCard from './ChooseClassCard';
import { setFilteredClass } from '../../../slices/characterBuilderSlice';

// import { useGetClassDataQuery } from '../../../services/classes';

import { characterClasses } from '../../../data/selectors';

const ChooseClassScreen = ({}) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form.formData);

  console.log('in ChooseClassScreen -> formData:', formData);

  const [temporaryClass, setTemporaryClass] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});

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
    console.log('in handleConfirmSelection:', selection);
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

  const onSubmit = (data) => {
    dispatch(updateFormData(data));

    //  navigate('/character/chabilities');
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <StepFormControlWrapper>
            <input
              value={JSON.stringify(selectedRace)}
              name='race'
              {...register('race')}
              style={{ display: 'none' }}
            ></input>
            <ChooseClassCard
              isModal={false}
              isRace={false}
              selectedClass={selectedClass}
              selection={temporaryClass}
            />
          </StepFormControlWrapper>
        </form>
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

// <StepFormControlWrapper>
// <PageContainer
//   isModal={false}
//   isRace={false}
//   selection={selectedClass}
// />
// </StepFormControlWrapper>
