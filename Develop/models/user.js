const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: {
      type: String,
      required: true,
      max_length: 50,
    },
    friends: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const user = model("user", userSchema);

module.exports = user;
