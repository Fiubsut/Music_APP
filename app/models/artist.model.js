// models/Artist.js
const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);
