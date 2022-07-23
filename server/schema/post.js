const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
  category: {
    required: false,
    type: String,
  },
  date: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('Posts', postSchema);
