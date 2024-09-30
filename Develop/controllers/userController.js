const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// Aggregate function to get the number of users overall
const headCount = async () => {
  const numberOfUsers = await User.aggregate().count("userCount");
  return numberOfUsers;
};

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      console.log("Getting all users");

      const userObj = {
        users,
        headCount: await headCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findById({ _id: req.params.userId })
      .select('-__v');

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
     
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(req.body);
      console.log("Updating user with ID");
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the thought
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      const thought = await Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "User deleted, but no thoughts found",
        });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an reaction to a user
  async addReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);

    try {
      const user = await User.findById(
        { _id: req.params.userId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction from a user
  async removeReaction(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a friend
  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Remove a friend
  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } }, // Assuming users have a friends field
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
