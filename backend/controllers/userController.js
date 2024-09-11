const gravatar = require('gravatar');
require('dotenv').config();
const generateToken = require('../utility/generateToken');
const asyncHandler = require('../middleware/asyncHandler');

/* models */
const User = require('../models/User');
const Character = require('../models/Character');
const Dungeon = require('../models/Dungeon');

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // create and store default avatar for the new user
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });

  const user = await User.create({
    name,
    username,
    email,
    avatar,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
};

// @route    GET /api/users
// @desc     get all users
// @access   Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  console.log('GET all users in user controller:', users);
  res.status(200).json(users);
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  let charactersInProfile = await Character.find({ userId: req.user._id });
  console.log('in GET user by id -> characters by user:', charactersInProfile);
  let dungeonsInProfile = await Dungeon.find({ userId: req.user._id });
  console.log('in GET user by id -> dungeons by user:', dungeonsInProfile);

  if (user) {
    if (charactersInProfile || dungeonsInProfile) {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        characters: charactersInProfile || [],
        dungeons: dungeonsInProfile || [],
      });
    } else {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        characters: [],
        dungeons: [],
      });
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @route    GET /api/users/profile/:id
// @desc     get users profile by id
// @access   Public
const getUserById = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const user = await User.findById(id).select('-password');
  console.log('in GET user by id:', user);
  // get all the characters the user has created utilizing the userId on each character
  let usersCharacters = await Character.find({ userId: id });
  console.log('in GET user by id -> characters by user:', usersCharacters);
  let usersDungeons = await Dungeon.find({ userId: id });
  console.log('in GET user by id -> dungeons by user:', usersDungeons);
  if (user) {
    res.status(200).json({
      ...user,
      characters: usersCharacters,
      dungeons: usersDungeons,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update route - update a user by id
// @route    PUT api/users/:id
// @desc     update a users username or password
// @access   Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.avatar = req.body.avatar || user.avatar;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Delete route - delete a user by id
// @route    DELETE /api/users/:id
// @desc     Delete user and characters and dungeons
// @access   Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  const usersCharacters = await Character.find({ userId: id });
  const usersDungeons = await Dungeon.find({ userId: id });

  if (user) {
    await User.deleteOne({ _id: user._id });
    await Character.deleteMany(usersCharacters);
    await Dungeon.deleteMany(usersDungeons);

    res.json({ message: `user with id: ${id} has been successfully deleted` });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  getUserById,
  getUserProfile,
  updateUser,
  deleteUser,
};
