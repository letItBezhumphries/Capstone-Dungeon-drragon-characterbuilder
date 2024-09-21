const getTableSelectOptions = (tableStr) => {
  let tableHeadCells = getTableHeadVals(tableStr);
  // console.log('in utils/ tableHead', tableHeadCells);

  let tableCells = getTableCellValues(tableStr);
  // console.log('in utils/ tableCells:', tableCells);

  const output = [];

  let fixedTitle = tableHeadCells[0];

  // console.log('in utils/ fixedTitle:', fixedTitle);

  // iterate over the tableCells
  tableCells.forEach((cell, idx) => {
    // grab the first index of each cell
    output.push(cell[0] + ' ' + fixedTitle);
  });

  return {
    headCells: tableHeadCells,
    tableCells: tableCells,
    tableOptions: output,
  };
};

const getTableHeadVals = (tableStr) => {
  let splitTable = tableStr
    .split('|')
    .filter((str) => str.indexOf('-') === -1)
    .filter((str) => str.indexOf('\n') === -1);

  let tableHeadCells = splitTable.slice(0, 3).map((str) => str.trim());
  return tableHeadCells;
};

const getTableCellValues = (tableStr) => {
  const output = [];
  let splitTable = tableStr
    .split('|')
    .filter((str) => str.indexOf('-') === -1)
    .filter((str) => str.indexOf('\n') === -1);

  let tableCells = splitTable.slice(3).map((str) => str.trim());
  let lastCellIndex = tableCells.length - 1;

  let first = 0;
  let last = 3;
  while (last <= lastCellIndex) {
    let currentRow = tableCells.slice(first, last);
    output.push(currentRow);
    first += 3;
    last += 3;
  }

  return output;
};

export { getTableSelectOptions, getTableCellValues, getTableHeadVals };
