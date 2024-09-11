const mongoose = require('mongoose');

const MonsterSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    subtype: {
      type: String,
    },
    alignment: {
      type: String,
    },
    img_main: {
      type: String,
      required: true,
    },
    challenge_rating: {
      type: Number,
      required: false,
    },
    legendary_desc: {
      type: String,
    },
    actions: [
      {
        name: {
          type: String,
        },
        desc: {
          type: String,
        },
        attack_bonus: {
          type: Number,
        },
        damage_dice: {
          type: String,
        },
        damage_bonus: {
          type: Number,
        },
      },
    ],
    legendary_actions: [
      {
        name: {
          type: String,
        },
        desc: {
          type: String,
        },
        attack_bonus: {
          type: Number,
        },
        damage_dice: {
          type: String,
        },
        damage_bonus: {
          type: Number,
        },
      },
    ],
    special_abilities: [
      {
        name: {
          type: String,
        },
        desc: {
          type: String,
        },
        attack_bonus: {
          type: Number,
        },
        damage_dice: {
          type: String,
        },
        damage_bonus: {
          type: Number,
        },
      },
    ],
    armor_class: {
      type: Number,
    },
    armor_desc: {
      type: String,
    },
    hit_points: {
      type: Number,
    },
    hit_dice: {
      type: String,
    },
    speed: {
      walk: {
        type: Number,
      },
      swim: {
        type: Number,
      },
      fly: {
        type: Number,
      },
    },
    strength: {
      type: Number,
    },
    constitution: {
      type: Number,
    },
    intelligence: {
      type: Number,
    },
    wisdom: {
      type: Number,
    },
    dexterity: {
      type: Number,
    },
    charisma: {
      type: Number,
    },
    charisma_save: {
      type: Number,
      default: null,
    },
    strength_save: {
      type: Number,
      default: null,
    },
    dexterity_save: {
      type: Number,
      default: null,
    },
    constitution_save: {
      type: Number,
      default: null,
    },
    intelligence_save: {
      type: Number,
      default: null,
    },
    wisdom_save: {
      type: Number,
      default: null,
    },
    charisma_save: {
      type: Number,
      default: null,
    },
    perception: {
      type: Number,
      default: null,
    },
    skills: {},
    senses: {
      type: String,
    },
    languages: {
      type: String,
    },
    bonus_actions: [
      {
        name: {
          type: String,
        },
        desc: {
          type: String,
        },
        attack_bonus: {
          type: Number,
        },
        damage_dice: {
          type: String,
        },
        damage_bonus: {
          type: Number,
        },
      },
    ],
    reactions: [
      {
        name: {
          type: String,
        },
        desc: {
          type: String,
        },
        attack_bonus: {
          type: Number,
        },
        damage_dice: {
          type: String,
        },
        damage_bonus: {
          type: Number,
        },
      },
    ],
    spell_list: [
      {
        name: {
          type: String,
        },
        desc: {
          type: String,
        },
        attack_bonus: {
          type: Number,
        },
        damage_dice: {
          type: String,
        },
        damage_bonus: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Monster = mongoose.model('Monster', MonsterSchema);
