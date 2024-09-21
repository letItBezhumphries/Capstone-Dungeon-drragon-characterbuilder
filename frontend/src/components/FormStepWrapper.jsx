import { Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateFormData } from '../slices/formSlice';
import CharacterName from '../screens/CharacterBuilderScreens/CharacterName';
import './FormStepWrapper.css';

// MIGHT NEED ARRAY OF STEP LOCATIONS TO BE PASSED AS PROPS?
function FormStepWrapper({ children, ...rest }) {
  console.log('the rest passed:', rest);
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onNextClickSubmit = (data) => {
    console.log('submited', data);
    dispatch(updateFormData(data));
    navigate('/character/chrace');
  };

  return (
    <form
      {...rest}
      className={'stepper-container'}
      onSubmit={handleSubmit(onNextClickSubmit)}
    >
      <div className='step-btn-container prev-step'>
        <button className='prev-btn'>
          Prev
          <i
            className='fa-solid fa-chevron-left fa-2xl'
            style={{ color: '#74C0FC' }}
          ></i>
        </button>
      </div>
      <Container className='stepper-form-inner' fluid>
        <CharacterName register={register} />
        {children}
      </Container>
      <div className='step-btn-container next-step'>
        <button className='next-btn' type='submit'>
          Next
          <i
            className='fa-solid fa-chevron-right fa-2xl'
            style={{ color: '#74C0FC' }}
          ></i>
        </button>
      </div>
    </form>
  );
}

export default FormStepWrapper;
