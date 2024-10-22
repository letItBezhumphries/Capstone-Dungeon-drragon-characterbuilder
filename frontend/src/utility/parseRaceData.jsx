import {
  characterSkills,
  characterAbilities,
  commonLanguages,
  keenSenseSkill,
} from '../data/selectors';

import { getTableSelectOptions } from './parseTableString';

export const parseRaceData = (data) => {
  // includes the selection object
  // console.log('in parseRaceData: -> data passed in', data);
  let raceData;
  if (data.name === 'Human') {
    raceData = parseRaceTraits(data.languages + data.asi_desc, data.name);
  } else if (data.name === 'Half-Elf') {
    raceData = parseRaceTraits(
      data.vision + '\n' + data.asi_desc + '\n' + data.languages + data.traits,
      data.name,
      data.asi
    );
  } else {
    raceData = parseRaceTraits(data.vision + data.traits, data.name);
  }

  // console.log('in parseRaceData -> raceData:', raceData);

  let description = data.description + ' ' + data.desc.split('\n')[1].trim();
  let vision;
  if (data.vision.length > 0) {
    vision = data.vision.split('._** ')[1];
  } else {
    vision = '';
  }

  const finalRaceData = {
    ...raceData,
    desc: description,
    name: data.name,
    imgSrc: data.imgSrc,
    index: data.index,
    age: data.age.split('**_Age._** ')[1],
    asi: data.asi,
    asi_desc: data.asi_desc.split('**_Ability Score Increase._** ')[1],
    languages: data.languages.split('**_Languages._** ')[1],
    size: data.size.split('**_Size._** ')[1],
    size_raw: data.size_raw,
    slug: data.slug,
    speed: data.speed,
    speed_desc: data.speed_desc.split('**_Speed._** ')[1],
    vision: vision,
    subraces: data.subraces,
  };

  // console.log('finalRaceData:', finalRaceData);

  return finalRaceData;
};

const parseRaceTraits = (traitsStr, race, asi) => {
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
              total_choices: 1,
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
      // console.log(
      //   `in parseRaceData - forEach -> this ${race} has a trait - name:`,
      //   name,
      //   '\ndescription:',
      //   description
      // );

      if (!raceTraitNames.includes(name)) {
        raceTraitNames.push(name);
        // if the word 'choice' is found in the description then we need to set up choices to select in the overview page
        // console.log("4. description.split(' '):", description.split(' '));
        // if (description.match(/choice:|choice./g)) {
        //   console.log(
        //     `!!!This ${race} has a trait ${name} that has a choice to make:`,
        //     description
        //   );
        // }
        if (name === 'Languages') {
          // console.log(`This ${race} has a languages trait!`);
          selectedRaceTraits.push({
            name: name,
            desc: description.trim(),
            isChoice: true,
            total_choices: 1,
            choices:
              race === 'Half-Elf'
                ? commonLanguages.filter((lang) => lang !== 'Elvish')
                : commonLanguages,
            selected: [],
          });
        } else if (name === 'Skill Versatility') {
          // console.log(`This ${race} has a Skill Proficiency`);
          selectedRaceTraits.push({
            name: name,
            desc: description.trim(),
            isChoice: true,
            total_choices: 2,
            choices: characterSkills,
            selected: [],
          });
        } else if (name === 'Ability Score Increase' && race === 'Half-Elf') {
          selectedRaceTraits.push({
            name: name,
            desc: description.trim(),
            isChoice: true,
            total_choices: 2,
            choices: characterAbilities.filter(
              (ab) => ab !== asi[0].attributes[0]
            ),
            // choices: characterAbilities.filter(
            //   (ab) => ab !== asi[0].attributes[0]
            // ).map((ability) => {
            //   return {
            //     index: ability,
            //     value: 1
            //   }
            // }),
            selected: [],
          });
        } else if (description.split(' ').indexOf('choice:') !== -1) {
          // console.log(
          //   `!!!This ${race} has a trait ${name} that has a choice to make:`,
          //   description
          // );
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
            total_choices: 1,
            choices: choices
              .split(',')
              .map((ch) => ch.trim())
              .map((c) => c[0].toUpperCase() + c.slice(1)),
            selected: [],
          });
        } else {
          selectedRaceTraits.push({ name: name, desc: description });
        }
      }
    }
  });

  output.traits = selectedRaceTraits;

  // output.traits.push(asi);
  output.traitNames = raceTraitNames;
  return output;
};
