import { Container } from 'react-bootstrap';

const FormContainer = ({ children, ...rest }) => {
  return (
    <Container className='form-container' fluid>
      {children}
    </Container>
  );
};

export default FormContainer;
