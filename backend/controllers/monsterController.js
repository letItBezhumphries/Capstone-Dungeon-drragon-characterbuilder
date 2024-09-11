const asyncHandler = require('../middleware/asyncHandler');
const Monster = require('../models/Monster');

// @desc:  fetch all Monsters
// @route:  GET /api/monsters
// @access:  Public
const getMonsters = asyncHandler(async (req, res) => {
  const monsters = await Monster.find({});
  console.log('in getMonsters controller', monsters);
  res.status(200).json(monsters);
});

module.exports = {
  getMonsters,
};
