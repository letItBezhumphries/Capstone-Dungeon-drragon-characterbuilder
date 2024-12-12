import React from 'react';
import { styled } from 'styled-components';
import { Nav } from 'react-bootstrap';
import * as pallete from '../../constants/variables';
import { LinkContainer } from 'react-router-bootstrap';

const CharacterBuilderNav = styled(Nav)`
  background-color: rgba(0, 0, 0, 0.8);
  font-family: 'Roboto Condensed', 'sans-serif';
  margin: 0 0 20px 0;
  padding: 10px 0;
  width: 100%;
  min-height: 80px;
  display: flex;
  color: whitesmoke;
  justify-content: center;
  align-items: center;

  & span {
    font-weight: 700;
    font-size: 30px;
    margin-right: 30px;
  }
`;

const MenuLink = styled(Nav.Link)`
  font-family: 'Roboto Condensed', 'sans-serif';
  font-weight: 700;
  color: white;

  &:after {
    border-bottom: 3px solid transparent;
    content: '';
    display: block;
    margin-top: 2px;
  }

  &:hover {
    color: white;
  }

  &:hover:after {
    border-color: #1c9aef;
  }

  ${'' /*  if there was a space between '&' and '.active' this didn't work */}
  &.active:after {
    border-color: #1c9aef;
  }
`;

const CharacterBuilderStepMenu = ({ step0, step1, step2, step3, step4 }) => {
  return (
    <CharacterBuilderNav defaultActiveKey='home'>
      <span>Character Builder</span>
      <Nav.Item>
        {step0 ? (
          <LinkContainer to='/character'>
            <MenuLink>
              <i className='fa-solid fa-gear'></i> HOME
            </MenuLink>
          </LinkContainer>
        ) : (
          <MenuLink disabled>
            <i className='fa-solid fa-gear'></i> HOME
          </MenuLink>
        )}
      </Nav.Item>
      <Nav.Item>
        {step0 ? (
          <LinkContainer to='/character/chrace'>
            <MenuLink eventKey='race'>1. RACE</MenuLink>
          </LinkContainer>
        ) : (
          <MenuLink disabled>RACE</MenuLink>
        )}
      </Nav.Item>
      <Nav.Item>
        {step0 ? (
          <LinkContainer to='/character/chclass'>
            <MenuLink eventKey='class'>2. CLASS</MenuLink>
          </LinkContainer>
        ) : (
          <MenuLink disabled>2. CLASS</MenuLink>
        )}
      </Nav.Item>
      <Nav.Item>
        {/*  REMEMEMBER NEED TO CHANGE THIS BACK TO PROPER STEPS NEEDED TO HIT ROUTE */}
        {step0 ? (
          <LinkContainer to='/character/chabilities'>
            <MenuLink eventKey='abilities'>3. ABILITES</MenuLink>
          </LinkContainer>
        ) : (
          <MenuLink disabled>3. ABILITIES</MenuLink>
        )}
      </Nav.Item>
      <Nav.Item>
        {/*  REMEMEMBER NEED TO CHANGE THIS BACK TO PROPER STEPS NEEDED TO HIT ROUTE */}
        {step0 ? (
          <LinkContainer to='/character/chbackground'>
            <MenuLink eventKey='background'>4. BACKGROUND</MenuLink>
          </LinkContainer>
        ) : (
          <MenuLink disabled>4. BACKGROUND</MenuLink>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/chfinal'>
            <MenuLink eventKey='final'>
              <i className='fa-solid fa-address-card'></i>
            </MenuLink>
          </LinkContainer>
        ) : (
          <LinkContainer to='/chfinal'>
            <MenuLink eventKey={'final'}>
              <i className='fa-solid fa-address-card'></i>
            </MenuLink>
          </LinkContainer>
        )}
      </Nav.Item>
    </CharacterBuilderNav>
  );
};

export default CharacterBuilderStepMenu;
