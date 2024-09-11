const express = require('express');
const router = express.Router();

/* controllers */
const {
  getCharacters,
  getCharacterById,
  createNewCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require('../controllers/characterController');

const { protect } = require('../middleware/authMiddleware');
const checkObjectId = require('../middleware/checkObjectId');

router.route('/').get(getCharacters).post(protect, createCharacter);

router
  .route('/:chrId')
  .get(checkObjectId, getCharacterById)
  .delete(checkObjectId, protect, deleteCharacter)
  .put(checkObjectId, protect, updateCharacter);
router.put('/update/:chrId', protect, updateCharacter);
router.post('/new/:id', protect, createNewCharacter);

module.exports = router;
