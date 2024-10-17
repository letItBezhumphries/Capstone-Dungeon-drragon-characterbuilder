import { Row } from 'react-bootstrap';
import { styled } from 'styled-components';

const ClassFormRow = styled(Row)`
  width: 100%;
  padding: 0px 0px;
  margin: 20px 0 20px 0;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #f1f1f1;
`;

const FormRow = ({ children, ...rest }) => {
  return <ClassFormRow>{children}</ClassFormRow>;
};

export default FormRow;
