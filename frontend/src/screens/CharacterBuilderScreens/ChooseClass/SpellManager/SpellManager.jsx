import { styled } from 'styled-components';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AddSpells from './AddSpells';
import SpellBook from './SpellBook';
import PreparedSpells from './PreparedSpells';
import KnownSpells from './KnownSpells';

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const SpellListAccordion = styled(Accordion)`
  width: 100%;
  padding: 0px 0px;
  margin: 0px 0px;
`;

const SpellsManager = ({ introData, register, spells, characterLevel }) => {
  const spellInventory = useSelector((state) => state.character.spell_casting);

  // console.log(
  //   'in SpellsManager -> spellInventory:',
  //   spellInventory,
  //   'characterLevel:',
  //   characterLevel
  // );

  let preparedSpellsList = ['Cleric', 'Paladin', 'Druid', 'Wizard'];

  return (
    <Container>
      <SpellListAccordion>
        {preparedSpellsList.indexOf(introData.name) === -1 ? (
          <KnownSpells />
        ) : (
          <PreparedSpells />
        )}
        {introData.name === 'Wizard' ? <SpellBook /> : null}
        <AddSpells
          spells={spells}
          register={register}
          introData={introData}
          characterLevel={characterLevel}
        />
      </SpellListAccordion>
      <input
        value={JSON.stringify(spellInventory)}
        name='spellcasting'
        {...register('spellcasting')}
        style={{ display: 'none' }}
      ></input>
    </Container>
  );
};

export default SpellsManager;
