import { styled } from 'styled-components';
import { characterAbilities } from '../../../data/selectors';
import { useSelector } from 'react-redux';
import AbilityScoreTable from './AbilityScoreTable';

const ScoreCalculationsSection = styled.div``;

const ScoreCalculationsHeader = styled.div`
  font-family: 'Roboto', Helvetica, sans-serif;
  font-size: 24px;
  line-height: 1.2;
  margin-bottom: 15px;
  margin-top: 15px;
  text-align: left;
`;

const AbilityScoreCalculationList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const AbilityScoreCalculations = () => {
  const abilityScores = useSelector((state) => state.character.abilityScores);

  const icons = [
    '<i class="fa-solid fa-dumbbell"></i>',
    '<i class="fa-solid fa-shield"></i>',
    '<i class="fa-solid fa-scroll"></i>',
    '<i class="fa-solid fa-hat-wizard"></i>',
  ];

  console.log('AbilityScoreCalculations.jsx -> abilityScores:', abilityScores);

  return (
    <ScoreCalculationsSection>
      <ScoreCalculationsHeader>Score Calculations</ScoreCalculationsHeader>
      <p>
        Calculations, including the base scores you set above and any modifiers,
        are found below. You can also override any automatic calculations or
        modify them under each ability summary.
      </p>
      <AbilityScoreCalculationList>
        {characterAbilities.map((ability, idx) => (
          <AbilityScoreTable key={idx} ability={ability} />
        ))}
      </AbilityScoreCalculationList>
    </ScoreCalculationsSection>
  );
};

export default AbilityScoreCalculations;
