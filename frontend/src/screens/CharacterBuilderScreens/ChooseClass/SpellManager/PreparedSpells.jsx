import CollapsibleSpellList from './CollapsibleSpellList';
import { useSelector } from 'react-redux';

// Cleric Paladin Druid Wizard
const PreparedSpells = ({ selection, characterLevel }) => {
  const spellcasting = useSelector((state) => state.character.spell_casting);
  let knownSpells =
    spellcasting.level_1_spells.length + spellcasting.level_2_spells.length;
  let heading = `Prepared Spells (${knownSpells})`;
  const defaultContent = `You currently have no prepared spells. Learn spells from your list of available spells below.`;

  return (
    <CollapsibleSpellList heading={heading} eventKey='0'>
      <div>Prepared Spells</div>
    </CollapsibleSpellList>
  );
};

export default PreparedSpells;
