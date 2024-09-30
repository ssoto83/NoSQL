const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addReaction,
  removeReaction,
  addFriend,
  removeFriend
} = require("../../controllers/userController");

console.log({ getUsers, getSingleUser, createUser, deleteUser, updateUser, addReaction, removeReaction, addFriend, removeFriend });
// api/users
router.route("/")
  .get(async (req, res) => {
    console.log('GET /users'); // Log when this endpoint is hit
    await getUsers(req, res);
  })
  .post(async (req, res) => {
    console.log('POST /users'); // Log when this endpoint is hit
    await createUser(req, res);
  });

// users/:userId
router.route("/:userId")
  .get(async (req, res) => {
    console.log(`GET /users/${req.params.userId}`); // Log when this endpoint is hit
    await getSingleUser(req, res);
  })
  .put(async (req, res) => {
    console.log(`PUT /users/${req.params.userId}`); // Log when this endpoint is hit
    await updateUser(req, res);
  })
  .delete(async (req, res) => {
    console.log(`DELETE /users/${req.params.userId}`); // Log when this endpoint is hit
    await deleteUser(req, res);
  });

// users/:userId/reactions
router.route("/:userId/reactions")
  .post(async (req, res) => {
    console.log(`POST /users/${req.params.userId}/reactions`); // Log when this endpoint is hit
    await addReaction(req, res);
  });

// users/:userId/reactions/:reactionId
router.route("/:userId/reactions/:reactionId")
  .delete(async (req, res) => {
    console.log(`DELETE /api/users/${req.params.userId}/reactions/${req.params.reactionId}`); // Log when this endpoint is hit
    await removeReaction(req, res);
  });

// users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend) // Post to add a new friend to a user's friend list
  .delete(removeFriend); // Delete to remove a friend from a user's friend list

module.exports = router;
