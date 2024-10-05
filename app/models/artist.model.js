// models/Artist.js
const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  ArtistID: {
    type: Number,
    unique: true,
    required: true,
  },
  ArtistName: {
    type: String,
    required: true,
    trim: true,
  },
  Genre: {
    type: String,
    default: '',
  },
  Country: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);
