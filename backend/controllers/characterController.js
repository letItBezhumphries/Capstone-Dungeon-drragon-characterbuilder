const asyncHandler = require('../middleware/asyncHandler');
const { faker } = require('@faker-js/faker');
/* require in Character Model */
const Character = require('../models/Character');

// @route    GET /api/characters
// @desc     get all characters
// @access   Public
const getCharacters = asyncHandler(async (req, res) => {
  const characters = await Character.find({}).populate('userId');
  console.log('GET all characters:', characters);
  res.status(200).json(characters);
});

// @route    GET /api/characters/:chrId
// @desc     get character by id
// @access   Public
const getCharacterById = asyncHandler(async (req, res) => {
  const { chrId } = req.params;
  console.log('param chrId:', chrId);

  const character = await Character.findById(chrId).populate('userId');

  console.log('This is the character characeter:', character);

  if (character) {
    res.status(200).json(character);
  } else {
    res.status(404);
    throw new Error('Character not found');
  }
});

// @desc    Create a character
// @route   POST /api/characters
// @access  Private
const initCharacter = asyncHandler(async (req, res) => {
  console.log('req.user:', req.user);
  const character = new Character({
    name: 'Sample name',
    userId: req.user._id,
    img: '/frontend/src/assets/stock/character_builder_bg.jpg',
  });

  const createdCharacter = await character.save();
  res.status(201).json(createdCharacter);
});

// @route    POST /api/characters/new/:id
// @desc     creates a new character
// @access   private
const createNewCharacter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log('req.body:', req.body);
  const { name, gender, class_type, age, hit_points } = req.body;

  let newCharacter = new Character({
    img: faker.image.urlLoremFlickr({ category: class_type }),
    userId: id,
    name: name,
    gender: gender,
    class_type: class_type,
    age: age,
    hit_points: hit_points,
  });

  const createdCharacter = await newCharacter.save();

  if (createdCharacter) {
    res.status(201).json(newCharacter);
  } else {
    res.status(404);
    throw new Error('Error creating new Character');
  }
});

// Update route - update a character by id
// @route    PUT /api/characters/:id
// @desc     update a character
// @access   Private
const updateCharacter = asyncHandler(async (req, res) => {
  const { chrId } = req.params;
  const { name, gender, class_type, age, hit_points, img, race } = req.body;
  const character = await Character.findById(chrId);
  // check if character was found
  if (character) {
    character.name = name;
    character.gender = gender;
    character.class_type = class_type;
    character.age = age;
    character.hit_points = hit_points;
    character.img = img;
    character.race = race;

    const updatedCharacter = await character.save();
    res.json(updatedCharacter);
  } else {
    res.status(404);
    throw new Error('Character not found');
  }
});

// @route    DELETE /api/characters/:chrId
// @desc     Delete character by id
// @access   Private
const deleteCharacter = asyncHandler(async (req, res) => {
  const { chrId } = req.params;

  const character = await Character.findById(chrId);

  if (character) {
    console.log('this is the character to delete:', character);
    await Character.deleteOne({ _id: character._id });

    res.json({
      message: `Character ${character.name} has been deleted successfully`,
    });
  } else {
    res.status(404);
    throw new Error('Character not found');
  }
});

module.exports = {
  getCharacters,
  getCharacterById,
  initCharacter,
  createNewCharacter,
  updateCharacter,
  deleteCharacter,
};
