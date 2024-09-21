import { characterSkills, musicalInstruments } from '../data/selectors';

/**
 * This just takes the table property and splits and filters away the unwanted parts of the string and
 * returns an array where the first element is the table head cells. the rest of the array are the matching colunms
 *
 * @param {*} tableStr
 * @returns
 */
export const parseClassTable = (tableStr) => {
  // console.log('tableStr:', tableStr);
  let output = [];
  let parsedTable = tableStr
    .split('|')
    .filter((str) => str !== '')
    .map((str) => str.trim());

  let index = parsedTable.indexOf('');

  // console.log('index:', index);

  let tableHead = parsedTable.slice(0, index);
  // push the head cells into output
  output.push(tableHead);

  let columns = tableHead.length;
  let tableBodyCells = parsedTable
    .slice(index)
    .filter((cell) => cell !== '')
    .slice(columns);

  // console.log('tableHead:', tableHead, 'columns:', columns);

  // console.log('tableBody cells:', tableBodyCells);

  let first = 0;
  let last = tableHead.length;
  let lastCellIndex = tableBodyCells.length - 1;
  while (last <= lastCellIndex) {
    // console.log('currentRow', tableBodyCells.slice(first, last));
    let currentRow = tableBodyCells.slice(first, last);
    output.push(currentRow);
    first += columns;
    last += columns;
  }
  //
  // console.log('output:', output);
  return output;
};

export const parseClassDescription = (description) => {
  // console.log('description:', description);
  const output = [];

  let parsedDescription = description.split('###').filter((str) => str !== '');

  parsedDescription.forEach((special) => {
    let parsedCurrent = special
      .split('\n')
      .filter((str) => str !== ' ')
      .filter((str) => str !== '');

    let name;
    // get rid of # if in name
    if (parsedCurrent[0].indexOf('#') !== -1) {
      name = parsedCurrent[0].split('#')[1];
    } else {
      name = parsedCurrent[0].trim();
    }

    let description = parsedCurrent.slice(1).join('');

    output.push({ name: name.trim(), description: description });
  });

  // console.log('parsedDescription:', parsedDescription);
  // console.log('output:', output);
  return output;
};

export const parseClassData = (data) => {
  // console.log('data passed in UTIL', data);

  const output = {};
  let primary_info = getPrimaryInfo(data.slug);

  // output.hit_die = data.hit_dice;
  // output.primary_ability =
  output.name = data.name;
  output.primary_ability = primary_info.primary_ability;
  output.primary_desc = primary_info.primary_desc;
  let table = parseClassTable(data.table);
  // console.log('table:', table);

  let parsedEquipment = parseEquipment(data.equipment);
  output.equipment = parsedEquipment;

  let hit_points = parseHitPoints(data);

  let proficiencies = parseProficiencies(data);

  let spellsKnownIndex = table[0].indexOf('Spells Known');
  let cantripsKnownIndex = table[0].indexOf('Cantrips Known');
  let level1SpellsIndex = table[0].indexOf('1st');
  let level2SpellsIndex = table[0].indexOf('2nd');

  let featuresIdx = table[0].indexOf('Features');

  // check if class has spells known for level1 by storing the index of 'Spells Known' from the header cells
  if (spellsKnownIndex > -1) {
    output.spellsKnown = parseInt(table[1][spellsKnownIndex]);
  }

  // check if class has cantrips known for level1 by storing the indexof 'Cantrips known' from the header cells
  if (cantripsKnownIndex > -1) {
    output.cantripsKnown = parseInt(table[1][cantripsKnownIndex]);
  }

  // check if the class has 1st level spells
  if (level1SpellsIndex > -1) {
    output.level1Spells = parseInt(table[1][level1SpellsIndex]);
  }

  // check if the class has 2nd level spells
  if (level2SpellsIndex > -1) {
    if (table[1][level2SpellsIndex] === '-') {
      output.level2Spells = 0;
    } else {
      output.level2Spells = parseInt(table[1][level2SpellsIndex]);
    }
  }

  let descriptions = parseClassDescription(data.desc);
  // console.log('descriptions:', descriptions);

  let featuresList = getFeaturesList(table.slice(1), featuresIdx);

  let final = mergeFeaturesAndDescriptions(featuresList, descriptions);

  output.features = final;

  output.table = table;

  output.desc = descriptions;

  output.hit_points = hit_points;

  output.proficiencies = proficiencies;
  output.archetypes = data.archetypes;

  // console.log('output:', output);
  return output;
};

export const getFeaturesList = (tableArr, index) => {
  // console.log('tableArr:', tableArr, 'idx:', index);
  let output = [];

  tableArr.forEach((row, idx) => {
    // console.log('row:', row, 'index:', index);
    let currentRowFeatures = row[index];
    // console.log('current Features:', currentRowFeatures);
    if (currentRowFeatures !== '-') {
      let featuresArray = currentRowFeatures.split(',');
      if (featuresArray.length > 1) {
        // iterate over the featuresArray
        featuresArray.forEach((feature) => {
          output.push({ name: feature.trim(), level: idx + 1 });
        });
      } else {
        output.push({ name: featuresArray[0].trim(), level: idx + 1 });
      }
    }
  });

  // console.log('features List:', output);
  return output;
};

export const parseEquipment = (equipment) => {
  // console.log('equipment passed in', equipment);
  let output = {};

  let parsedEquipmentStr = equipment.split('\n');
  // console.log('parsedEquipment:', parsedEquipmentStr);

  output.desc = parsedEquipmentStr[0].trim();
  output.choices = [];
  output.level = 1;

  let choices = parsedEquipmentStr.slice(1).filter((str) => str !== ' ');
  // console.log('parseEquipment - options:', choices);

  // iterate over the options
  choices.forEach((choice) => {
    if (choice.indexOf(',') !== -1) {
      let splitChoices = choice
        .split(',')
        .map((ch) => ch.trim().split('*) ')[1]);

      output.choices.push({ text: choice.trim(), options: [...splitChoices] });
    } else if (choice.split(' or').length === 1) {
      let splitChoices = choice.split('* ').slice(1);
      output.choices.push({ text: choice.trim(), options: [...splitChoices] });
    } else {
      let splitChoices = choice
        .split(' or')
        .map((ch) => ch.trim().split('*) ')[1]);
      output.choices.push({ text: choice.trim(), options: [...splitChoices] });
    }
  });

  // console.log('output:', output);
  return output;
};

export const parseToolsStr = (str, class_type) => {
  const output = {};
  let total_choices;

  if (class_type === 'Bard') {
    total_choices = 3;
    output.total_choices = total_choices;
    output.options = musicalInstruments;
    output.desc = str;
    return output;
  }
};

export const parseSkillsStr = (str, class_type) => {
  const output = {};
  output.desc = str;
  const splitSkillsStr = str.split(' ');
  // console.log('pasreSkillsStr split str:', splitSkillsStr);
  let total_choices;
  if (class_type === 'Bard') {
    total_choices = 3;
    output.total_choices = total_choices;
    output.options = characterSkills;
  } else {
    if (splitSkillsStr[0] === 'Choose') {
      let numberWord = splitSkillsStr[1];
      if (numberWord === 'two') {
        total_choices = 2;
      } else if (numberWord === 'three') {
        total_choices = 3;
      } else if (numberWord === 'four') {
        total_choices = 4;
      }
      let fromIndex = splitSkillsStr.indexOf('from');
      let optionsStr = splitSkillsStr
        .slice(fromIndex + 1)
        .join(' ')
        .replace('Animal,', 'Animal');

      let optionsArr = optionsStr
        .split(',')
        .map((sk) => sk.replace(' and', '').trim());

      output.total_choices = total_choices;
      output.options = optionsArr;
    }
  }
  return output;
};

export const parseProficiencies = (data) => {
  console.log('parseProficiencies - data:', data);
  let output = {};
  output.level = 1;
  output.armor = data.prof_armor;

  output.weapons = data.prof_weapons;

  let tools = parseToolsStr(data.prof_tools, data.name);
  output.tools = tools;

  output.saving_throws = data.prof_saving_throws;

  output.skills = parseSkillsStr(data.prof_skills, data.name);
  return output;
};

export const parseHitPoints = (data) => {
  let output = {};

  output.hit_die = data.hit_dice;
  output.hitpoints_at_1st_level = data.hp_at_1st_level;
  output.hitpoints_at_higher_levels = data.hp_at_higher_levels;
  output.level = 1;
  return output;
};

const getPrimaryInfo = (name) => {
  switch (name) {
    case 'barbarian':
      return {
        primary_ability: 'Strength',
        primary_desc: 'A fierce warrior who can enter a battle rage',
      };
    case 'cleric':
      return {
        primary_ability: 'Wisdom',
        primary_desc:
          'A priestly champion who wields divine magic in service of a higher power',
      };
    case 'druid':
      return {
        primary_ability: 'Wisdom',
        primary_desc:
          'A priest of the Old Faith, wielding the powers of nature and adopting animal forms',
      };
    case 'fighter':
      return {
        primary_ability: 'Strength or Dexterity',
        primary_desc:
          'A master of martial combat, skilled with a variety of weapons and armor',
      };
    case 'monk':
      return {
        primary_ability: 'Dexterity & Wisdom',
        primary_desc:
          'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection',
      };
    case 'paladin':
      return {
        primary_ability: 'Strength & Charisma',
        primary_desc: 'A holy warrior bound to a sacred oath',
      };
    case 'ranger':
      return {
        primary_ability: 'Dexterity & Wisdom',
        primary_desc:
          'A warrior who combats threats on the edges of civilization',
      };
    case 'rogue':
      return {
        primary_ability: 'Dexterity',
        primary_desc:
          'A scoundrel who uses stealth and trickery to overcome obstacles and enemies',
      };
    case 'wizard':
      return {
        primary_ability: 'Intelligence',
        primary_desc:
          'A scholarly magic-user capable of manipulating the structures of reality',
      };
    case 'bard':
      return {
        primary_ability: 'Charisma',
        primary_desc:
          'An inspiring magician whose power echoes the music of creation',
      };
    case 'warlock':
      return {
        primary_ability: 'Charisma',
        primary_desc:
          'A wielder of magic that is derived from a bargain with an extraplanar entity',
      };
    default:
      return {
        primary_ability: 'Charisma',
        primary_desc:
          'A spellcaster who draws on inherent magic from a gift or bloodline',
      };
  }
};

const mergeFeaturesAndDescriptions = (features, descriptions) => {
  let output = [];

  features.forEach((feat) => {
    let name = feat.name;

    let matchingDescription = descriptions.find((d) => d.name === name);

    if (matchingDescription) {
      // console.log('match:', matchingDescription);
      output.push({ ...feat, desc: matchingDescription.description });
    }
  });
  // console.log('output:', output);
  return output;
};
