import { styled } from 'styled-components';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AddSpells from './AddSpells';

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
  const knownSpells = useSelector(
    (state) => state.character.spellcasting.known_spells
  );
  console.log('in SpellsManager -> introData:', introData, 'spells:', spells);
  return (
    <Container>
      <SpellListAccordion>
        <AddSpells
          spells={spells}
          register={register}
          introData={introData}
          characterLevel={characterLevel}
        />
      </SpellListAccordion>
    </Container>
  );
};

export default SpellsManager;
