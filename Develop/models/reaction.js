const { Schema } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Schema.Types.ObjectId(), // Set default value to a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, // Maximum of 280 characters
    },
    username: {
      type: String,
      required: true, // Required field
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default value is the current timestamp
      get: (timestamp) => new Date(timestamp).toLocaleString(), // Format the timestamp on query
    },
  },
  {
    toJSON: {
      getters: true, // Include getters in JSON output
    },
    id: false, // Prevent Mongoose from adding an additional `id` field
  }
);

module.exports = reactionSchema; // Export the reactionSchema for use in the Thought model