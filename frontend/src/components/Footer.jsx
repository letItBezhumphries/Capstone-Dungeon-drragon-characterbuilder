import React from 'react';
import { styled } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

const StyledFooter = styled.div`
  background-color: purple;
  ${'' /* position: relative; */}
  bottom: 0;
  ${'' /* margin-top: 100px; */}
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container style={{ backgroundColor: 'purple', color: 'white' }}>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; MERN Dungeon Builder
          </Col>
        </Row>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
