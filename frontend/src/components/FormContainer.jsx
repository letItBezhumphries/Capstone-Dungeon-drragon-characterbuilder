import { Container, Row, Col } from 'react-bootstrap';
import { styled } from 'styled-components';

const FormStepperInner = styled(Container)`
  width: 80%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f1f1f1;
  padding: 25px;
`;

const FormStepperOuter = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  padding: 0px 0px;
  margin: 0px 0px 40px 0px;
  ${'' /* background-color: green; */}
`;

const ModalContainer = styled(Container)`
  width: 100%;
  padding: 0px 0px;
  margin: 0px 0px;
`;

const FormContainer = ({ children, ...rest }) => {
  return <ModalContainer>{children}</ModalContainer>;
};

export const BaseFormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export const FormContainerInner = ({ children, ...rest }) => {
  return <FormStepperInner fluid>{children}</FormStepperInner>;
};

export const FormContainerOuter = ({ children, ...rest }) => {
  return <FormStepperOuter fluid>{children}</FormStepperOuter>;
};

export default FormContainer;
