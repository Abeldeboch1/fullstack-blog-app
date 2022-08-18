const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  image: {
    required: false,
    type: String,
  },
  date: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('User', userSchema);
