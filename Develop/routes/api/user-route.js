const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addReaction,
  removeReaction,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId")
  .get(getSingleUser) // Get a single user by Id
  .put(updateUser) // Update user by Id
  .delete(deleteUser); // Delete user by Id

// /api/users/:userId/reaction
router.route("/:userId/reactions").post(addReaction);

// /api/users/:userId/reactions/:reactionId
router.route("/:userId/reactions/:reactionId").delete(removeReaction);

// testing for updateUsers errors
console.log('updateUser:', updateUser); // Should log the function definition

module.exports = router;
