const express = require('express');
/* controllers */
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(registerUser).get(getUsers);
// router.route('/').post(registerUser).get(protect, getUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile);
router
  .route('/:id')
  .get(protect, getUserById)
  .delete(protect, deleteUser)
  .put(protect, updateUser);

module.exports = router;
