import React from 'react';
import { styled } from 'styled-components';
import { Card, AccordionCollapse, Col } from 'react-bootstrap';
import CollapsibleHeading from './CollapsibleHeading';
import SpellSchoolIcon from './SpellSchoolIcon';
import SpellCard from './SpellCard';
// import '../../../../components/Selector.css';

const HeaderInfo = styled.div`
  max-height: 32px;
  flex: 1 1;
  min-width: 0;
`;

const PrimaryHeading = styled.div`
  font-family: 'Roboto', 'Helvetica', 'sans-serif';
  font-size: 15px;
  font-weight: 600;
  line-height: 1.1;
  color: black;
  width: 100%;
`;

const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

const SecondaryHeading = styled.div`
  color: rgba(18, 24, 28, 0.639);
  display: flex;
  flex-wrap: wrap;
  font-family: Roboto, Helvetica, sans-serif;
  font-size: 11px;
  line-height: 1;
  margin-top: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const Button = styled.div`
  min-width: 43px;
  background-color: #fff;
  border: 1px solid #96bf6b;
  color: #96bf6b;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${'' /* margin-right: 20px; */}
  font-size: 8px;
  min-height: 22px;
  padding: 5px;

  &:hover {
    background-color: #fff;
    box-shadow: inset 0 0 4px 2px #e6e6e6;
    color: #96bf6b;
  }
`;

const CollapsibleBody = styled(AccordionCollapse)`
  background-color: #fff;
  border-left: 1px solid #ece9e9;
  border-right: 1px solid #ece9e9;
  font-size: 14px;
  line-height: 1.7;
  margin: 0 2px;
  padding: 20px 15px 32px;
  position: relative;
  top: -20px;
`;

const SpellSelector = ({
  item,
  register,
  selection,
  characterLevel,
  isSpell,
}) => {
  // console.log('in SpellSelector item:', item);

  return (
    <Card className={'selection-item'}>
      <CollapsibleHeading
        item={item}
        register={register}
        selection={selection}
        isModal={false}
        characterLevel={characterLevel}
        eventKey={item.name}
        isSpell={isSpell}
      >
        <InnerContainer>
          <SpellSchoolIcon school={item.school} />
          <HeaderInfo>
            <PrimaryHeading>{item.name}</PrimaryHeading>
            <SecondaryHeading>
              <span>{item.school}</span>
            </SecondaryHeading>
          </HeaderInfo>
          <Button>LEARN</Button>
        </InnerContainer>
      </CollapsibleHeading>
      <CollapsibleBody eventKey={item.name}>
        <SpellCard
          item={item}
          register={register}
          characterLevel={characterLevel}
          selection={selection}
        />
      </CollapsibleBody>
    </Card>
  );
};

export default SpellSelector;
