const mongoose = require('mongoose');
const { users, thoughts } = require('./data'); // Import data

const User = require('./models/User');
const Thought = require('./models/Thought');

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});
    await User.insertMany(users);
    await Thought.insertMany(thoughts);
    console.log('Database seeded!');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
