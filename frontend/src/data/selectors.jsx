export const characterAlignments = [
  {
    index: 'chaotic-evil',
    name: 'Chaotic Evil',
    url: '/api/alignments/chaotic-evil',
  },
  {
    index: 'chaotic-good',
    name: 'Chaotic Good',
    url: '/api/alignments/chaotic-good',
  },
  {
    index: 'chaotic-neutral',
    name: 'Chaotic Neutral',
    url: '/api/alignments/chaotic-neutral',
  },
  {
    index: 'lawful-evil',
    name: 'Lawful Evil',
    url: '/api/alignments/lawful-evil',
  },
  {
    index: 'lawful-good',
    name: 'Lawful Good',
    url: '/api/alignments/lawful-good',
  },
  {
    index: 'lawful-neutral',
    name: 'Lawful Neutral',
    url: '/api/alignments/lawful-neutral',
  },
  { index: 'neutral', name: 'Neutral', url: '/api/alignments/neutral' },
  {
    index: 'neutral-evil',
    name: 'Neutral Evil',
    url: '/api/alignments/neutral-evil',
  },
  {
    index: 'neutral-good',
    name: 'Neutral Good',
    url: '/api/alignments/neutral-good',
  },
];

export const characterRaces = [
  {
    index: 'dragonborn',
    name: 'Dragonborn',
    imgSrc: '/src/assets/races/dragonborn.jpeg',
    description:
      'Dragonborn look very much like dragons standing erect in humanoid form, though they lack wings or a tail.',
  },
  {
    index: 'dwarf',
    name: 'Dwarf',
    imgSrc: '/src/assets/races/dwarf.jpeg',
    description:
      'Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.',
    subraces: [
      {
        index: 'dwarf',
        name: 'Dwarf',
        imgSrc: '/src/assets/races/dwarf.jpeg',
        description: `Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal. 
          As a mountain dwarf, you’re strong and hardy, accustomed to a difficult life in rugged terrain. You’re probably on the tall side (for a dwarf), and tend toward lighter coloration. The shield dwarves of northern Faerûn, as well as the ruling Hylar clan and the noble Daewar clan of Dragonlance, are mountain dwarves.`,
      },
      {
        index: 'hill-dwarf',
        name: 'Hill-Dwarf',
        imgSrc: '/src/assets/races/hill-dwarf.jpeg',
        description:
          'As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience. The gold dwarves of Faerûn in their mighty southern kingdom are hill dwarves, as are the exiled Neidar and the debased Klar of Krynn in the Dragonlance setting.',
      },
    ],
  },
  {
    index: 'elf',
    name: 'Elf',
    imgSrc: '/src/assets/races/elf.jpeg',
    description:
      'Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.',
    subraces: [
      {
        index: 'elf',
        name: 'Elf',
        imgSrc: '/src/assets/races/elf.jpeg',
        description:
          'Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.',
      },
      {
        index: 'high-elf',
        name: 'High-Elf',
        imgSrc: '/src/assets/races/high-elf.jpeg',
        description: `As a high elf, you have a keen mind and a mastery of at least the basics of magic. In many of the worlds of D&D, there are two kinds of high elves. One type (which includes the gray elves and valley elves of Greyhawk, the Silvanesti of Dragonlance, and the sun elves of the Forgotten Realms) is haughty and reclusive, believing themselves to be superior to non-elves and even other elves. The other type (including the high elves of Greyhawk, the Qualinesti of Dragonlance, and the moon elves of the Forgotten Realms) are more common and more friendly, and often encountered among humans and other races.

        The sun elves of Faerûn (also called gold elves or sunrise elves) have bronze skin and hair of copper, black, or golden blond. Their eyes are golden, silver, or black. Moon elves (also called silver elves or gray elves) are much paler, with alabaster skin sometimes tinged with blue. They often have hair of silver-white, black, or blue, but various shades of blond, brown, and red are not uncommon. Their eyes are blue or green and flecked with gold.`,
      },
    ],
  },
  {
    index: 'gnome',
    name: 'Gnome',
    imgSrc: '/src/assets/races/gnome.jpeg',
    description:
      'A gnome’s energy and enthusiasm for living shines through every inch of his or her tiny body.',
    subraces: [
      {
        index: 'gnome',
        name: 'Gnome',
        imgSrc: '/src/assets/races/gnome.jpeg',
        description:
          'A gnome’s energy and enthusiasm for living shines through every inch of his or her tiny body.',
      },
      {
        index: 'rock-gnome',
        name: 'Rock-Gnome',
        imgSrc: '/src/assets/races/rock-gnome.jpeg',
        description:
          'As a rock gnome, you have a natural inventiveness and hardiness beyond that of other gnomes. Most gnomes in the worlds of D&D are rock gnomes, including the tinker gnomes of the Dragonlance setting.',
      },
    ],
  },
  {
    index: 'half-elf',
    name: 'Half-Elf',
    imgSrc: '/src/assets/races/half-elf.jpeg',
    description:
      'Half-elves combine what some say are the best qualities of their elf and human parents.',
  },
  {
    index: 'half-orc',
    name: 'Half-Orc',
    imgSrc: '/src/assets/races/half-orc.jpg',
    description:
      'Some half-orcs rise to become proud leaders of orc communities. Some venture into the world to prove their worth. Many of these become adventurers, achieving greatness for their mighty deeds.',
  },
  {
    index: 'halfling',
    name: 'Halfling',
    imgSrc: '/src/assets/races/halfling.jpeg',
    description:
      'The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense.',
    subraces: [
      {
        index: 'halfling',
        name: 'Halfling',
        imgSrc: '/src/assets/races/halfling.jpeg',
        description:
          'The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense.',
      },
      {
        index: 'lightfoot-halfling',
        name: 'Lightfoot-Hafling',
        imgSrc: '/src/assets/races/lightfoot-halfling.jpeg',
        description: `As a lightfoot halfling, you can easily hide from notice, even using other people as cover. You’re inclined to be affable and get along well with others. In the Forgotten Realms, lightfoot halflings have spread the farthest and thus are the most common variety.
        
        Lightfoots are more prone to wanderlust than other halflings, and often dwell alongside other races or take up a nomadic life. In the world of Greyhawk, these halflings are called hairfeet or tallfellows.`,
      },
    ],
  },
  {
    index: 'human',
    name: 'Human',
    imgSrc: '/src/assets/races/human.jpeg',
    description:
      'Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.',
  },
  {
    index: 'tiefling',
    name: 'Tiefling',
    imgSrc: '/src/assets/races/tiefling.jpeg',
    description:
      'To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling.',
  },
];

export const characterClasses = [
  {
    index: 'barbarian',
    name: 'Barbarian',
    imgSrc: '/src/assets/classes/barbarian.jpeg',
  },
  { index: 'bard', name: 'Bard', imgSrc: '/src/assets/classes/bard.jpeg' },
  {
    index: 'cleric',
    name: 'Cleric',
    imgSrc: '/src/assets/classes/cleric.jpeg',
  },
  { index: 'druid', name: 'Druid', imgSrc: '/src/assets/classes/druid.jpeg' },
  {
    index: 'fighter',
    name: 'Fighter',
    imgSrc: '/src/assets/classes/fighter.jpeg',
  },
  { index: 'monk', name: 'Monk', imgSrc: '/src/assets/classes/monk.jpeg' },
  {
    index: 'paladin',
    name: 'Paladin',
    imgSrc: '/src/assets/classes/paladin.jpeg',
  },
  {
    index: 'ranger',
    name: 'Ranger',
    imgSrc: '/src/assets/classes/ranger.jpeg',
  },
  { index: 'rogue', name: 'Rogue', imgSrc: '/src/assets/classes/rogue.jpeg' },
  {
    index: 'sorcerer',
    name: 'Sorcerer',
    imgSrc: '/src/assets/classes/sorcerer.jpeg',
  },
  {
    index: 'warlock',
    name: 'Warlock',
    imgSrc: '/src/assets/classes/warlock.jpeg',
  },
  {
    index: 'wizard',
    name: 'Wizard',
    imgSrc: '/src/assets/classes/wizard.jpeg',
  },
];

export const characterGenders = [
  { index: 1, type: 'Gender variant' },
  { index: 2, type: 'male' },
  { index: 3, type: 'female' },
  { index: 4, type: 'Trigender' },
  { index: 5, type: 'Cis female' },
  { index: 6, type: 'Gender nonconforming' },
  { index: 7, type: 'Woman' },
  { index: 8, type: 'Transexual man' },
  { index: 9, type: 'Demi-woman' },
  { index: 10, type: 'Gender fluid' },
];

export const lifeStyles = [
  { name: 'Wretched', gold: 0, silver: 0 },
  { name: 'Squalid', gold: 0, silver: 1 },
  { name: 'Poor', gold: 0, silver: 2 },
  { name: 'Modest', gold: 1, silver: 0 },
  { name: 'Comfortable', gold: 2, silver: 0 },
  { name: 'Wealthy', gold: 4, silver: 0 },
  { name: 'Aristocratic', gold: 10, silver: 0 },
];

export const characterSkills = [
  'Acrobatics',
  'Animal-handling',
  'Arcana',
  'Athletics',
  'Deception',
  'History',
  'Insight',
  'Intimidation',
  'Investigation',
  'Medicine',
  'Nature',
  'Perception',
  'Performance',
  'Persuasion',
  'Religion',
  'Sleight-of-hand',
  'Stealth',
  'Survival',
];

export const thievesSkills = [
  'Acrobatics',
  'Athletics',
  'Deception',
  'Insight',
  'Intimidation',
  'Investigation',
  'Perception',
  'Performance',
  'Persuasion',
  'Sleight of Hand',
  'Stealth',
];

export const musicalInstruments = [
  'Bagpipes',
  'Drum',
  'Dulcimer',
  'Flute',
  'Lute',
  'Lyre',
  'Horn',
  'Pan flute',
  'Shawm',
  'Viol',
];

export const characterAbilities = [
  'Strength',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Dexterity',
  'Charisma',
];

export const characterFeats = ['Grappling', 'Svirfnelbin Magic'];

export const terrainTypes = [
  'Arctic',
  'Coast',
  'Desert',
  'Forest',
  'Grassland',
  'Mountain',
  'Swamp',
];

export const enemyTypes = [
  'Aberrations',
  'Beasts',
  'Celestials',
  'Constructs',
  'Dragons',
  'Elementals',
  'Fey',
  'Fiends',
  'Giants',
  'Monstrosities',
  'Oozes',
  'Plants',
  'Undead',
  'Humanoids (2 choices such as Gnolls, Orcs)',
];

export const commonLanguages = [
  'Draconic',
  'Dwarvish',
  'Elvish',
  'Gnomish',
  'Giant',
  'Goblin',
  'Halfling',
  'Orc',
];

export const keenSenseSkill = ['Perception', 'Survival', 'Insight'];

export const spellSchoolIcons = [
  { name: 'Abjuration', imgSrc: '/src/assets/spells/abjuration.png' },
  { name: 'Conjuration', imgSrc: '/src/assets/spells/conjuration.png' },
  { name: 'Divination', imgSrc: '/src/assets/spells/divination.png' },
  { name: 'Enchantment', imgSrc: '/src/assets/spells/enchantment.png' },
  { name: 'Evocation', imgSrc: '/src/assets/spells/evocation.png' },
  { name: 'Illusion', imgSrc: '/src/assets/spells/illusion.png' },
  { name: 'Necromancy', imgSrc: '/src/assets/spells/necromancy.png' },
  { name: 'Transmutation', imgSrc: '/src/assets/spells/transmutation.png' },
];

export const metamagicSpells = [
  {
    index: 'metamagic-careful-spell',
    name: 'Metamagic: Careful Spell',
    url: '/api/features/metamagic-careful-spell',
    desc: [
      "When you cast a spell that forces other creatures to make a saving throw, you can protect some of those creatures from the spell's full force. To do so, you spend 1 sorcery point and choose a number of those creatures up to your Charisma modifier (minimum of one creature). A chosen creature automatically succeeds on its saving throw against the spell.",
    ],
  },
  {
    index: 'metamagic-distant-spell',
    name: 'Metamagic: Distant Spell',
    url: '/api/features/metamagic-distant-spell',
    desc: [
      'When you cast a spell that has a range of 5 feet or greater, you can spend 1 sorcery point to double the range of the spell.',
      'When you cast a spell that has a range of touch, you can spend 1 sorcery point to make the range of the spell 30 feet.',
    ],
  },
  {
    index: 'metamagic-empowered-spell',
    name: 'Metamagic: Empowered Spell',
    url: '/api/features/metamagic-empowered-spell',
    desc: [
      'When you roll damage for a spell, you can spend 1 sorcery point to reroll a number of the damage dice up to your Charisma modifier (minimum of one). You must use the new rolls.',
      'You can use Empowered Spell even if you have already used a different Metamagic option during the casting of the spell.',
    ],
  },
  {
    index: 'metamagic-extended-spell',
    name: 'Metamagic: Extended Spell',
    url: '/api/features/metamagic-extended-spell',
    desc: [
      'When you cast a spell that has a duration of 1 minute or longer, you can spend 1 sorcery point to double its duration, to a maximum duration of 24 hours.',
    ],
  },
  {
    index: 'metamagic-heightened-spell',
    name: 'Metamagic: Heightened Spell',
    url: '/api/features/metamagic-heightened-spell',
    desc: [
      'When you cast a spell that forces a creature to make a saving throw to resist its effects, you can spend 3 sorcery points to give one target of the spell disadvantage on its first saving throw made against the spell.',
    ],
  },
  {
    index: 'metamagic-quickened-spell',
    name: 'Metamagic: Quickened Spell',
    url: '/api/features/metamagic-quickened-spell',
    desc: [
      'When you cast a spell that has a casting time of 1 action, you can spend 2 sorcery points to change the casting time to 1 bonus action for this casting.',
    ],
  },
  {
    index: 'metamagic-subtle-spell',
    name: 'Metamagic: Subtle Spell',
    url: '/api/features/metamagic-subtle-spell',
    desc: [
      'When you cast a spell, you can spend 1 sorcery point to cast it without any somatic or verbal components.',
    ],
  },
  {
    index: 'metamagic-twinned-spell',
    name: 'Metamagic: Twinned Spell',
    url: '/api/features/metamagic-twinned-spell',
    desc: [
      "When you cast a spell that targets only one creature and doesn't have a range of self, you can spend a number of sorcery points equal to the spell's level to target a second creature in range with the same spell (1 sorcery point if the spell is a cantrip).",
      "To be eligible, a spell must be incapable of targeting more than one creature at the spell's current level. For example, magic missile and scorching ray aren't eligible, but ray of frost is.",
    ],
  },
];

export const mysticArcanumSpells = [
  {
    at_level: 17,
    selected: [],
    choices: [
      {
        index: 'astral-projection',
        name: 'Astral Projection',
        url: '/api/spells/astral-projection',
      },
      {
        index: 'foresight',
        name: 'Foresight',
        url: '/api/spells/foresight',
      },
      {
        index: 'imprisonment',
        name: 'Imprisonment',
        url: '/api/spells/imprisonment',
      },
      {
        index: 'power-word-kill',
        name: 'Power Word Kill',
        url: '/api/spells/power-word-kill',
      },
      {
        index: 'true-polymorph',
        name: 'True Polymorph',
        url: '/api/spells/true-polymorph',
      },
    ],
  },
  {
    at_level: 15,
    selected: [],
    choices: [
      {
        index: 'demiplane',
        name: 'Demiplane',
        url: '/api/spells/demiplane',
      },
      {
        index: 'dominate-monster',
        name: 'Dominate Monster',
        url: '/api/spells/dominate-monster',
      },
      {
        index: 'feeblemind',
        name: 'Feeblemind',
        url: '/api/spells/feeblemind',
      },
      {
        index: 'glibness',
        name: 'Glibness',
        url: '/api/spells/glibness',
      },
      {
        index: 'power-word-stun',
        name: 'Power Word Stun',
        url: '/api/spells/power-word-stun',
      },
    ],
  },
  {
    at_level: 13,
    selected: [],
    choices: [
      {
        index: 'etherealness',
        name: 'Etherealness',
        url: '/api/spells/etherealness',
      },
      {
        index: 'finger-of-death',
        name: 'Finger of Death',
        url: '/api/spells/finger-of-death',
      },
      {
        index: 'forcecage',
        name: 'Forcecage',
        url: '/api/spells/forcecage',
      },
      {
        index: 'plane-shift',
        name: 'Plane Shift',
        url: '/api/spells/plane-shift',
      },
    ],
  },
  {
    at_level: 11,
    selected: [],
    choices: [
      {
        index: 'circle-of-death',
        name: 'Circle of Death',
        url: '/api/spells/circle-of-death',
      },
      {
        index: 'conjure-fey',
        name: 'Conjure Fey',
        url: '/api/spells/conjure-fey',
      },
      {
        index: 'create-undead',
        name: 'Create Undead',
        url: '/api/spells/create-undead',
      },
      {
        index: 'eyebite',
        name: 'Eyebite',
        url: '/api/spells/eyebite',
      },
      {
        index: 'flesh-to-stone',
        name: 'Flesh to Stone',
        url: '/api/spells/flesh-to-stone',
      },
      {
        index: 'mass-suggestion',
        name: 'Mass Suggestion',
        url: '/api/spells/mass-suggestion',
      },
      {
        index: 'true-seeing',
        name: 'True Seeing',
        url: '/api/spells/true-seeing',
      },
    ],
  },
];
