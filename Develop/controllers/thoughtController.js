const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate('users');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .populate('users');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
        // Update a thought
        async updateThought(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $set: req.body },
                    { runValidators: true, new: true }
                );
        
                if (!thought) {
                     res.status(404).json({ message: 'No thought with this id!' });
                }
        
                res.json(thought);
               } catch (err) {
                res.status(500).json(err);
               }
           },
     // Delete a thought
    async deleteThought(req, res) {
        try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        }

        await User.deleteMany({ _id: { $in: thought.users } });
        res.json({ message: 'Thought and users deleted!' });
    } catch(err) {
        res.status(500).json(err);
    }
},
 
     // Add an reaction to a thought
  async addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);

    try {
      const thought = await thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No reaction found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction from a thought
  async removeReaction(req, res) {
    try {
      const thought = await thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
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
          { $addToSet: { friends: friendId } }, // Assuming users have a friends field
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.status(200).json({ message: 'Friend added successfully' });
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
          return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.status(200).json({ message: 'Friend removed successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
},
};