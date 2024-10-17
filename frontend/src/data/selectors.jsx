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
        index: 'hill-dwarf',
        name: 'Hill-Dwarf',
        imgSrc: '',
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
        index: 'high-elf',
        name: 'High-Elf',
        imgSrc: '',
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
        index: 'rock-gnome',
        name: 'Rock-Gnome',
        imgSrc: '',
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
        index: 'lightfoot-halfling',
        name: 'Lightfoot-Hafling',
        imgSrc: '',
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
