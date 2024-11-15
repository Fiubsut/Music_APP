const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  trackName: {
    type: String,
    required: true,
    trim: true,
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
  trackURL: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Track', trackSchema);
