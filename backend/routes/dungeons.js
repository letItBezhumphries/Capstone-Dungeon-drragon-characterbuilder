const express = require('express');
const router = express.Router();

/* require in Dungeon Controllers */
const {
  getDungeons,
  getDungeonById,
  createNewDungeon,
  updateDungeon,
  deleteDungeon,
} = require('../controllers/dungeonController');

const { protect } = require('../middleware/authMiddleware');
const checkObjectId = require('../middleware/checkObjectId');

router.get('/', getDungeons);
router
  .get('/:dgId', checkObjectId, getDungeonById)
  .put('/:dgId', protect, updateDungeon)
  .delete('/:dgId', protect, deleteDungeon);
router.post('/new/:id', protect, createNewDungeon);

module.exports = router;
