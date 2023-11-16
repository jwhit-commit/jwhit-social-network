const router = require('express').Router();
const {
  getThoughts,
  newThought,
  getSingleThought,
  updateThought,
  deleteThought
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(newThought)

// /api/users/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router; 