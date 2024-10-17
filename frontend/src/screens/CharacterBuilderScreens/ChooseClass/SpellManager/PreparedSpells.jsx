import CollapsibleSpellList from './CollapsibleSpellList';
import { useSelector } from 'react-redux';

// Cleric Paladin Druid Wizard
const PreparedSpells = () => {
  const knownSpells = useSelector(
    (state) => state.character.spellcasting.known_spells
  );
  let heading;
  if (!knownSpells.length) {
    heading = 'Known Spells (0)';
  } else {
    heading = `Known Spells (${knownSpells.length})`;
  }

  return <CollapsibleSpellList heading={heading} list={knownSpells} />;
};

export default PreparedSpells;
