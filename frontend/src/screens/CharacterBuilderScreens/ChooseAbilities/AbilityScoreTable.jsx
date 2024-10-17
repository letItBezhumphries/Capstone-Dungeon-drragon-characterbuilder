import React from 'react';
import { styled } from 'styled-components';

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
`;

const TableLabel = styled.div`
  border: 1px solid #edeae8;
  display: table-cell;
  font-size: 14px;
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
  width: 70px;
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
  return (
    <Table>
      <AbilityScoreHeader>{ability}</AbilityScoreHeader>
      <TableBody>
        <TableRow>
          <TableLabel>Total Score</TableLabel>
          <TableValue>--</TableValue>
        </TableRow>
        <TableRow>
          <TableLabel>Modifier</TableLabel>
          <TableValue>--</TableValue>
        </TableRow>
        <TableRow>
          <TableLabel>Base Score</TableLabel>
          <TableValue>--</TableValue>
        </TableRow>
        <TableRow>
          <TableLabel>Racial Bonus</TableLabel>
          <TableValue>--</TableValue>
        </TableRow>
        <TableRow>
          <TableLabel>Ability Improvements</TableLabel>
          <TableValue>--</TableValue>
        </TableRow>
        <TableRow>
          <TableLabel>Misc Bonus</TableLabel>
          <TableValue>--</TableValue>
        </TableRow>
        <TableRow>
          <TableLabel>Set Score</TableLabel>
          <TableValue>--</TableValue>
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
