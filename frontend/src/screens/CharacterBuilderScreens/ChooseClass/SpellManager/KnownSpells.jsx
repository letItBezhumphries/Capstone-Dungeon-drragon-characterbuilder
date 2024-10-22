import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import CollapsibleSpellList from './CollapsibleSpellList';

const CharacterSpellsInfo = styled.div``;

const KnownSpells = ({ spells, introData, register, characterLevel }) => {
  const {
    spell_slots_level_1,
    spell_slots_level_2,
    spells_known,
    cantrips_known,
    level_1_spells,
    level_2_spells,
    cantrips,
  } = useSelector((state) => state.character.spell_casting);

  console.log(
    'in KnownSpells.jsx -> knownSpells:',
    spell_slots_level_1,
    level_1_spells,
    spell_slots_level_2,
    level_2_spells,
    spells_known,
    cantrips_known,
    cantrips
  );

  let heading = `Known Spells (${
    level_1_spells.length + level_2_spells.length
  })`;

  const defaultContent = `You currently have no known spells. Learn spells from your list of available spells below.`;

  return (
    <CollapsibleSpellList heading={heading} eventKey='0'>
      <div>{defaultContent}</div>
    </CollapsibleSpellList>
  );
};

export default KnownSpells;
