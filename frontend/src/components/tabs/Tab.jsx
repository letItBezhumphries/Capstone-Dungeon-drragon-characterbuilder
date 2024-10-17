import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';

const TabItem = styled.li`
  display: flex;
  background-color: yellow;
  margin-right: 20px;
`;

const TabButton = styled.div`
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

const Tab = (props) => {
  const { activeTab, label, onClick } = props;
  const [className, setClassName] = useState('tab-list-item');

  useEffect(() => {
    if (activeTab === label) {
      setClassName((prev) => (prev += ' tab-list-active'));
    } else {
      setClassName('tab-list-item');
    }
  }, [activeTab, label]);

  const onTabClick = () => {
    onClick(label);
  };

  return (
    <>
      <TabItem className={className} onClick={onTabClick}>
        <TabButton>
          <span>{label}</span>
          <i className='fa-solid fa-chevron-down'></i>
        </TabButton>
      </TabItem>
    </>
  );
};

export default Tab;
