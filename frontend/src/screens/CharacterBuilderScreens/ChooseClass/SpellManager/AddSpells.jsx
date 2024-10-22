import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Accordion, AccordionCollapse, AccordionItem } from 'react-bootstrap';
import {
  spellAddedToInventory,
  spellRemovedFromInventory,
} from '../../../../slices/characterBuilderSlice';
import { useSelector, useDispatch } from 'react-redux';
import CollapsibleSpellList from './CollapsibleSpellList';
import FilterButtonGroup from './FilterButtonGroup';
import { FilterSelector } from './SelectorHeading';
import SpellSelector from './SpellSelector';

const CharacterSpellsInfo = styled.div``;

const FilterAccordion = styled(Accordion)`
  margin: 10px 0px;
  align-items: center;
  display: flex;
  width: 100%;
  padding: 0px 0px;
  min-height: 22px;
`;

const StyledAccordionItem = styled(AccordionItem)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const StyledCollapse = styled(AccordionCollapse)`
  margin-top: 10px;
`;

const SpellsAccordion = styled(Accordion)`
  margin-top: 20px;
`;

const AddSpells = ({ spells, introData, register, characterLevel }) => {
  const dispatch = useDispatch();
  const {
    cantrips_known,
    spell_slots_level_1,
    spell_slots_level_2,
    level_1_spells,
    level_2_spells,
    cantrips,
    invocations,
  } = useSelector((state) => state.character.spell_casting);
  const [spellsKnownTotal, setSpellsKnownTotal] = useState(
    spell_slots_level_1 + spell_slots_level_2
  );
  const [totalLearnedSpells, setTotalLearnedSpells] = useState(0);
  const [levelFilter, setLevelFilter] = useState(characterLevel);

  console.log(
    'in AddSpells.jsx -> knownSpells:',
    invocations,
    level_1_spells,
    level_2_spells,
    cantrips,
    cantrips_known,
    spell_slots_level_1,
    spell_slots_level_2
  );

  useEffect(() => {
    let learnedSpells = level_1_spells.length + level_2_spells.length;
    setTotalLearnedSpells(learnedSpells);
  }, [
    spell_slots_level_1,
    spell_slots_level_2,
    cantrips,
    level_1_spells,
    level_2_spells,
  ]);

  let spellLevels = spells.map((spell) => {
    return { level: spell.spell_level, text: spell.level };
  });

  const handleFilterClick = (level) => {
    setLevelFilter(level);
  };

  const handleSpellAdd = (spell) => {
    console.log('spell', spell);
    dispatch(spellAddedToInventory({ spell: spell }));
  };

  const handleSpellRemove = (spell) => {
    console.log('Spell to Remove:', spell);
    dispatch(spellRemovedFromInventory({ spell: spell }));
  };

  return (
    <CollapsibleSpellList heading='Add Spells' eventKey='1'>
      <div>
        <CharacterSpellsInfo>
          Cantrips: {cantrips.length}/{cantrips_known}
        </CharacterSpellsInfo>
        <CharacterSpellsInfo>
          Known Spells: {totalLearnedSpells}/{spellsKnownTotal}
        </CharacterSpellsInfo>

        <FilterAccordion defaultActiveKey={'filter'}>
          <StyledAccordionItem eventKey='filter'>
            <FilterSelector
              eventKey={'filter'}
              item={{}}
              isFilter={true}
              isModal={false}
            >
              Filter By Spell Level
            </FilterSelector>
            <StyledCollapse eventKey='filter'>
              <FilterButtonGroup
                spellLevelFilter={levelFilter}
                levels={spellLevels}
                click={handleFilterClick}
              />
            </StyledCollapse>
          </StyledAccordionItem>
        </FilterAccordion>

        {/* Do i need this defaultActiveKey ? */}
        <SpellsAccordion flush>
          {spells.map((spell, idx) => (
            <SpellSelector
              key={idx}
              item={spell}
              register={register}
              selection={introData}
              isSpell={true}
              learnClick={handleSpellAdd}
              removeClick={handleSpellRemove}
            />
          ))}
        </SpellsAccordion>
      </div>
    </CollapsibleSpellList>
  );
};

export default AddSpells;
