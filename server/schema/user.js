const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('User', userSchema);
