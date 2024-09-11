const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const User = require('../models/User');
require('dotenv').config();

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  // declare a token not initialized with a value
  let token;

  // read "jwt" from the cookie and assign the token to it
  token = req.cookie.jwt;

  if (token) {
    try {
      // store the result of verifying the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find user with the decoded token and assign the req.user to the result
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token found');
  }
});

module.exports = {
  protect,
};
