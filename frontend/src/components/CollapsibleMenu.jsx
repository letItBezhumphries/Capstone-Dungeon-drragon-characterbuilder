import { useState, useEffect } from 'react';

import Tabs from './tabs/Tabs';
import ClassFeatures from '../screens/CharacterBuilderScreens/ChooseClass/ClassFeatures';
import SpellManager from '../screens/CharacterBuilderScreens/ChooseClass/SpellManager/SpellManager';
import Loader from './Loader';
import { styled } from 'styled-components';

const MenuContainer = styled.div`
  width: 100%;
  padding: 0px 0px;
  margin: 0px 0px;
`;

const CollapsibleMenu = ({
  tabs,
  introData,
  characterLevel,
  register,
  isLoading,
}) => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   console.log('tabs:', tabs);

  //   if (tabs.length) {
  //     setIsLoading(false);
  //   }
  // }, [tabs]);

  return (
    <MenuContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <Tabs>
          <div label='Class Features'>
            <ClassFeatures
              introData={introData}
              items={tabs[0].items}
              register={register}
              characterLevel={characterLevel}
            />
          </div>
          <div label='Spells'>
            <SpellManager
              introData={introData}
              register={register}
              spells={tabs[1].items}
            />
          </div>
        </Tabs>
      )}
    </MenuContainer>
  );
};

export default CollapsibleMenu;
