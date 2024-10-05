// models/Track.js
const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  TrackID: {
    type: Number,
    unique: true,
    required: true,
  },
  TrackName: {
    type: String,
    required: true,
    trim: true,
  },
  AlbumID: {
    type: mongoose.Schema.Types.Number,
    ref: 'Album',
    required: true,
  },
  ArtistID: {
    type: mongoose.Schema.Types.Number,
    ref: 'Artist',
    required: true,
  },
  GenreIDs: [{
    type: mongoose.Schema.Types.Number,
    ref: 'Genre',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Track', trackSchema);
