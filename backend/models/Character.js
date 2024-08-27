const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  class_type: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  age_desc: {
    type: String,
  },
  img: {
    type: String,
  },
  race: {
    type: String,
    // required: true,
  },
  alignment_desc: {
    type: String,
    // required: true,
  },
  alignment: {
    type: String,
  },
  experience_points: {
    type: Number,
    required: true,
    default: 0,
  },
  strength: {
    type: Number,
    // required: true,
  },
  dexterity: {
    type: Number,
    // required: true,
  },
  constitution: {
    type: Number,
    // required: true,
  },
  intelligence: {
    type: Number,
    // required: true,
  },
  wisdom: {
    type: Number,
    // required: true,
  },
  charisma: {
    type: Number,
    // required: true,
  },
  size: {
    type: String,
  },
  size_desc: {
    type: String,
  },
  traits: [
    {
      index: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
      desc: {
        type: String,
      },
    },
  ],
  proficiencies: [
    {
      index: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
      desc: {
        type: String,
      },
      ability_score: {
        index: {
          type: String,
        },
        name: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
  ],
  languages: [
    {
      index: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  language_desc: {
    type: String,
  },
  equipment: [
    {
      index: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  saving_throws: [
    {
      index: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  skills: [
    {
      index: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  class_specific: {
    rage_count: {
      type: Number,
    },
    rage_damage_bonus: {
      type: Number,
    },
    brutal_critical_dice: {
      type: Number,
    },
    bardic_inspiration_die: {
      type: Number,
    },
    song_of_rest_die: {
      type: Number,
    },
    magical_secrets_max_5: {
      type: Number,
    },
    magical_secrets_max_7: {
      type: Number,
    },
    magical_secrets_max_9: {
      type: Number,
    },
    channel_divinity_charges: {
      type: Number,
    },
    destroy_undead_cr: {
      type: Number,
    },
    wild_shape_max_cr: {
      type: Number,
    },
    wild_shape_swim: {
      type: Boolean,
    },
    wild_shape_fly: {
      type: Boolean,
    },
    sneak_attack: {
      dice_count: {
        type: Number,
      },
      dice_value: {
        type: Number,
      },
    },
    action_surges: {
      type: Number,
    },
    indomitable_uses: {
      type: Number,
    },
    extra_attacks: {
      type: Number,
    },
    martial_arts: {
      dice_count: {
        type: Number,
      },
      dice_value: {
        type: Number,
      },
    },
    ki_points: { type: Number },
    unarmored_movement: { type: Number },
    aura_range: {
      type: Number,
    },
    favored_enemies: {
      type: Number,
    },
    favored_terrain: {
      type: Number,
    },
    sorcery_points: {
      type: Number,
    },
    metamagic_known: {
      type: Number,
    },
    creating_spell_slots: [],
    invocations_known: {
      type: Number,
    },
    mystic_arcanum_level_6: {
      type: Number,
    },
    mystic_arcanum_level_7: {
      type: Number,
    },
    mystic_arcanum_level_8: {
      type: Number,
    },
    mystic_arcanum_level_9: {
      type: Number,
    },
    arcane_recovery_levels: {
      type: Number,
    },
  },
  // armor_class: {
  //   type: Number,
  //   required: true,
  // },
  speed: {
    walk: {
      type: Number,
    },
  },
  hit_points: {
    max: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
  },
  hit_die: {
    type: Number,
  },
  constitution_modifier: {
    type: Number,
  },
  hit_points: {
    max: {
      type: Number,
    },
    current: {
      type: Number,
    },
  },
  ability_score_bonuses: {
    type: Number,
  },
  prof_bonus: {
    type: Number,
  },
  features: [
    {
      index: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  spells: [
    {
      index: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
      level: {
        type: Number,
      },
    },
  ],
  cantrips_known: {
    type: Number,
  },
  spell_slots_level_1: {
    type: Number,
  },
  spell_slots_level_2: {
    type: Number,
  },
  spell_slots_level_3: {
    type: Number,
  },
  spell_slots_level_4: {
    type: Number,
  },
  spell_slots_level_5: {
    type: Number,
  },
  spell_slots_level_6: {
    type: Number,
  },
  spell_slots_level_7: {
    type: Number,
  },
  spell_slots_level_8: {
    type: Number,
  },
  spell_slots_level_9: {
    type: Number,
  },
  spellcasting: {
    level: {
      type: Number,
    },
    spellcasting_ability: {
      index: {
        type: String,
      },
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    info: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Character = mongoose.model('Character', CharacterSchema);
