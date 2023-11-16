const router = require('express').Router();
const {
  getUsers,
  newUser,
  getSingleUser,
  updateUser,
  deleteUser
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(newUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);


module.exports = router; 