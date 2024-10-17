import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
import {
  FormContainerInner,
  FormContainerOuter,
} from '../../../components/FormContainer';
import CharacterName from '../CharacterName';
import { Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateFormData } from '../../../slices/formSlice';
import Button from '../../../components/Button';
import './CharacterBuilder.css';

const CharacterBuilder = () => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onNextClickSubmit = (data) => {
    console.log('submited', data);
    dispatch(updateFormData(data));
    navigate('/character/chrace');
  };

  return (
    <div id='character'>
      <CharacterBuilderStepMenu step0 />
      <form
        className='character-stepper-form'
        onSubmit={handleSubmit(onNextClickSubmit)}
      >
        <FormContainerOuter>
          <Button
            step='Prev'
            text='Prev'
            color='#74C0FC'
            icon='fa-solid fa-chevron-left fa-2xl'
          />
          <FormContainerInner>
            <CharacterName register={register} />
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

export default CharacterBuilder;
