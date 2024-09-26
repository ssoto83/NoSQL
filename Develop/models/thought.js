const { Schema, model } = require("mongoose");

// Reaction schema definition (you'll need to define this as per your requirements)
const reactionSchema = new Schema({
  // Define the fields of your reactionSchema here
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280 // Assuming reactions can also have a character limit
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString() // Example formatting
  }
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,    // Minimum length
      maxlength: 280,   // Maximum length
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(), // Formatting on query
    },
    username: {
      type: String,
      required: true, // Make sure this is a String
    },
    reactions: [reactionSchema], // Use the defined reactionSchema
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // Include virtuals in JSON output
    },
    id: false,
  }
);

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length; // Return the length of the reactions array
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;