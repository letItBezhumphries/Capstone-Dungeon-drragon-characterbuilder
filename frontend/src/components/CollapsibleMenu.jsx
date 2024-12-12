import { useState, useEffect } from 'react';
import TabsMenu from './tabs/TabsMenu';
import { TabContainer } from 'react-bootstrap';
import MenuContent from './tabs/MenuContent';
import Loader from './Loader';
import { styled } from 'styled-components';

const MenuContainer = styled(TabContainer)`
  width: 100%;
  padding: 0px 0px;
  margin: 0px 0px;
`;

const CollapsibleMenu = ({ tabs, introData, characterLevel, register }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log('tabs:', tabs);

    if (tabs.length) {
      setIsLoading(false);
    }
  }, [tabs]);

  return (
    <MenuContainer defaultActiveKey={tabs[0].label}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TabsMenu
            tabs={tabs}
            introData={introData}
            characterLevel={characterLevel}
            register={register}
          />
          <MenuContent
            tabs={tabs}
            introData={introData}
            characterLevel={characterLevel}
            register={register}
          />
        </>
      )}
    </MenuContainer>
  );
};

export default CollapsibleMenu;
