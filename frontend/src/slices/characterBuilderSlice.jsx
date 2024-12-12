import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  userId: '',
  name: '',
  class_index: '',
  traits: [],
  class_type: '',
  race: '',
  race_index: '',
  size: {},
  age: {},
  race_desc: '',
  speed: {},
  languages: {},
  vision: '',
  asi: [],
  ability_scores: {
    strength: {
      bonus: 0,
      base_score: 0,
      modifier: 0,
      total_score: 0,
      set_score: 0,
      stacking_bonus: 0,
    },
    dexterity: {
      bonus: 0,
      base_score: 0,
      modifier: 0,
      total_score: 0,
      set_score: 0,
      stacking_bonus: 0,
    },
    constitution: {
      bonus: 0,
      base_score: 0,
      modifier: 0,
      total_score: 0,
      set_score: 0,
      stacking_bonus: 0,
    },
    intelligence: {
      bonus: 0,
      base_score: 0,
      modifier: 0,
      total_score: 0,
      set_score: 0,
      stacking_bonus: 0,
    },
    wisdom: {
      bonus: 0,
      base_score: 0,
      modifier: 0,
      total_score: 0,
      set_score: 0,
      stacking_bonus: 0,
    },
    charisma: {
      bonus: 0,
      base_score: 0,
      modifier: 0,
      total_score: 0,
      set_score: 0,
      stacking_bonus: 0,
    },
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
    spell_slots_level_1: 0,
    spell_slots_level_2: 0,
    spell_slots_level_3: 0,
    spell_slots_level_4: 0,
    spell_slots_level_5: 0,
    spell_slots_level_6: 0,
    spell_slots_level_7: 0,
    spell_slots_level_8: 0,
    spell_slots_level_9: 0,
    cantrips_known: 0,
    invocations_known: 0,
  },
  class_features: [],
  proficiencies: {
    skills: {
      selected: [],
    },
    tools: {
      selected: [],
    },
  },
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
  favored_enemy_selected: [],
  natural_explorer_selected: [],
  current_feature_options_selected: [],
  hit_points: {},
  level: 1,
  ability_score_bonuses: [],
  race_skill_selection_0: '',
  race_skill_selection_1: '',
  race_skills_selected: [],
  race_skillOptions_available: [],
  ability_bonus_selected: [],
  ability_bonus_selection_0: '',
  ability_bonus_selection_1: '',
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
      const { _id, userId } = action.payload;
      state._id = _id;
      state.userId = userId;
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

      state.race_index = index;
      state.race_desc = desc;
      state.race = name;
      state.traits = [...state.traits, ...traits];
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
        desc: languages.desc,
        known_languages: languages.known_languages,
        ...state.languages,
      };
      state.size = {
        size_type: size_raw,
        desc: size,
        ...state.size,
      };

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
      }
      state.asi = [...state.asi, ...asi];

      asi.forEach((ability) => {
        let updateAbilityKey = ability.attributes[0].toLowerCase();
        let value = ability.value;

        if (updateAbilityKey !== 'other') {
          state.ability_scores[updateAbilityKey].bonus =
            state.ability_scores[updateAbilityKey].bonus + value;
        }
      });

      if (name === 'Elf') {
        state.proficiencies.skills.selected = [
          ...state.proficiencies.skills.selected,
          'Perception',
        ];
      }
      if (name === 'Half-Orc') {
        state.proficiencies.skills.selected = [
          ...state.proficiencies.skills.selected,
          'Intimidation',
        ];
      }
      if (name === 'Tiefling') {
        state.spell_casting.cantrips_total =
          state.spell_casting.cantrips_total + 1;
        state.spell_casting.cantrips = [
          ...state.spell_casting.cantrips,
          'Thaumaturgy',
        ];
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
        spells,
      } = action.payload;

      state.class_type = name;
      state.class_index = index;
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
        cantrips_known: spellcasting.cantrips_known,
        spell_slots_level_1: spellcasting.spell_slots_level_1,
        spell_slots_level_2: spellcasting.spell_slots_level_2,
        ...spellcasting,
      };

      if (spells !== undefined) {
        if (spells.length > 0) {
          state.spells_available_to_class = [
            ...state.spells_available_to_class,
            ...spells,
          ];
        }
      }

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
      const { ability, total_choices, index } = action.payload;

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

      // to properly update the corresponding ability_bonus_selection_{index} is undefined or not
      if (index === 0) {
        if (state.ability_bonus_selection_0 !== '') {
          // update the ability
          let key = state.ability_bonus_selection_0;
          state.ability_scores[key].bonus = state.ability_scores[key].bonus - 1;

          let newKey = ability.toLowerCase();
          state.ability_bonus_selection_0 = newKey;

          state.ability_scores[newKey].bonus =
            state.ability_scores[newKey].bonus + 1;
        } else {
          // set ability_bonus_selection_0
          let key = ability.toLowerCase();
          state.ability_bonus_selection_0 = key;
          state.ability_scores[key].bonus = state.ability_scores[key].bonus + 1;
        }
      } else {
        if (state.ability_bonus_selection_1 !== '') {
          let key = state.ability_bonus_selection_1;
          state.ability_scores[key].bonus = state.ability_scores[key].bonus - 1;

          let newKey = ability.toLowerCase();
          state.ability_bonus_selection_1 = newKey;

          state.ability_scores[newKey].bonus =
            state.ability_scores[newKey].bonus + 1;
        } else {
          let key = ability.toLowerCase();
          state.ability_bonus_selection_1 = key;
          state.ability_scores[key].bonus = state.ability_scores[key].bonus + 1;
        }
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
      // first check if the current ability has a roll already selected
      let prevSelection = state.ability_scores[ability].base_score;

      if (prevSelection > 0 && roll === 0) {
        state.ability_scores[ability].base_score =
          state.ability_scores[ability].base_score - prevSelection + roll;

        state.ability_scores[ability].total_score =
          state.ability_scores[ability].total_score - prevSelection + roll;

        state.ability_scores[ability].modifier = 0;

        state.ability_autorolls_selected =
          state.ability_autorolls_selected.filter((r) => r !== prevSelection);
      } else if (prevSelection > 0 && prevSelection !== roll) {
        state.ability_scores[ability].base_score =
          state.ability_scores[ability].base_score - prevSelection + roll;
        //2
        state.ability_scores[ability].total_score =
          state.ability_scores[ability].total_score - prevSelection + roll;
        //3
        let modifier = Math.floor(
          (state.ability_scores[ability].base_score + roll - 10) / 2
        );
        state.ability_scores[ability].modifier = modifier;
        //4
        state.ability_autorolls_selected = [
          ...state.ability_autorolls_selected.filter(
            (r) => r !== prevSelection
          ),
          roll,
        ];
      } else {
        state.ability_scores[ability].base_score =
          state.ability_scores[ability].base_score + roll;

        state.ability_scores[ability].total_score =
          state.ability_scores[ability].total_score +
          state.ability_scores[ability].base_score +
          state.ability_scores[ability].bonus;

        let modifier = Math.floor(
          (state.ability_scores[ability].total_score - 10) / 2
        );

        state.ability_scores[ability].modifier = modifier;

        state.ability_autorolls_selected = [
          ...state.ability_autorolls_selected,
          roll,
        ];
      }
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
    selectClassFeatureOptions: (state, action) => {
      const { featureName, selection } = action.payload;

      if (featureName === 'Favored Enemy') {
        state.favored_enemy_selected = [
          ...state.favored_enemy_selected,
          selection,
        ];
      } else {
        state.natural_explorer_selected = [
          ...state.natural_explorer_selected,
          selection,
        ];
      }
    },
    classUpdated: (state, action) => {
      state.proficiencies = {
        tools: {
          selected: [...state.selected_class.proficiencies.tools.selected],
          ...state.proficiencies.tools,
        },
        skills: {
          selected: [...state.selected_class.proficiencies.skills.selected],
          ...state.proficiencies.skills,
        },
        ...state.proficiencies,
        ...state.selected_class.proficiencies,
      };
    },
    raceUpdated: (state, action) => {
      const { traits } = action.payload;

      traits.forEach((tr) => {
        if (tr.name === 'Ability Score Increase' && state.race !== 'Human') {
          state.asi[1].attributes = [
            ...state.asi[1].attributes,
            tr.selected[0],
          ];
          state.asi[1].attributes = state.asi[1].attributes.filter(
            (att) => att !== 'Other'
          );

          state.asi[2].attributes = [
            ...state.asi[2].attributes,
            tr.selected[1],
          ];
          state.asi[2].attributes = state.asi[2].attributes.filter(
            (att) => att !== 'Other'
          );
        }

        if (tr.name === 'Languages') {
          state.languages.known_languages = [
            ...state.languages.known_languages,
            ...tr.selected,
          ];
        }

        if (tr.name === 'Skill Versatility') {
          state.proficiencies.skills.selected = [
            ...state.proficiencies.skills.selected,
            ...tr.selected,
          ];
        }

        if (tr.name === 'Tool Proficiency') {
          state.proficiencies.tools.selected = [
            ...state.proficiencies.tools.selected,
            ...tr.selected,
          ];
        }
      });
    },
    spellAddedToInventory: (state, action) => {
      const { spell } = action.payload;

      if (
        spell.level_int === 2 &&
        state.spell_casting.level_2_spells.length <
          state.spell_casting.spell_slots_level_2
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
          state.spell_casting.spell_slots_level_1
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
          state.spell_casting.cantrips_known
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
    setFilteredRace: (state, action) => {
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
  raceUpdated,
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
  selectClassFeatureOptions,
  setFilteredClass,
  setFilteredRace,
  clearFilteredClass,
  clearFilteredRace,
} = characterBuilderSlice.actions;
export const characterBuilderSliceReducer = characterBuilderSlice.reducer;
