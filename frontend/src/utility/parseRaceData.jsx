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

export const getTableSelectOptions = (tableStr) => {
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

export const parseRaceData = (data) => {
  // includes the selection object
  // console.log('in parseRaceData: -> data passed in', data);
  let raceData;
  if (data.name === 'Human') {
    raceData = parseRaceTraits(data.languages + data.asi_desc, data.name);
  } else {
    raceData = parseRaceTraits(data.vision + data.traits, data.name);
  }

  let description = data.description + ' ' + data.desc.split('\n')[1].trim();

  const finalRaceData = {
    ...raceData,
    desc: description,
    name: data.name,
    imgSrc: data.imgSrc,
    index: data.index,
    age: data.age,
    asi: data.asi,
    asi_desc: data.asi_desc,
    languages: data.languages,
    size: data.size,
    size_raw: data.size_raw,
    slug: data.slug,
    speed: data.speed,
    speed_desc: data.speed_desc,
    vision: data.vision,
  };

  // console.log('finalRaceData:', finalRaceData);

  return finalRaceData;
};

const parseRaceTraits = (traitsStr, race) => {
  const output = {};
  const raceTraitNames = [];
  const selectedRaceTraits = [];

  // console.log(
  //   '1. in parseRaceTraits function - passed in traitsStr',
  //   traitsStr,
  //   'race:',
  //   race
  // );

  let parsedTraitsArray = traitsStr
    .split(/\*\*\_/)
    .filter((str) => str.length > 0);

  // console.log('2. parsedTraits:', parsedTraitsArray);

  // iterate over the  parsedTraitsArray
  parsedTraitsArray.forEach((str, index) => {
    if (race === 'Dragonborn') {
      if (index > 0) {
        if (index === 1) {
          let name = str.split('._**')[0].trim();
          let description = str.split('._**')[1].trim();
          let table = parsedTraitsArray[0].split('**')[2];

          let parsedTableStr = getTableSelectOptions(table);
          // console.log('tableOptions:', parsedTableStr);

          if (!raceTraitNames.includes(name)) {
            raceTraitNames.push(name);
            selectedRaceTraits.push({
              name: name,
              desc: description,
              table: table,
              isChoice: true,
              choices: parsedTableStr.tableOptions,
              headCells: parsedTableStr.headCells,
              tableCells: parsedTableStr.tableCells,
            });
          }
          // its greater than 1
        } else {
          let name = str.split('._**')[0];
          let description = str.split('._**')[1];
          if (!raceTraitNames.includes(name)) {
            raceTraitNames.push(name);
            selectedRaceTraits.push({ name: name, desc: description });
          }
        }
      }
    } else {
      // otherwise its not a dragonborn and you can push the name and trait obj
      let name = str.split('._**')[0];
      let description = str.split('._**')[1];
      if (!raceTraitNames.includes(name)) {
        raceTraitNames.push(name);
        // if the word 'choice' is found in the description then we need to set up choices to select in the overview page
        // console.log("4. description.split(' '):", description.split(' '));
        if (description.split(' ').indexOf('choice:') !== -1) {
          let choices = description
            .split(':')[1]
            .split(/,|or/g)
            .filter((str) => str !== ' ')
            .join(',');
          // console.log('description with choice:', choices.split(','));
          selectedRaceTraits.push({
            name: name,
            desc: description.trim(),
            isChoice: true,
            choices: choices.split(',').map((ch) => ch.trim()),
          });
        } else {
          selectedRaceTraits.push({ name: name, desc: description });
        }
      }
    }
  });

  output.traits = selectedRaceTraits;
  output.traitNames = raceTraitNames;
  return output;
};
