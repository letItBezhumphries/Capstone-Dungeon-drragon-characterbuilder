import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { styled } from 'styled-components';

const TabItem = styled(Nav.Item)`
  display: flex;
  background-color: yellow;
  margin-right: 20px;
`;

const TabButton = styled(Nav.Link)`
  align-items: center;
  background: none;
  border: none;
  border-bottom: 0.188rem solid transparent;
  display: flex;
  font-family: 'Roboto Condensed', 'Roboto', 'Helvetica', 'sans-serif';
  font-size: 0.875rem;
  font-weight: 700;
  gap: 0.25rem;
  padding: 0.188rem 0;
  text-transform: uppercase;
  border-color: #96bf6b;
`;

const MenuItem = (props) => {
  const { label, items, introData, characterLevel, register } = props;

  console.log('in MenuItem -> label:', label, 'items:', items);

  return (
    <TabItem>
      <TabButton eventKey={label}>
        <span>{label}</span>
        <i className='fa-solid fa-chevron-down'></i>
      </TabButton>
    </TabItem>
  );
};

export default MenuItem;
