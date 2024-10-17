import { Col } from 'react-bootstrap';
import { styled } from 'styled-components';

const ClassFormColumn = styled(Col)`
  margin: 0px 0px 10px 0px;
  padding: 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormColumn = ({ children, ...rest }) => {
  return <ClassFormColumn>{children}</ClassFormColumn>;
};

export default FormColumn;
