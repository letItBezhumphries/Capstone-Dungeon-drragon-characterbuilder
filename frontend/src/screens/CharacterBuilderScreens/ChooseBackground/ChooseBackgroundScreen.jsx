import { useState } from 'react';
import { BaseFormContainer } from '../../../components/FormContainer';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FormContainerInner,
  FormContainerOuter,
} from '../../../components/FormContainer';
import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
import Button from '../../../components/Button';
import { MainHeading } from '../../../components/Heading';
import CharacterName from '../CharacterName';
import { InputContainer } from '../../../components/InputContainer';
import {
  SelectCharacterAlignment,
  SelectCharacterLifeStyle,
} from '../../../components/SelectCharacterDetails';
import { updateFormData } from '../../../slices/formSlice';

const ChooseBackgroundScreen = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form.formData);

  const onPrevStepClick = () => {
    navigate('/character/chabilities');
  };

  const onNextStepClick = (data) => {
    console.log('captured inputs from the form:', data);

    dispatch(updateFormData());
    // navigate('/character/chfinal');
  };

  return (
    <div id='chbackground'>
      <CharacterBuilderStepMenu
        step0
        step1
        step2
        step3
        step4
      ></CharacterBuilderStepMenu>
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
            <MainHeading>
              Choose Alignment & Physical Characteristics
            </MainHeading>
            <div>
              <SelectCharacterAlignment
                register={register}
                label='Alignment'
                name='alignment'
              />
              <InputContainer register={register} label='Faith' name='faith' />
              <SelectCharacterLifeStyle
                register={register}
                label={'Lifestyle'}
                name='lifestyle'
              />
              <InputContainer register={register} label='Hair' name='hair' />
              <InputContainer register={register} label='Skin' name='skin' />
              <InputContainer register={register} label='Eyes' name='eyes' />
              <InputContainer
                register={register}
                label='Height'
                name='height'
              />
              <InputContainer
                register={register}
                label='Weight (lbs)'
                name='weight'
              />
              <InputContainer
                register={register}
                label='Age (years)'
                name='age'
              />
              <InputContainer
                register={register}
                label='Gender'
                name='gender'
              />
            </div>
          </FormContainerInner>
          <Button
            step='Next'
            text='Next'
            color='#74C0FC'
            icon='fa-solid fa-chevron-right fa-2xl'
            type='submit'
          />
        </FormContainerOuter>
      </form>
    </div>
  );
};

export default ChooseBackgroundScreen;
