import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  userId: '',
  name: '',
  index: '',
  traits: [],
  class_type: '',
  race: '',
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
  proficiencies: [],
  equipment: [],
  skills: [],
  class_specific: {},
  hit_points: {
    max: 0,
    current: 0,
  },
  ability_score_bonuses: [],
  spells: [],
  selected_race: {},
  selected_class: {},
};

const characterBuilderSlice = createSlice({
  name: 'character',
  initialState: initialState,
  reducers: {
    characterAddedToBuilder: (state, action) => {
      const { _id } = action.payload;
      state._id = _id;
    },
    nameAdded: (state, action) => {
      const { name } = action.payload;
      state.name = name;
    },
    nameUpdated: (state, action) => {
      const { name } = action.payload;
      state.name = name;
    },
    raceAdded: (state, action) => {
      const { race, traits, ability_score_bonuses } = action.payload;

      (state.ability_score_bonuses = [
        ...state.ability_score_bonuses,
        ...ability_score_bonuses,
      ]),
        (state.traits = [...state.traits, ...traits]);
      state.race = race;
      state.ability_score_bonuses.forEach((ab, idx) => {
        let abilityKey = ab.attributes[0];
        state[abilityKey] = ab.value;
      });
    },
    raceUpdated: (state, action) => {
      const { race, traits, ability_score_bonuses } = action.payload;

      state.ability_score_bonuses = [
        ...state.ability_score_bonuses,
        ...ability_score_bonuses,
      ];
      state.traits = [...state.traits, ...traits];
      state.race = race;
    },
    traitChosen: (state, action) => {
      const { trait } = action.payload;
      state.traits = [...state.traits, trait];
    },
    traitRemoved: (state, action) => {
      const { trait } = action.payload;

      const removedTrait = state.traits.find(
        (tr, idx) => tr.index === trait.index
      );

      if (removedTrait) {
        console.log('removed trait');
      }
    },
    classAdded: (state, action) => {
      const {
        class_type,
        equipment,
        skills,
        class_specific,
        traits,
        ability_score_bonuses,
        proficiencies,
        hit_points,
      } = action.payload;
      state.class_type = class_type;
      state.equipment = [...equipment];
      state.skills = [...skills];
      state.class_specific = { ...class_specific };
      state.traits = [...state.traits, ...traits];
      state.ability_score_bonuses = [
        ...state.ability_score_bonuses,
        ...ability_score_bonuses,
      ];
      state.hit_points = {
        ...hit_points,
      };
      state.proficiencies = [...state.proficiencies, ...proficiencies];
    },
    classUpdated: (state, action) => {
      const {
        class_type,
        equipment,
        skills,
        class_specific,
        traits,
        ability_score_bonuses,
        proficiencies,
      } = action.payload;
      state.class_type = class_type;
      (state.equipment = [...equipment]), (state.skills = [...skills]);
      state.class_specific = { ...class_specific };
      state.traits = [...state.traits, ...traits];
      state.ability_score_bonuses = [
        ...state.ability_score_bonuses,
        ...ability_score_bonuses,
      ];
      state.proficiencies = [...state.proficiencies, ...proficiencies];
    },
    abilitiesAdded: (state, action) => {
      const {
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      } = action.payload;

      state.strength = state.strength + strength;
      state.dexterity = state.dexterity + dexterity;
      state.constitution = state.constitution + constitution;
      state.intelligence = state.intelligence + intelligence;
      state.wisdom = state.wisdom + wisdom;
      state.charisma = state.charisma + charisma;
    },
    abilitiesUpdated: (state, action) => {
      const {
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      } = action.payload;

      state.ability_score_bonuses.forEach((ab, idx) => {
        let key = ab.attributes[0];
        state[key] = ab.value;
      });

      state.strength = state.strength + strength;
      state.dexterity = state.dexterity + dexterity;
      state.constitution = state.constitution + constitution;
      state.intelligence = state.intelligence + intelligence;
      state.wisdom = state.wisdom + wisdom;
      state.charisma = state.charisma + charisma;
    },
    setFilteredRace: (state, action) => {
      state.selected_race = {
        ...state.selected_race,
        ...action.payload,
      };
    },
    setFilteredClass: (state, action) => {
      state.selected_class = {
        ...state.selected_class,
        ...action.payload,
      };
    },
    clearFilteredRace: (state) => {
      state.selected_race = initialState.selected_race;
    },
    clearFilteredClass: (state) => {
      state.selected_class = initialState.selected_class;
    },
  },
});

export const {
  characterAddedToBuilder,
  nameAdded,
  nameUpdated,
  raceAdded,
  raceUpdated,
  classAdded,
  classUpdated,
  abilitiesAdded,
  abilitiesUpdated,
  setFilteredClass,
  setFilteredRace,
  clearFilteredClass,
  clearFilteredRace,
} = characterBuilderSlice.actions;
export const characterBuilderSliceReducer = characterBuilderSlice.reducer;
