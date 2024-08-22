import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './CharacterBuilderStepMenu.css';

const CharacterBuilderStepMenu = ({
  step0,
  step1,
  step2,
  step3,
  step4,
  step5,
}) => {
  return (
    <Nav className='character-builder-nav'>
      <span>Character Builder</span>
      <Nav.Item>
        {step0 ? (
          <LinkContainer to='/character'>
            <Nav.Link className='character-builder-menulink'>
              <i className='fa-solid fa-gear'></i> HOME
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i className='fa-solid fa-gear'></i> HOME
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step0 ? (
          <LinkContainer to='/character/chrace'>
            <Nav.Link className='character-builder-menulink'>1. RACE</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>RACE</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step0 ? (
          <LinkContainer to='/chclass'>
            <Nav.Link className='character-builder-menulink'>2. CLASS</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>2. CLASS</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/chability'>
            <Nav.Link className='character-builder-menulink'>
              3. ABILITES
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>3. ABILITIES</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/chequip'>
            <Nav.Link className='character-builder-menulink'>
              4. EQUIPMENT
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>4. EQUIPMENT</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step5 ? (
          <LinkContainer to='/chfinal'>
            <Nav.Link className='character-builder-menulink'>
              <i className='fa-solid fa-address-card'></i>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to='/chfinal'>
            <Nav.Link className='character-builder-menulink'>
              <i className='fa-solid fa-address-card'></i>
            </Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CharacterBuilderStepMenu;
