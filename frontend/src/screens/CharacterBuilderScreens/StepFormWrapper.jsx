import { Container, Row } from 'react-bootstrap';
import './StepFormWrapper.css';

function StepFormControlWrapper({ children, className, ...rest }) {
  // add the className prop to the classNames
  // const finalClassNames = classNames('step-form-controls-wrapper', className);

  return (
    <Container {...rest} className={'stepper-container'}>
      {/* <Row className='justify-content-md-center'> */}
      <div className='step-iconbox prev-box'>
        <button className='prev-btn'>
          Prev
          <i
            className='fa-solid fa-chevron-left fa-2xl'
            style={{ color: '#74C0FC' }}
          ></i>
        </button>
      </div>
      {children}
      <div className='step-next next-box'>
        <button className='next-btn' type='submit'>
          Next
          <i
            className='fa-solid fa-chevron-right fa-2xl'
            style={{ color: '#74C0FC' }}
          ></i>
        </button>
      </div>
      {/* </Row> */}
    </Container>
  );
}

export default StepFormControlWrapper;
