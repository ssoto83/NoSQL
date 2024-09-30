const mongoose = require('mongoose');
const { users, thoughts } = require('./data'); // Import data

const User = require('../models/user');
const Thought = require('../models/thought');

mongoose.connect('mongodb://localhost:27017/usersDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
 })
  .then(async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Seed new data
    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    console.log('Database seeded!');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
