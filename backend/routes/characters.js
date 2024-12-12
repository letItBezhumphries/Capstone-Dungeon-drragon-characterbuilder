const express = require('express');
const router = express.Router();

/* controllers */
const {
  getCharacters,
  getCharacterById,
  createNewCharacter,
  initCharacter,
  updateCharacter,
  deleteCharacter,
} = require('../controllers/characterController');

const { protect } = require('../middleware/authMiddleware');
const checkObjectId = require('../middleware/checkObjectId');

// api/characters
router.route('/').get(getCharacters).post(protect, initCharacter);

router
  .route('/:chrId')
  .get(checkObjectId, getCharacterById)
  // .delete(checkObjectId, protect, deleteCharacter)
  .delete(protect, deleteCharacter)
  .put(protect, updateCharacter);
router.put('/update/:chrId', protect, updateCharacter);
router.post('/new/:id', protect, createNewCharacter);

module.exports = router;
