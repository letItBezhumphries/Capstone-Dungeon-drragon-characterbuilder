import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  userId: '',
  name: '',
  index: '',
  traits: [],
  class_type: '',
  race: '',
  ability_scores: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  proficiencies: {
    race_skills: {},
    skills: {},
    tools: {},
    armor: '',
    equipment: '',
    weapons: '',
    saving_throws: '',
    total_choices: 0,
    choices: [],
  },
  equipment: [],
  expertise_selected: [],
  expertise_available: [],
  skills_selected: [],
  skill_options_available: [],
  tools_selected: [],
  tool_options_available: [],
  asi_selected: [],
  asi_options_available: [
    'Strength',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Dexterity',
    'Charisma',
  ],
  current_feature_selections: [],
  active_class_features: [],
  class_specific: {},
  hit_points: {
    max: 0,
    current: 0,
  },
  level: 1,
  ability_score_bonuses: [],
  race_skills_selected: [],
  race_skillOptions_available: [],
  ability_bonus_selected: [],
  ability_bonusOptions_available: [],
  spellcasting: {
    known_spells: [],
  },
  selected_race: {},
  selected_class: {},
  ability_autorolls_available: [8, 10, 12, 13, 14, 15],
  ability_autorolls_selected: [],
  ability_manualrolls_available: [],
  ability_manualrolls_selected: [],
  spells_available_to_class: [],
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
    expertiseSkillsUpdated: (state, action) => {
      const { skill, total_choices } = action.payload;

      if (state.expertise_selected.length < total_choices) {
        state.expertise_available = state.expertise_available.filter(
          (sk) => sk !== skill
        );

        let matchingExpertise = state.expertise_selected.find(
          (sk) => sk === skill
        );

        if (!matchingExpertise) {
          state.expertise_selected = [...state.expertise_selected, skill];
        }
      }
    },
    toolsUpdated: (state, action) => {
      const { tool, total_choices } = action.payload;

      if (state.tools_selected.length < total_choices) {
        state.tool_options_available = state.tool_options_available.filter(
          (opt) => opt !== tool
        );

        let matchingTool = state.tools_selected.find((t) => t === tool);
        if (!matchingTool) {
          state.tools_selected = [...state.tools_selected, tool];
          state.selected_class.proficiencies.tools.selected = [
            ...state.selected_class.proficiencies.tools.selected,
            tool,
          ];
        }
      }
    },
    skillsUpdated: (state, action) => {
      const { skill, total_choices } = action.payload;

      if (state.skills_selected.length < total_choices) {
        state.skill_options_available = state.skill_options_available.filter(
          (opt) => opt !== skill
        );

        let matchingSkill = state.skills_selected.find((sk) => sk === skill);
        if (!matchingSkill) {
          state.skills_selected = [...state.skills_selected, skill];
          state.selected_class.proficiencies.skills.selected = [
            ...state.selected_class.proficiencies.skills.selected,
            skill,
          ];
        }
      }
    },
    racebasedSkillsUpdated: (state, action) => {
      const { skill, total_choices } = action.payload;

      if (state.race_skills_selected.length < total_choices) {
        state.race_skillOptions_available =
          state.race_skillOptions_available.filter((opt) => opt !== skill);
      }

      let matchingSkill = state.race_skills_selected.find((sk) => sk === skill);
      if (!matchingSkill) {
        state.race_skills_selected = [...state.race_skills_selected, skill];
      }
    },
    racebasedAbilityBonusUpdated: (state, action) => {
      const { ability, total_choices } = action.payload;

      if (state.ability_bonus_selected.length < total_choices + 1) {
        state.ability_bonusOptions_available =
          state.ability_bonusOptions_available.filter((ab) => ab !== ability);
      }

      let matchingAbility = state.ability_bonus_selected.find(
        (ab) => ab.name === ability
      );
      if (!matchingAbility) {
        state.ability_bonus_selected = [
          ...state.ability_bonus_selected,
          { name: ability, value: 1 },
        ];
      }
    },
    asiUpdated: (state, action) => {
      const { ability, total_choices } = action.payload;

      if (state.asi_selected.length < total_choices) {
        state.asi_options_available = state.asi_options_available.filter(
          (ab) => ab !== ability
        );
      }

      let matchingAbility = state.asi_selected.find(
        (ab) => ab.name === ability
      );
      if (!matchingAbility) {
        state.asi_selected = [
          ...state.asi_selected,
          { name: ability, value: 1 },
        ];
      }
    },
    autoAbilityRollsUpdated: (state, action) => {
      const { ability, roll } = action.payload;

      state.ability_scores[ability] = state.ability_scores[ability] + roll;

      state.ability_autorolls_available =
        state.ability_autorolls_available.filter((r) => r !== roll);

      state.ability_autorolls_selected = [
        ...state.ability_autorolls_selected,
        roll,
      ];
    },
    manualAbilityRollsUpdated: (state, action) => {},
    selectClassFeature: (state, action) => {
      const { featureName, selection } = action.payload;

      state.selected_class.features = state.selected_class.features.map(
        (feat) => {
          if (feat.name === featureName) {
            return {
              selected: [selection],
              ...feat,
            };
          }
          return feat;
        }
      );
      // let matchingFeature = state.selected_class.features.find(
      //   (feat, index) => {
      //     if (feat.name === name) {
      //       return index;
      //     }
      //   }
      // );

      // if (matchingFeature) {
      //   state.selected_class.features = state.selected_class.features.map((feature) => {
      //     if (feature.name === name) {

      //     }
      //   })
      // }
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
    setSpellsAvailableForClass: (state, action) => {
      const { results } = action.payload;
      state.spells_available_to_class = [
        ...state.spells_available_to_class,
        results,
      ];
    },
    setFilteredRace: (state, action) => {
      const {
        name,
        traits,
        traitNames,
        desc,
        index,
        asi,
        asi_desc,
        age,
        languages,
        size,
        size_raw,
        speed,
        speed_desc,
        vision,
      } = action.payload;

      let skillVersatilityTrait = traits.find((tr) => {
        if (tr.name === 'Skill Versatility') {
          return tr;
        }
      });

      if (skillVersatilityTrait) {
        state.race_skillOptions_available = [
          ...state.race_skillOptions_available,
          ...skillVersatilityTrait.choices,
        ];
      }

      if (name === 'Half-Elf') {
        state.ability_bonusOptions_available = [
          ...state.ability_bonusOptions_available,
          'Strength',
          'Constitution',
          'Intelligence',
          'Wisdom',
          'Dexterity',
        ];
        state.ability_bonus_selected = [
          ...state.ability_bonus_selected,
          {
            name: 'Charisma',
            value: 2,
          },
        ];
      }

      state.selected_race = {
        ...state.selected_race,
        ...action.payload,
      };
    },
    setFilteredClass: (state, action) => {
      const { proficiencies, hit_points, features, equipment, name, spells } =
        action.payload;

      if (name === 'Bard' || name === 'Rogue') {
        let expertiseFeature = features.find((feat) => {
          if (feat.name === 'Expertise') {
            return feat;
          }
        });

        state.expertise_available = [...expertiseFeature.choices];
      }

      state.selected_class = {
        ...state.selected_class,
        ...action.payload,
      };

      state.tool_options_available = [
        ...state.tool_options_available,
        ...proficiencies.tools.choices,
      ];
      state.skill_options_available = [...proficiencies.skills.choices];
    },
    clearFilteredRace: (state) => {
      state.selected_race = initialState.selected_race;
    },
    clearFilteredClass: (state) => {
      state.selected_class = initialState.selected_class;
      state.skill_options_available = initialState.skill_options_available;
      state.tool_options_available = initialState.tool_options_available;

      state.spells_available_to_class = initialState.spells_available_to_class;
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
  skillsUpdated,
  toolsUpdated,
  asiUpdated,
  autoAbilityRollsUpdated,
  manualAbilityRollsUpdated,
  expertiseSkillsUpdated,
  racebasedAbilityBonusUpdated,
  racebasedSkillsUpdated,
  selectClassFeature,
  setFilteredClass,
  setSpellsAvailableForClass,
  setFilteredRace,
  clearFilteredClass,
  clearFilteredRace,
} = characterBuilderSlice.actions;
export const characterBuilderSliceReducer = characterBuilderSlice.reducer;
