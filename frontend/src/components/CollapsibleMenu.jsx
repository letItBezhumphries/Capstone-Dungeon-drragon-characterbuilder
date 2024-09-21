import { useState, useEffect } from 'react';
import { Row, Col, Tab } from 'react-bootstrap';
import { styled } from 'styled-components';
import CollapsibleList from './CollapsibleList';

const TabMenuRow = styled(Row)`
  width: 100%;
  background-color: pink;
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
`;

const TabButtonContainer = styled(Col)`
  display: flex;
  background-color: yellow;
`;

const TabButton = styled.button`
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

const CollapsibleMenu = ({
  tabs,
  introData,
  characterLevel,
  isModal,
  isRace,
}) => {
  const [activeKey, setActiveKey] = useState(false);
  // const [characterLevel, setCharacterLevel] = useState(1);
  const [filteredItems, setFilteredItems] = useState();

  useEffect(() => {
    let items = introData.features.filter(
      (feature) => feature.level <= characterLevel
    );

    console.log(
      'in CollapsibleMenu useEffect-> introData:',
      introData,
      '\ncharacterLevel:',
      characterLevel,
      '\nitems:',
      items
    );

    setFilteredItems([introData.hit_points, introData.proficiencies, ...items]);
  }, [characterLevel]);

  return (
    <Tab.Container defaultActiveKey={tabs[0].title}>
      <TabMenuRow>
        {tabs.map((tb, i) => (
          <TabButtonContainer key={i}>
            <TabButton eventKey={tb.title}>
              <span>{tb.title}</span>
              <i className='fa-solid fa-chevron-down'></i>
            </TabButton>
          </TabButtonContainer>
        ))}
      </TabMenuRow>
      <Row fluid>
        <Tab.Content>
          {tabs.map((t, i) => (
            <Tab.Pane key={i} eventKey={t.title}>
              {/* {t.items.map((item, idx) => )} */}
              <CollapsibleList items={[]} isModal={isModal} isRace={isRace} />
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Row>
    </Tab.Container>
  );
};

export default CollapsibleMenu;
