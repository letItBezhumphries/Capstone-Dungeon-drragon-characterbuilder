import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Table = styled.div`
  width: calc(33.33333% - 10px);
`;

const AbilityScoreHeader = styled.div`
  align-items: center;
  background-color: #242528;
  display: flex;
  padding: 10px;
  color: white;
`;

const TableBody = styled.div`
  border: 1px solid #edeae8;
  border-collapse: collapse;
  display: table;
  width: 100%;
`;

const TableRow = styled.div`
  display: table-row;
  width: 100%;
`;

const TableLabel = styled.div`
  border: 1px solid #edeae8;
  display: table-cell;
  font-size: 15px;
  color: rgb(0, 0, 0);
  line-height: 1;
  padding: 10px;
  vertical-align: middle;
`;

const TableValue = styled.div`
  background-color: #faf8f7;
  border-bottom: 1px solid #edeae8;
  border-left: 2px solid #d0cac5;
  display: flex;
  font-size: 24px;
  padding: 5px 10px;
  text-align: center;
  width: 100%;
  justify-content: center;
`;

const SubTableRow = styled.div`
  border-bottom: 0.0625rem solid #edeae8;
  display: table-row-group;
`;

const SubRow = styled(TableRow)`
  font-size: 0.8125rem;
`;

const SubRowLabel = styled(TableLabel)`
  border: none;
  color: #75838b;
  padding-left: 1.125rem;
`;

const SubRowValue = styled(TableValue)`
  font-size: 0.8125rem;
  color: #75838b;
  padding-left: 1.125rem;
`;

const AbilityOverrideTable = styled.div`
  display: table;
  margin: 5px 0;
  width: 100%;
`;

const OverrideRow = styled.div`
  display: table-row;
`;

const OverrideLabel = styled.div`
  display: table-cell;
  font-size: 14px;
  padding: 10px;
  vertical-align: middle;
  flex-wrap: wrap;
  width: 60%;
`;

const OverrideValue = styled.div`
  display: table-cell;
  padding: 5px 0;
  width: 70px;
`;

const OverrideInput = styled.input`
  font-size: 24px;
  padding: 5px 0;
  text-align: center;
  width: 100%;
`;

const AbilityScoreTable = ({ ability }) => {
  const race = useSelector((state) => state.character.race);
  const abilityScores = useSelector((state) => state.character.ability_scores);
  let key = ability.toLowerCase();
  const currentAbility = abilityScores[key];

  const [bonus, setBonus] = useState(currentAbility.bonus);
  const [baseScore, setBaseScore] = useState(currentAbility.base_score);
  const [total, setTotal] = useState(currentAbility.total_score);
  const [modifier, setModifier] = useState(currentAbility.modifier);
  const [stackingBonus, setStackingBonus] = useState(
    currentAbility.stacking_bonus
  );
  const [setScore, setSetScore] = useState(currentAbility.set_score);

  // console.log(
  //   'in AbilityScoreTable.jsx -> character race:',
  //   race,
  //   '\nkey:',
  //   key,
  //   'currentAbility:',
  //   currentAbility
  // );

  useEffect(() => {
    if (currentAbility.bonus > 0) {
      setBonus(currentAbility.bonus);
    }
    if (currentAbility.base_score >= 0) {
      setBaseScore(currentAbility.base_score);
      setTotal(currentAbility.total_score);
      setModifier(currentAbility.modifier);
    }
  }, [currentAbility.base_score]);
  // find a object in asi that matches the ability prop

  return (
    <Table>
      <AbilityScoreHeader>{ability}</AbilityScoreHeader>
      <TableBody>
        <TableRow>
          <TableLabel>Total Score</TableLabel>
          <TableValue>{total}</TableValue>
        </TableRow>
        <TableRow>
          <TableLabel>Modifier</TableLabel>
          <TableValue>
            {modifier >= 0 ? '+' : null}
            {modifier}
          </TableValue>
        </TableRow>
        <TableRow>
          <TableLabel>Base Score</TableLabel>
          <TableValue>{baseScore}</TableValue>
        </TableRow>
        <TableRow>
          <TableLabel>Bonus</TableLabel>
          <TableValue>
            {bonus >= 0 ? '+' : null}
            {bonus}
          </TableValue>
        </TableRow>
        {bonus > 0 ? (
          <SubTableRow>
            <SubRow>
              <SubRowLabel>
                <span>{race}</span>
              </SubRowLabel>
              <SubRowValue>
                (
                <span>
                  {bonus >= 0 ? '+' : null}
                  {bonus}
                </span>
                )
              </SubRowValue>
            </SubRow>
          </SubTableRow>
        ) : null}
        <TableRow>
          <TableLabel>Stacking Bonus</TableLabel>
          <TableValue>{stackingBonus}</TableValue>
        </TableRow>
        <TableRow>
          <TableLabel>Set Score</TableLabel>
          <TableValue>{setScore}</TableValue>
        </TableRow>
      </TableBody>
      <AbilityOverrideTable>
        <OverrideRow>
          <OverrideLabel>Other Modifier</OverrideLabel>
          <OverrideValue>
            <OverrideInput type='number' placeholder='--'></OverrideInput>
          </OverrideValue>
        </OverrideRow>
        <OverrideRow>
          <OverrideLabel>Override Score</OverrideLabel>
          <OverrideValue>
            <OverrideInput type='number' placeholder='--'></OverrideInput>
          </OverrideValue>
        </OverrideRow>
      </AbilityOverrideTable>
    </Table>
  );
};

export default AbilityScoreTable;
