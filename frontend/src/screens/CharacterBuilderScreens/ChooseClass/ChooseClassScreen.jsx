import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FormContainerInner,
  FormContainerOuter,
} from '../../../components/FormContainer';
import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
import Button from '../../../components/Button';
import ChooseClassModal from './ChooseClassModal';
import FilterOptionItem from '../../../components/FilterOptionItem';
import CharacterName from '../CharacterName';
import ConfirmClass from './ConfirmClass';
import { updateFormData } from '../../../slices/formSlice';
import {
  setFilteredClass,
  clearFilteredClass,
} from '../../../slices/characterBuilderSlice';
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
  const [showSelectionForm, setShowSelectionForm] = useState(false);

  // closes Modal
  const handleClose = () => setShowConfirmationModal(false);

  /* manages state that reveals the class modal and sets the class filter state */
  const handleClassFilterSelect = (classType) => {
    // console.log('in handleClassFilterSelect -> class:', classType);
    let classObj = characterClasses.find((c) => c.index === classType);
    setTemporaryClass({
      name: classObj.name,
      index: classObj.index,
      imgSrc: classObj.imgSrc,
    });
    setShowConfirmationModal(true);
  };

  /* event handler that is fired in the class confirm modal when user clicks the confirm button 
    this handler accepts a selection argument which it pass to the setFilteredClass action from character slice
    to set the confirmed class_type for the character, and then closes the modal
  */
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
    setShowSelectionForm(true);
    // close the Confirmation Model
    handleClose();
  };

  const handleCancelSelection = () => {
    dispatch(clearFilteredClass());
    setShowConfirmationModal(false);
  };

  const onPrevStepClick = (data) => {
    navigate('/character/chrace');
  };

  const onNextStepClick = (data) => {
    console.log('captured inputs from the form:', data);
    const classData = JSON.parse(data.class_type);
    console.log(
      'parsed class data submited data:',
      classData,
      'selectedClass:',
      selectedClass
    );

    let targetCache = {};

    for (let key in data) {
      if (key !== 'name' && key !== 'class_type') {
        if (
          key[key.length - 1] === '0' ||
          key[key.length - 1] === '1' ||
          key[key.length - 1] === '2' ||
          key[key.length - 1] === '3'
        ) {
          let newKey = key.split('-')[0];
          if (!targetCache[newKey]) {
            targetCache[newKey] = [data[key]];
          } else {
            targetCache[newKey].push(data[key]);
          }
        } else {
          targetCache[key] = data[key];
        }
      }
    }

    console.log('targetCache:', targetCache);

    for (let key in targetCache) {
      classData.features.map((feat, idx) => {
        if (feat.name === key) {
          classData.features[idx].selected = targetCache[key];
        }
      });
    }

    // targetFeatures.forEach((tr) => {
    //   let matchingTraitIndex = classData.features.map((t, idx) => {
    //     if (t.name === tr) {
    //       classData.traits[idx].selected = data[tr];
    //     }
    //   });
    // });
    console.log('after reassignment classData:', classData.features);
    dispatch(setFilteredClass(classData));

    dispatch(updateFormData({ class_type: classData }));
    navigate('/character/chabilities');
  };

  return (
    <div id='chclass'>
      <CharacterBuilderStepMenu step0 step1 step2></CharacterBuilderStepMenu>
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
            {!showConfirmationModal && selectedClass?.name ? (
              <>
                <ConfirmClass
                  isModal={false}
                  isRace={false}
                  selectedClass={selectedClass}
                  selection={temporaryClass}
                  register={register}
                />
                {/* <input
                  value={JSON.stringify(selectedClass)}
                  name='class'
                  {...register('class_type')}
                  style={{ display: 'none' }}
                ></input> */}
              </>
            ) : (
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
          <ChooseClassModal
            show={showConfirmationModal}
            onHide={handleClose}
            isRace={false}
            selection={temporaryClass}
            register={register}
            onSelectionConfirm={handleConfirmSelection}
            onSelectionCancel={handleCancelSelection}
          />
        ) : null}
      </form>
    </div>
  );
};

export default ChooseClassScreen;
