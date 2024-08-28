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

const auth = require('../middleware/authMiddleware.js');

router.get('/', getCharacters);
router
  .get('/:chrId', getCharacterById)
  .put('/:chrId', updateCharacter)
  .delete('/:chrId', deleteCharacter);
router.post('/new/:id', createNewCharacter);

module.exports = router;
