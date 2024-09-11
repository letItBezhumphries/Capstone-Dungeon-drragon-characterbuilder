const asyncHandler = require('../middleware/asyncHandler');
/* require in Models */
const Dungeon = require('../models/Dungeon');
const Monster = require('../models/Monster');

// @route    GET api/dungeons
// @desc     get all dungeons
// @access   Public
const getDungeons = asyncHandler(async (req, res) => {
  const dungeons = await Dungeon.find()
    .populate({ path: 'monsters' })
    .populate('userId');

  console.log('in getDungeons -> dungeons:', dungeons);

  const monsters = await Monster.find({});

  if (dungeons) {
    res.status(200).json(dungeons);
  } else {
    res.status(404);
    throw new Error('Dungeons not found');
  }
});

// @route    GET api/dungeons/:id
// @desc     get dungeon by id
// @access   Public
const getDungeonById = asyncHandler(async (req, res) => {
  const { dgId } = req.params;

  const dungeon = await Dungeon.findById(dgId);
  console.log('in GET dungeon by id:', dungeon);

  if (dungeon) {
    res.status(200).json(dungeon);
  } else {
    res.status(404);
    throw new Error('No dungeon found');
  }
});

// @route    POST api/dungeons/new/:id
// @desc     creates a new dungeon for user
// @access   private
const createNewDungeon = asyncHandler(async (req, res) => {
  // console.log('req.body:', req.body);
  const { id } = req.params;

  const { size, dungeon_name, monsters } = req.body;

  const newDungeon = new Dungeon({
    userId: id,
    size: size,
    dungeon_name: dungeon_name,
    monsters: monsters,
  });

  const createdDungeon = await newDungeon.save();

  if (createdDungeon) {
    res.status(201).json(createdDungeon);
  } else {
    res.status(404);
    throw new Error('Error creating dungeon');
  }
});

// @route    PUT api/dungeons/:dgId
// @desc     update a dungeon size or name
// @access   Private
const updateDungeon = asyncHandler(async (req, res) => {
  const { dgId } = req.params;

  // destructure the req.body
  const { dungeon_name, size, monsters } = req.body;

  // find dungeon by id
  const dungeon = await Dungeon.findById(dgId);

  if (dungeon) {
    dungeon.dungeon_name = dungeon_name;
    dungeon.size = size;
    dungeon.monsters = monsters;

    const updatedDungeon = await dungeon.save();

    res.status(203).json(updatedDungeon);
  } else {
    res.status(404);
    throw new Error('Error updating dungeon');
  }
});

// @route    DELETE api/dungeons/:dgId
// @desc     Delete dungeon by id
// @access   Private
const deleteDungeon = asyncHandler(async (req, res) => {
  const { dgId } = req.params;

  const dungeon = await Dungeon.findById(dgId);
  console.log('DELETE dungeon by id:', dungeon);

  if (dungeon) {
    await dungeon.remove();

    res.status(204).json(dungeon);
  } else {
    res.status(404);
    throw new Error('Error deleting dungeon');
  }
});

module.exports = {
  getDungeons,
  getDungeonById,
  createNewDungeon,
  updateDungeon,
  deleteDungeon,
};
