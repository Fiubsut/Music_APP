// models/Track.js
const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  trackName: {
    type: String,
    required: true,
    trim: true,
  },
  albumID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
  },
  artistID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  genreIDs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Track', trackSchema);
