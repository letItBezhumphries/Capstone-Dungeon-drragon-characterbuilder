import { Col } from 'react-bootstrap';
import { styled } from 'styled-components';

const ClassFormColumn = styled(Col)`
  margin-bottom: 10px;
`;

const FormColumn = ({ children, ...rest }) => {
  return <ClassFormColumn>{children}</ClassFormColumn>;
};

export default FormColumn;
