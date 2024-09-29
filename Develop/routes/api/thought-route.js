const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
  addFriend,
  removeFriend
} = require('../../controllers/thoughtController');

// Check for undefined functions
console.log({ getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction, addFriend, removeFriend });

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
  .post(addReaction) // Pos to create a reaction
  .delete(removeReaction); // Delete to pull and remove a reaction by its reactionId

// /api/users/:userId/friends/:friendId
router.route('/users/:userId/friends/:friendId')
  //.post(addFriend) // Post to add a new friend to a user's friend list
  //.delete(removeFriend); // Delete to remove a friend from a user's friend list

module.exports = router;

