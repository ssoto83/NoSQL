const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// Check for undefined functions
console.log({ getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction });

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought) // Get thought by Id
  .put(updateThought) // Update a thought by Id
  .delete(deleteThought); // Delete a thought by id

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction) // Post to create a reaction
  .delete(removeReaction); // Delete to pull and remove a reaction by its reactionId

module.exports = router;

