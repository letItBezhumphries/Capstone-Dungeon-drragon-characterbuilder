import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FormContainerInner,
  FormContainerOuter,
} from '../../../components/FormContainer';
import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
import CharacterName from '../CharacterName';
import Button from '../../../components/Button';
import AbilitiesForm from './AbilitiesForm';
import { updateFormData } from '../../../slices/formSlice';

const ChooseAbilitiesScreen = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form.formData);
  const character = useSelector((state) => state.character);

  console.log(
    'in ChooseAbilitiesScreen -> formData:',
    formData,
    'character:',
    character
  );

  const onPrevStepClick = () => {
    navigate('/character/chclass');
  };

  const onNextStepClick = (data) => {
    console.log('captured inputs from the Abilities form:', data);

    navigate('/character/chbackground');
  };

  return (
    <div id='chabilities'>
      <CharacterBuilderStepMenu
        step0
        step1
        step2
        step3
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
            <AbilitiesForm register={register} />
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

export default ChooseAbilitiesScreen;
