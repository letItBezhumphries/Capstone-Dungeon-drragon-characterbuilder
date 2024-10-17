import { styled } from 'styled-components';
import { Accordion } from 'react-bootstrap';
import CollapsibleSpellList from './CollapsibleSpellList';
import SpellSelector from './SpellSelector';

const CharacterSpellsInfo = styled.div``;

const FilterContainer = styled.div``;

const SpellsAccordion = styled(Accordion)`
  margin-top: 20px;
`;

const AddSpells = ({ spells, introData, register, characterLevel }) => {
  console.log('in AddSpells.jsx -> spells:', spells);

  let levelFilters = spells.map((spell) => {
    return spell.spell_level;
  });

  console.log('levelFilters:', levelFilters);

  return (
    <CollapsibleSpellList heading='Add Spells' eventKey='0'>
      <div>
        <CharacterSpellsInfo>
          {/* NEED to not hardcode this and use the useSelector to bring down the state spellcasting object for character */}
          Cantrips: 0/2
        </CharacterSpellsInfo>
        <CharacterSpellsInfo>Known Spells 0/4</CharacterSpellsInfo>
        <FilterContainer>Spell Level Filter list goes here</FilterContainer>
        {/* Do i need this defaultActiveKey ? */}
        <SpellsAccordion flush>
          {spells.map((spell, idx) => (
            <SpellSelector
              key={idx}
              item={spell}
              register={register}
              selection={introData}
              isSpell={true}
            />
          ))}
        </SpellsAccordion>
      </div>
    </CollapsibleSpellList>
  );
};

export default AddSpells;
