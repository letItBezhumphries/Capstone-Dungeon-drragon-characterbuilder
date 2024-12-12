import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Card, AccordionCollapse } from 'react-bootstrap';
import {
  SpellAddedToast,
  SpellRemovedToast,
  SpellSlotNotAvailableToast,
} from '../../../../components/Toast';
import { useSelector } from 'react-redux';
import SelectorHeading from './SelectorHeading';
import SpellSchoolIcon from './SpellSchoolIcon';
import SpellCard from './SpellCard';

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

export const DisabledButton = styled.div`
  background-color: #f9f9f9;
  border-color: #eaeaea;
  color: #aaa;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  min-height: 22px;
  padding: 5px;
  min-width: 43px;
`;

export const RemoveButton = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 12px;

  & i {
    color: red;
    margin-right: 10px;
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
  learnClick,
  removeClick,
}) => {
  const {
    level_1_spells,
    level_2_spells,
    cantrips,
    cantrips_known,
    invocations,
    spell_slots_level_1,
    spell_slots_level_2,
  } = useSelector((state) => state.character.spell_casting);

  const [isDisabled, setIsDisabled] = useState(false);
  const [hasBeenSelected, setHasBeenSelected] = useState(false);

  useEffect(() => {
    let spellList = [
      ...level_1_spells,
      ...level_2_spells,
      ...cantrips,
      ...invocations,
    ].map((spell) => {
      return spell.name;
    });

    if (spellList.indexOf(item.name) !== -1) {
      setHasBeenSelected(true);
    }
  }, [level_1_spells, level_2_spells, cantrips, invocations]);

  useEffect(() => {
    if (item.level_int === 0 && cantrips.length >= cantrips_known) {
      setIsDisabled(true);
    }
    if (item.level_int === 1 && level_1_spells.length >= spell_slots_level_1) {
      setIsDisabled(true);
    }
    if (item.level_int === 2 && level_2_spells.length >= spell_slots_level_2) {
      setIsDisabled(true);
    }
  }, [
    spell_slots_level_1,
    spell_slots_level_2,
    cantrips_known,
    level_1_spells,
    level_2_spells,
    cantrips,
  ]);

  // console.log('in SpellSelector item:', item);
  const onLearnBtnClick = () => {
    let spellLevel = item.level_int;

    console.log('spellLevel in SpellSelector.jsx ->', spellLevel);

    if (
      (spellLevel === 0 && cantrips.length === cantrips_known) ||
      (spellLevel === 1 && level_1_spells.length === spell_slots_level_1) ||
      (spellLevel === 2 && level_2_spells.length === spell_slots_level_2)
    ) {
      SpellSlotNotAvailableToast(item.name, selection.name);
    } else {
      learnClick(item);
      handleSelection(hasBeenSelected);
      SpellAddedToast(item.name, selection.name);
    }
  };

  const onRemoveBtnClick = () => {
    removeClick(item);
    handleSelection(hasBeenSelected);
    SpellRemovedToast(item.name, selection.name);
  };

  const handleSelection = (bool) => {
    setHasBeenSelected(!bool);
  };

  return (
    <Card className={'selection-item'}>
      <SelectorHeading
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
              <span>
                {item.level} &#8226; {item.school}
              </span>
            </SecondaryHeading>
          </HeaderInfo>

          {hasBeenSelected ? (
            <RemoveButton onClick={onRemoveBtnClick}>
              <i className='fa-solid fa-x'></i>
              Remove
            </RemoveButton>
          ) : isDisabled ? (
            <DisabledButton>LEARN</DisabledButton>
          ) : (
            <Button onClick={onLearnBtnClick}>LEARN</Button>
          )}
        </InnerContainer>
      </SelectorHeading>
      <CollapsibleBody eventKey={item.name}>
        <SpellCard
          spell={item}
          register={register}
          characterLevel={characterLevel}
          selection={selection}
          hasBeenSelected={hasBeenSelected}
          handleSelection={handleSelection}
          isDisabled={isDisabled}
          learnClick={learnClick}
          removeClick={removeClick}
        />
      </CollapsibleBody>
    </Card>
  );
};

export default SpellSelector;
