const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  albumName: {
    type: String,
    required: true,
    trim: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  artistID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  trackIDs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
  }],
  coverImage: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);
