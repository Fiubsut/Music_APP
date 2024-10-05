// models/Genre.js
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  GenreID: {
    type: Number,
    unique: true,
    required: true,
  },
  GenreName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Genre', genreSchema);
