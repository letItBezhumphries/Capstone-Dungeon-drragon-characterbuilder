import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  userId: '',
  name: '',
  index: '',
  traits: [],
  class_type: '',
  race: '',
  size: {
    desc: '',
    size_type: '',
  },
  age: {
    desc: '',
    years: '',
  },
  race_desc: '',
  speed: { desc: '' },
  languages: {
    desc: '',
    known: [],
  },
  ability_scores: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  spell_casting: {
    cantrips: [],
    invocations: [],
    level_1_spells: [],
    level_2_spells: [],
    level_3_spells: [],
    level_4_spells: [],
    level_5_spells: [],
    level_6_spells: [],
    level_7_spells: [],
    level_8_spells: [],
    level_9_spells: [],
  },
  class_features: [],
  proficiencies: {},
  proficiency_bonus: 2,
  equipment: {},
  class_specific: {},
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
  current_feature_options_available: [],
  current_feature_options_selected: [],
  hit_points: {},
  level: 1,
  ability_score_bonuses: [],
  race_skills_selected: [],
  race_skillOptions_available: [],
  ability_bonus_selected: [],
  ability_bonusOptions_available: [],
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

      state.index = index;
      state.race_desc = desc;
      state.race = name;
      state.traits = [...state.traits, traits];
      state.speed = {
        desc: speed_desc,
        ...speed,
        ...state.speed,
      };
      state.age = {
        desc: age,
        ...state.age,
      };
      state.languages = {
        desc: languages,
        ...state.languages,
      };
      state.size = {
        size_type: size,
        desc: size_raw,
        ...state.size,
      };

      asi.forEach((ability) => {
        let updateAbilityKey = ability.attributes[0].toLowerCase();
        let value = ability.value;

        state.ability_scores[updateAbilityKey] =
          state.ability_scores[updateAbilityKey] + value;
      });

      if (name === 'Elf') {
        state.proficiencies.skills = {
          ...state.proficiencies.skills,
          selected: ['Perception'],
        };
      }
      if (name === 'Half-Orc') {
        state.proficiencies.skills = {
          ...state.proficiencies.skills,
          selected: ['Intimidation'],
        };
      }
      if (name === 'Tiefling') {
        state.spell_casting.cantrips_total =
          state.spell_casting.cantrips_total + 1;
        state.spell_casting.cantrips = [
          ...state.spell_casting.cantrips,
          'Thaumaturgy',
        ];
      }
      if (name === 'Human') {
        state.ability_scores.strength = state.ability_scores.strength + 1;
        state.ability_scores.constitution =
          state.ability_scores.constitution + 1;
        state.ability_scores.intelligence =
          state.ability_scores.intelligence + 1;
        state.ability_scores.wisdom = state.ability_scores.wisdom + 1;
        state.ability_scores.dexterity = state.ability_scores.dexterity + 1;
        state.ability_scores.charisma = state.ability_scores.charisma + 1;
      }
    },
    classAdded: (state, action) => {
      const {
        archetypes,
        spellcasting,
        class_specific,
        desc,
        equipment,
        features,
        hit_points,
        imgSrc,
        index,
        name,
        primary_ability,
        primary_desc,
        proficiencies,
        table,
      } = action.payload;

      state.class_type = name;
      state.index = index;
      state.class_specific.primary_ability = primary_ability;
      state.class_specific.primary_desc = primary_desc;
      state.class_specific.desc = desc;
      state.class_specific.table = table;
      state.class_specific.img_source = imgSrc;
      state.proficiencies = {
        ...state.proficiencies,
        tools: {
          ...state.proficiencies.tools,
          ...proficiencies.tools,
        },
        skills: {
          ...state.proficiencies.skills,
          ...proficiencies.skills,
        },
      };
      state.hit_points = {
        ...state.hit_points,
        ...hit_points,
      };
      state.equipment = {
        ...state.equipment,
        ...equipment,
      };
      state.class_features = [...state.class_features, ...features];
      state.class_specific = {
        ...state.class_specific,
        ...class_specific,
      };

      state.spell_casting = {
        ...state.spell_casting,
        ...spellcasting,
      };

      if (name === 'Bard' || name === 'Rogue') {
        let expertiseFeature = features.find((feat) => {
          if (feat.name === 'Expertise') {
            return feat;
          }
        });

        state.expertise_available = [...expertiseFeature.choices];
      }

      state.tool_options_available = [
        ...state.tool_options_available,
        ...proficiencies.tools.choices,
      ];
      state.skill_options_available = [...proficiencies.skills.choices];
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
    spellAddedToInventory: (state, action) => {
      const { spell } = action.payload;

      if (
        spell.level_int === 2 &&
        state.spell_casting.level_2_spells.length <
          state.spell_casting.level_2_total
      ) {
        let matchingSpell = state.spell_casting.level_2_spells.find((sp) => {
          if (sp.name === spell.name) {
            return spell;
          }
        });

        // the spell is not found to exist in state
        if (!matchingSpell) {
          state.spell_casting.level_2_spells = [
            ...state.spell_casting.level_2_spells,
            spell,
          ];
        }
      } else if (
        spell.level_int === 1 &&
        state.spell_casting.level_1_spells.length <
          state.spell_casting.level_1_total
      ) {
        let matchingSpell = state.spell_casting.level_1_spells.find((sp) => {
          if (sp.name === spell.name) {
            return spell;
          }
        });

        if (!matchingSpell) {
          state.spell_casting.level_1_spells = [
            ...state.spell_casting.level_1_spells,
            spell,
          ];
        }
      } else {
        if (
          state.spell_casting.cantrips.length <
          state.spell_casting.cantrips_total
        ) {
          let matchingSpell = state.spell_casting.cantrips.find((sp) => {
            if (sp.name === spell.name) {
              return spell;
            }
          });

          if (!matchingSpell) {
            state.spell_casting.cantrips = [
              ...state.spell_casting.cantrips,
              spell,
            ];
          }
        }
      }
    },
    spellRemovedFromInventory: (state, action) => {
      const { spell } = action.payload;

      if (spell.level_int === 2) {
        state.spell_casting.level_2_spells = [
          ...state.spell_casting.level_2_spells.filter(
            (sp) => sp.name !== spell.name
          ),
        ];
      } else if (spell.level_int === 1) {
        state.spell_casting.level_1_spells = [
          ...state.spell_casting.level_1_spells.filter(
            (sp) => sp.name !== spell.name
          ),
        ];
      } else {
        state.spell_casting.cantrips = [
          ...state.spell_casting.cantrips.filter(
            (sp) => sp.name !== spell.name
          ),
        ];
      }
    },
    setSpellsAvailableForClass: (state, action) => {
      const { results } = action.payload;
      state.spells_available_to_class = [
        ...state.spells_available_to_class,
        results,
      ];
    },
    setFilteredRace: (state, action) => {
      const { name, traits } = action.payload;

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
      // state.spells_available_to_class = [
      //   ...state.spells_available_to_class,
      //   ...spells,
      // ];
    },
    clearFilteredRace: (state) => {
      state.selected_race = initialState.selected_race;
      state.ability_bonusOptions_available =
        initialState.ability_bonusOptions_available;
      state.ability_bonus_selected = initialState.ability_bonus_selected;
      state.race_skillOptions_available =
        initialState.race_skillOptions_available;
      state.race_skills_selected = initialState.race_skills_selected;
    },
    clearFilteredClass: (state) => {
      state.selected_class = initialState.selected_class;
      state.skill_options_available = initialState.skill_options_available;
      state.tool_options_available = initialState.tool_options_available;
      state.expertise_available = initialState.expertise_available;
      state.spells_available_to_class = initialState.spells_available_to_class;
    },
  },
});

export const {
  characterAddedToBuilder,
  nameAdded,
  nameUpdated,
  raceAdded,
  classAdded,
  classUpdated,
  skillsUpdated,
  toolsUpdated,
  asiUpdated,
  autoAbilityRollsUpdated,
  manualAbilityRollsUpdated,
  expertiseSkillsUpdated,
  racebasedAbilityBonusUpdated,
  spellAddedToInventory,
  spellRemovedFromInventory,
  racebasedSkillsUpdated,
  selectClassFeature,
  setFilteredClass,
  setSpellsAvailableForClass,
  setFilteredRace,
  clearFilteredClass,
  clearFilteredRace,
} = characterBuilderSlice.actions;
export const characterBuilderSliceReducer = characterBuilderSlice.reducer;
