import ClassFeatures from '../../screens/CharacterBuilderScreens/ChooseClass/ClassFeatures';
import SpellsManager from '../../screens/CharacterBuilderScreens/ChooseClass/SpellManager/SpellManager';
import { TabContent, TabPane } from 'react-bootstrap';
import { styled } from 'styled-components';

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0px 0px;
  margin: 0px 0px;
`;

const StyledTabContent = styled(TabContent)`
  width: 100%;
  padding: 0px 0px;
  margin: 0px 0px;
`;

const StyledTabPane = styled(TabPane)`
  width: 100%;
  padding: 0px 0px;
  margin: 0px 0px;
`;

const MenuContent = ({ tabs, introData, register, characterLevel }) => {
  return (
    <ContentWrapper>
      <StyledTabContent>
        <StyledTabPane eventKey={tabs[0].label}>
          <ClassFeatures
            items={tabs[0].items}
            introData={introData}
            register={register}
            characterLevel={characterLevel}
          />
        </StyledTabPane>
        {tabs.length === 2 ? (
          <StyledTabPane eventKey={tabs[1].label}>
            <SpellsManager
              spells={tabs[1].items}
              introData={introData}
              register={register}
              characterLevel={characterLevel}
            />
          </StyledTabPane>
        ) : null}
      </StyledTabContent>
    </ContentWrapper>
  );
};

export default MenuContent;
