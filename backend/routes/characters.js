const express = require('express');
const router = express.Router();

/* controllers */
const {
  getCharacters,
  getCharacterById,
  createNewCharacter,
  updateCharacter,
  deleteCharacter,
} = require('../controllers/characterController');

const checkObjectId = require('../middleware/checkObjectId');
const auth = require('../middleware/authMiddleware.js');

router.get('/', getCharacters);
router
  .get('/:chrId', checkObjectId, getCharacterById)
  .put('/:chrId', checkObjectId, updateCharacter)
  .delete('/:chrId', checkObjectId, deleteCharacter);
router.post('/new/:id', checkObjectId, createNewCharacter);

module.exports = router;
