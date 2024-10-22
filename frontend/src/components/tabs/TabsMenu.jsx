import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import MenuItem from './MenuItem';
import { styled } from 'styled-components';
import { Nav, Container } from 'react-bootstrap';

const TabMenuRow = styled(Nav)`
  width: 100%;
  background-color: pink;
  display: flex;
  justify-content: flex-start;
  margin: 10px 0px;
  padding: 10px;
`;

const TabList = styled.ul`
  padding: 0 0;
  margin: 0 0;
  display: flex;
  list-style-type: none;
  justify-content: space-evenly;
`;

const TabsMenu = ({ tabs, introData, characterLevel, register }) => {
  console.log('TabsMenu -> items:', tabs[0].items);
  return (
    <>
      <TabMenuRow>
        <TabList>
          {tabs.length > 1 ? (
            <>
              <MenuItem
                items={tabs[0].items}
                label={'Class Features'}
                introData={introData}
                characterLevel={characterLevel}
                register={register}
              />
              <MenuItem
                items={tabs[1].items}
                label={'Spells'}
                introData={introData}
                characterLevel={characterLevel}
                register={register}
              />
            </>
          ) : (
            <MenuItem
              items={tabs[0].items}
              label={'Class Features'}
              introData={introData}
              characterLevel={characterLevel}
              register={register}
            />
          )}
        </TabList>
      </TabMenuRow>
    </>
  );
};

export default TabsMenu;
