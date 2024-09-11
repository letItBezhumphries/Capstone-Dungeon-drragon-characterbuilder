const mongoose = require('mongoose');

const CellSchema = new mongoose.Schema({
  colIndex: {
    type: String,
    required: true,
  },
  occupiedByObject: {
    type: Boolean,
  },
  occupiedByMonster: {
    type: Boolean,
  },
  occupiedByCharacter: {
    type: Boolean,
  },
  occupiedByTrap: {
    type: Boolean,
  },
  isWall: {
    type: Boolean,
    required: true,
  },
});

const RowSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  cells: {
    type: [CellSchema],
  },
});

const DungeonSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    dungeon_name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    monsters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Monster',
      },
    ],
    // board: {
    //   type: [RowSchema],
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = Dungeon = mongoose.model('Dungeon', DungeonSchema);
