import React, { useState } from 'react';
import Tab from './Tab';
import { styled } from 'styled-components';
import { Row, Container } from 'react-bootstrap';

const TabMenuRow = styled(Row)`
  width: 100%;
  background-color: pink;
  display: flex;
  justify-content: flex-start;
  margin: 10px 0px;
  padding: 10px;
`;

const TabList = styled.ol`
  padding: 0 0;
  margin: 0 0;
  display: flex;
  list-style-type: none;
  justify-content: space-evenly;
`;

const TabContent = styled(Container)`
  width: 100%;
  margin: 0 0;
  padding: 0 0;
  display: flex;
  flex-direction: column;
`;

const Tabs = (props) => {
  const { children } = props;
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <TabMenuRow>
        <TabList>
          {children.map((child) => {
            const { label } = child.props;
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </TabList>
      </TabMenuRow>
      <TabContent>
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </TabContent>
    </>
  );
};

export default Tabs;
