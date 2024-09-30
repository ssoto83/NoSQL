const { Schema, model } = require('mongoose');
const validator = require('validator'); // For email validation

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure username is unique
      trim: true,   // Trim whitespace
      maxLength: 50 // Corrected from max_length to maxLength
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      validate: {
        validator: function(v) {
          return validator.isEmail(v); // Validate email format
        },
        message: 'Invalid email format' 
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought', // Reference to the Thought model
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Self-reference to User model
      }
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false // Prevents the creation of an additional `id` field
  }
);

// Virtual for friend count
userSchema.virtual('friendCount').get(function() {
  return this.friends.length; // Return the length of the friends array
});

const User = model('User', userSchema); // Use capital 'User'

module.exports = User;