const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  playlistName: {
    type: String,
    required: true,
    trim: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  trackIDs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Playlist', playlistSchema);
