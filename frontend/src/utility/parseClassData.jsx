import {
  characterSkills,
  thievesSkills,
  musicalInstruments,
  characterAbilities,
  characterFeats,
  terrainTypes,
  enemyTypes,
} from '../data/selectors';

/**
 * This just takes the table property and splits and filters away the unwanted parts of the string and
 * returns an array where the first element is the table head cells. the rest of the array are the matching colunms
 *
 * @param {*} tableStr
 * @returns
 */
export const parseClassTable = (tableStr) => {
  let output = [];
  let parsedTable = tableStr
    .split('|')
    .filter((str) => str !== '')
    .map((str) => str.trim());
  let index = parsedTable.indexOf('');
  let tableHead = parsedTable.slice(0, index);
  // push the head cells into output
  output.push(tableHead);

  let columns = tableHead.length;
  let tableBodyCells = parsedTable
    .slice(index)
    .filter((cell) => cell !== '')
    .slice(columns);

  let first = 0;
  let last = tableHead.length;
  let lastCellIndex = tableBodyCells.length;
  while (last <= lastCellIndex) {
    let currentRow = tableBodyCells.slice(first, last);
    output.push(currentRow);
    first += columns;
    last += columns;
  }
  //
  return output;
};

export const parseClassDescription = (description) => {
  // console.log('description:', description);
  const output = [];
  // const featureRegex = /#{3}/g;

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

  let descriptions = parseClassDescription(data.desc);
  // console.log('descriptions:', descriptions);

  let primary_info = getPrimaryInfo(data.slug, data, descriptions);

  // output.hit_die = data.hit_dice;
  // output.primary_ability =
  output.name = data.name;
  output.primary_ability = primary_info.primary_ability;
  output.primary_desc = primary_info.primary_desc;
  // output.features_with_choices = primary_info.features_with_choices;
  let table = parseClassTable(data.table);
  // console.log('table:', table);

  let parsedEquipment = parseEquipment(data.equipment);
  output.equipment = parsedEquipment;

  let hit_points = parseHitPoints(data);

  let proficiencies = parseProficiencies(data);

  const categories = table[0];

  // console.log('categories for characters class:', categories);

  if (categories.indexOf('Spells Known') !== -1) {
    output.spellcasting = {
      name: 'Spellcasting',
    };
    output.spells = {};
  }

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

  let featuresList = getFeaturesList(table.slice(1), featuresIdx);
  // console.log('parseClassData - featuresList:', featuresList);

  let final = mergeFeaturesAndDescriptions(
    featuresList,
    descriptions,
    data.name,
    primary_info,
    proficiencies
  );

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
      // console.log('current Table row featuresArray:', featuresArray);
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
  output.name = 'Equipment';

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
    output.choices = musicalInstruments;
    output.desc = str;
    output.name = 'Tool Proficiency';
    output.subname = 'Musical Instruments';
    output.selected = [];
    return output;
  } else {
    output.total_choices = 0;
    output.choices = [];
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
    output.choices = characterSkills;
    output.selected = [];
    output.name = 'skills';
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
      output.choices = optionsArr;
      output.selected = [];
    }
  }
  return output;
};

export const parseProficiencies = (data) => {
  // console.log('parseProficiencies - data:', data);
  let output = {};
  output.name = 'Proficiencies';
  output.level = 1;
  output.armor = data.prof_armor;

  output.weapons = data.prof_weapons;

  let tools = parseToolsStr(data.prof_tools, data.name);
  output.tools = tools;

  output.saving_throws = data.prof_saving_throws;

  let skills = parseSkillsStr(data.prof_skills, data.name);
  output.skills = skills;

  // console.log('ParseProficiencies - tools:', tools, '\nskills:', skills);

  output.total_choices = tools.total_choices + skills.total_choices;
  output.choices = [{ ...skills, name: 'skills' }];

  if (tools.total_choices > 0) {
    output.choices.push(tools);
  }

  return output;
};

export const parseHitPoints = (data) => {
  let output = {};
  output.name = 'Hit Points';
  output.hit_die = data.hit_dice;
  output.hitpoints_at_1st_level = data.hp_at_1st_level;
  output.hitpoints_at_higher_levels = data.hp_at_higher_levels;
  output.level = 1;
  return output;
};

const modifyWarlockEldrichDescriptions = (descriptions) => {
  const output = [];

  descriptions.forEach((desc) => {
    let splitDescription = desc.description.split(' ');

    let prerequisite = splitDescription[0];
    // console.log('Warlock description:', splitDescription);
    let level = splitDescription[1].match(/[1-9]|[1-9]{2}/g);
    let requirement = splitDescription.slice(1).join(' ').split('*');
    let pactMatch = splitDescription
      .slice(1)
      .join(' ')
      .match(/Pact of the/gi);
    let spellMatch = splitDescription
      .slice(1)
      .join(' ')
      .match(/You can cast/gi);

    if (prerequisite === '*Prerequisite:') {
      let requirementObj;
      if (pactMatch === null) {
        if (level !== null) {
          requirementObj = { type: 'spell', name: requirement[2] };
        } else {
          requirementObj = {
            type: requirement[0].split(/feature/gi)[0],
          };
        }
      } else {
        if (level !== null) {
          requirementObj = {
            type: requirement[0].split(',')[1],
          };
        } else {
          requirementObj = {
            type: requirement[0],
          };
        }
      }

      if (level === null) {
        output.push({
          ...desc,
          level: 3,
          requirement: requirementObj,
        });
      } else {
        if (level.length < 2) {
          output.push({
            ...desc,
            level: parseInt(level[0]),
            requirement: requirementObj,
          });
        } else {
          output.push({
            ...desc,
            level: parseInt(level.join('')),
            requirement: requirementObj,
          });
        }
      }
    } else if (prerequisite === '*Prerequisite:*') {
      let requirement = splitDescription.slice(1).join(' ').split('*');

      output.push({
        ...desc,
        level: 2,
        requirement: {
          spell: requirement[0].trim(),
          type: requirement[1].trim(),
        },
      });
    } else {
      if (spellMatch !== null) {
        let requiredSpell = desc.description.split('*')[1];
        output.push({
          ...desc,
          level: 2,
          requirement: { type: 'spell', name: requiredSpell },
        });
      } else {
        output.push({
          ...desc,
          level: 2,
        });
      }
    }
  });

  // console.log('output for Warlock:', output);
  return output;
};

const modifyArchetypesArray = (archetypes) => {
  return archetypes.map((arch) => arch.name);
};

const getPrimaryInfo = (name, data, descriptions, skills) => {
  // console.log('data:', data);
  switch (name) {
    case 'barbarian':
      return {
        primary_ability: 'Strength',
        primary_desc: 'A fierce warrior who can enter a battle rage',
        features_with_choices: [
          {
            name: 'Primal Path',
            total_choices: 1,
            choices: modifyArchetypesArray(data.archetypes),
            selected: [],
          },
        ],
        spellcasting_ability: data.spellcasting_ability || null,
        subtypes_name: data.subtypes_name || null,
      };
    case 'cleric':
      return {
        primary_ability: 'Wisdom',
        primary_desc:
          'A priestly champion who wields divine magic in service of a higher power',
        features_with_choices: [
          {
            name: 'Divine Domain',
            total_choices: 1,
            choices: modifyArchetypesArray(data.archetypes),
            selected: [],
          },
        ],
        spellcasting_ability: data.spellcasting_ability || null,
        subtypes_name: data.subtypes_name || null,
      };
    case 'druid':
      return {
        primary_ability: 'Wisdom',
        primary_desc:
          'A priest of the Old Faith, wielding the powers of nature and adopting animal forms',
        features_with_choices: [
          {
            name: 'Druid Circle',
            total_choices: 1,
            choices: modifyArchetypesArray(data.archetypes),
            selected: [],
          },
        ],
        spellcasting_ability: data.spellcasting_ability || null,
        subtypes_name: data.subtypes_name || null,
      };
    case 'fighter':
      return {
        primary_ability: 'Strength or Dexterity',
        primary_desc:
          'A master of martial combat, skilled with a variety of weapons and armor',
        features_with_choices: [
          {
            name: 'Fighting Style',
            total_choices: 1,
            choices: descriptions.slice(1, 7),
            selected: [],
          },
          {
            name: 'Martial Archetype',
            total_choices: 1,
            choices: modifyArchetypesArray(data.archetypes),
            selected: [],
          },
        ],
        spellcasting_ability: data.spellcasting_ability || null,
        subtypes_name: data.subtypes_name || null,
      };
    case 'monk':
      return {
        primary_ability: 'Dexterity & Wisdom',
        primary_desc:
          'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection',
        features_with_choices: [
          {
            name: 'Monastic Tradition',
            total_choices: 1,
            choices: modifyArchetypesArray(data.archetypes),
            selected: [],
          },
        ],
        spellcasting_ability: data.spellcasting_ability || null,
        subtypes_name: data.subtypes_name || null,
      };
    case 'paladin':
      return {
        primary_ability: 'Strength & Charisma',
        primary_desc: 'A holy warrior bound to a sacred oath',
        features_with_choices: [
          {
            name: 'Fighting Style',
            total_choices: 1,
            choices: descriptions.slice(3, 7),
            selected: [],
          },
          {
            name: 'Sacred Oath',
            total_choices: 1,
            choices: modifyArchetypesArray(data.archetypes),
            selected: [],
          },
        ],
        spellcasting_ability: data.spellcasting_ability || null,
        subtypes_name: data.subtypes_name || null,
      };
    case 'ranger':
      return {
        primary_ability: 'Dexterity & Wisdom',
        primary_desc:
          'A warrior who combats threats on the edges of civilization',
        features_with_choices: [
          { name: 'Favored Enemy', total_choices: 3, choices: enemyTypes },
          {
            name: 'Fighting Style',
            total_choices: 1,
            choices: descriptions.slice(3, 7),
            selected: [],
          },
          {
            name: 'Natural Explorer',
            total_choices: 3,
            choices: terrainTypes,
            selected: [],
          },
          {
            name: 'Ranger Archetype',
            total_choices: 1,
            choices: modifyArchetypesArray(data.archetypes),
            selected: [],
          },
        ],
        spellcasting_ability: data.spellcasting_ability || null,
        subtypes_name: data.subtypes_name || null,
      };
    case 'rogue':
      return {
        primary_ability: 'Dexterity',
        primary_desc:
          'A scoundrel who uses stealth and trickery to overcome obstacles and enemies',
        features_with_choices: [
          {
            name: 'Expertise',
            total_choices: 2,
            choices: thievesSkills,
            subtype: 'skills',
            selected: [],
          },
          {
            name: 'Roguish Archetype',
            total_choices: 1,
            choices: modifyArchetypesArray(data.archetypes),
            selected: [],
          },
        ],
        spellcasting_ability: data.spellcasting_ability || null,
        subtypes_name: data.subtypes_name || null,
      };
    case 'wizard':
      return {
        primary_ability: 'Intelligence',
        primary_desc:
          'A scholarly magic-user capable of manipulating the structures of reality',
        features_with_choices: [
          {
            name: 'Arcane Tradition',
            total_choices: 1,
            choices: modifyArchetypesArray(data.archetypes),
            selected: [],
          },
          {
            name: 'Spell Mastery',
            total_choices: 2,
            choices: [],
            subtype: 'spells',
            selected: [],
          },
          {
            name: 'Signature Spell',
            total_choices: 2,
            choices: [],
            subtype: 'spells',
            selected: [],
          },
        ],
        spellcasting_ability: data.spellcasting_ability || null,
        subtypes_name: data.subtypes_name || null,
      };
    case 'bard':
      return {
        primary_ability: 'Charisma',
        primary_desc:
          'An inspiring magician whose power echoes the music of creation',
        features_with_choices: [
          {
            name: 'Bard College',
            total_choices: 1,
            choices: modifyArchetypesArray(data.archetypes),
            selected: [],
          },
          {
            name: 'Magical Secrets',
            total_choices: 2,
            choices: [],
            subtype: 'spells',
            selected: [],
          },
          {
            name: 'Expertise',
            total_choices: 2,
            choices: characterSkills,
            subtype: 'skills',
            selected: [],
          },
        ],
        spellcasting_ability: data.spellcasting_ability || null,
        subtypes_name: data.subtypes_name || null,
      };
    case 'warlock':
      return {
        primary_ability: 'Charisma',
        primary_desc:
          'A wielder of magic that is derived from a bargain with an extraplanar entity',
        features_with_choices: [
          {
            name: 'Otherworldly Patron',
            total_choices: 1,
            choices: modifyArchetypesArray(data.archetypes),
            selected: [],
          },
          {
            name: 'Eldritch Invocations',
            total_choices: 2,
            choices: modifyWarlockEldrichDescriptions(
              descriptions.slice(17, 49)
            ),
            selected: [],
          },
          {
            name: 'Pact Boon',
            total_choices: 1,
            choices: [
              'Pact of the Blade',
              'Pact of the Tome',
              'Pact of the Chain',
            ],
            selected: [],
          },
          {
            name: 'Mystic Arcanum',
            total_choices: 1,
            choices: [],
            subtype: 'spells',
            selected: [],
          },
        ],
        spellcasting_ability: data.spellcasting_ability || null,
        subtypes_name: data.subtypes_name || null,
      };
    default:
      return {
        primary_ability: 'Charisma',
        primary_desc:
          'A spellcaster who draws on inherent magic from a gift or bloodline',
        features_with_choices: [
          {
            name: 'Sorcerous Origin',
            total_choices: 1,
            choices: modifyArchetypesArray(data.archetypes),
            selected: [],
          },
          {
            name: 'Metamagic',
            total_choices: 4,
            choices: [],
            subtype: 'spells',
            selected: [],
          },
        ],
        spellcasting_ability: data.spellcasting_ability || null,
        subtypes_name: data.subtypes_name || null,
      };
  }
};

const mergeFeaturesAndDescriptions = (
  features,
  descriptions,
  classType,
  primary_info
) => {
  let output = [];

  features.forEach((feat) => {
    // regex to match (d6) found at the end of some names
    // const regex = /\(d[1-9]\)/g;
    const regex =
      /\(d[1-9]\)|\([1-9] dice\)|\([1-9] die\)|\(CR [1-9]\/[1-9]\)|\(CR [1-9]\)|\([1-9]\/rest\)/g;
    let name = feat.name.replace(regex, '').trim();

    // console.log('current feature:', feat);

    if (feat.name === 'Relentless' && classType === 'Barbarian') {
      let random = descriptions.find((d) => d.name === 'Relentless Rage');
      output.push({
        name: 'Relentless Rage',
        level: feat.level,
        desc: random.description,
      });
    }

    let matchingDescription = descriptions.find((d) => d.name === name);

    if (matchingDescription) {
      // console.log('in mergeFeaturesAndDescriptions:', matchingDescription);
      if (feat.name === 'Spellcasting') {
        const primary = mergeSpellcastingDescriptions(descriptions, classType);

        // console.log('spellcasting description:', primary);

        output.push({
          ...feat,
          desc: primary,
        });
      } else if (feat.name === 'Pact Magic') {
        const primary2 = mergeSpellcastingDescriptions(descriptions, classType);
        output.push({
          ...feat,
          desc: matchingDescription.description + ' ' + primary2.primary_desc,
        });
      } else {
        output.push({ ...feat, desc: matchingDescription.description });
      }

      // console.log('match:', matchingDescription);
    } else {
      output.push({ ...feat });
    }
  });

  const modifiedFeatures = modifyFeaturesForClassChoices(
    output,
    primary_info,
    descriptions
  );
  // console.log('OUTPUT from mergeFeaturesDescriptions:', modifiedFeatures);
  return modifiedFeatures;
};

const gatherSpellcastingDescriptions = (descriptions, index) => {
  let primary_description = '';
  descriptions.slice(0, index).forEach((obj) => {
    primary_description += `${obj.name}-${obj.description}\n`;
  });
  // console.log('gathered description:', primary_description);
  return primary_description;
};

const mergeSpellcastingDescriptions = (descriptionsArr, classType) => {
  let descriptionsSlice;
  switch (classType) {
    case 'Cleric':
      descriptionsSlice = gatherSpellcastingDescriptions(descriptionsArr, 7);
      return descriptionsSlice;
    case 'Druid':
      descriptionsSlice = gatherSpellcastingDescriptions(
        descriptionsArr.slice(1, 7),
        6
      );
      return descriptionsSlice;
    case 'Paladin':
      descriptionsSlice = gatherSpellcastingDescriptions(
        descriptionsArr.slice(7, 11),
        4
      );
      return descriptionsSlice;
    case 'Wizard':
      descriptionsSlice = gatherSpellcastingDescriptions(descriptionsArr, 9);
      return descriptionsSlice;
    case 'Bard':
      descriptionsSlice = gatherSpellcastingDescriptions(descriptionsArr, 7);
      return descriptionsSlice;
    case 'Warlock':
      descriptionsSlice = gatherSpellcastingDescriptions(
        descriptionsArr.slice(1),
        6
      );
      return descriptionsSlice;
    case 'Sorcerer':
      descriptionsSlice = gatherSpellcastingDescriptions(descriptionsArr, 6);
      return descriptionsSlice;
    case 'Ranger':
      descriptionsSlice = gatherSpellcastingDescriptions(
        descriptionsArr.slice(7, 11),
        4
      );
      return descriptionsSlice;
    default:
      return {};
  }
};

export const modifyFeaturesForClassChoices = (features, primary_info) => {
  const output = [];

  // console.log('features passed in:', features);

  features
    .filter((feat) => feat.desc !== undefined)
    .filter((feat) => feat.name.split(' ').indexOf('feature') === -1)
    .forEach((feat) => {
      // console.log('feat:', feat.desc);

      let matchingFeatureWithChoice = primary_info.features_with_choices.find(
        (f) => f.name === feat.name
      );

      if (matchingFeatureWithChoice) {
        // console.log(
        //   'matchingFeature has a total_choices',
        //   matchingFeatureWithChoice,
        //   'desc:',
        //   feat.desc
        // );
        output.push({
          ...feat,
          total_choices: matchingFeatureWithChoice.total_choices,
          choices: matchingFeatureWithChoice.choices,
          subtype: matchingFeatureWithChoice.subtype || '',
          selected: [],
        });
      } else if (feat.name === 'Ability Score Improvement') {
        output.push({
          ...feat,
          total_choices: 2,
          choices: characterAbilities,
          value: 2,
          selected: [],
        });
      } else {
        output.push(feat);
      }
    });
  // console.log('OUTPUT with modified class choices:', output);
  // return addTableToDescription(output);
  return output;
};

const addTableToDescription = (features) => {
  return features.map((feature) => {
    // console.log('feature to add table:', feature);
    if (feature.desc.match(/\(table\)\*\*/g) !== null) {
      let table = parseClassTable(feature.desc.split(/\(table\)\*\*/g)[1]);
      // console.log('the table parsed:', table);
      return {
        ...feature,
        desc: feature.desc.split('**')[0],
        table: table,
      };
    } else {
      return feature;
    }
  });
};

/*

any feature asi = { name: 'Ability Score Improvement', level: ? , desc: '...', options: [{ name: 'Ability Score Improvement', choices: ['Strength', ...], , value: 2 }, { name: 'feats', choices: ['Grappling', 'Svirfnelbin Magic' ]}]}

barbarian - 
  proficiencies - 2 choices
  primal path - 1 choice = path archetypes
bard - 
  proficiencies - 6 choices
  bard college - 1 choice - college archetypes
  magical secrets - 2 choices spells of any class 
  expertise - 2 choices - skill proficiencies bonus
cleric -
  proficiencies - 2 choices
  divine domain - 1 choice - domains archetypes
druid -
  proficienceis - 2 choices
  druid circle - 1 choice - circle - archetypes
fighter -
  proficiencies - 2 choices
  fighting style - 1 choice
  martial archetype 1 choice - martial - archetype
monk -
  proficiencies - 3 choices
  manastic tradition - 1 choice - archetypes
paladin -
  profs - 2 choices
  fighting style - 1 choice
  sacred oath - 1 choice - oath archetypes
ranger - 
  profs - 3 choices
  favored enemy - 3 choices 
  natural explorer - 3 choices 
  fighting style - 1 choice
  ranger archetype - 1 choice - archetypes
rogue -
  profs - 4 choices
  expertise - 2 choices
  roguish archetype - 1 choice
sorcerer -
  profs - 2 choices
  sorcerous origin - 1 choice
  metamagic - 4 choices
warlock -
  profs - 2 choices
  otherworldly patron - 1 choice
  eldritch invocations - 8 choices
  pact boon - 1 choice
  mystic arcanum - 1 choice
wizard -
  profs - 2 choices
  arcane tradition - 1 choice
  spell mastery - 2 choices
  signature spells - 2 choices
*/
