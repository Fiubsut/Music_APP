// models/Album.js
const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  AlbumID: {
    type: Number,
    unique: true,
    required: true,
  },
  AlbumName: {
    type: String,
    required: true,
    trim: true,
  },
  ReleaseDate: {
    type: Date,
    required: true,
  },
  ArtistID: {
    type: mongoose.Schema.Types.Number,
    ref: 'Artist',
    required: true,
  },
  CoverImage: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);
