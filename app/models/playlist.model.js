// models/Playlist.js
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  PlaylistID: {
    type: Number,
    unique: true,
    required: true,
  },
  PlaylistName: {
    type: String,
    required: true,
    trim: true,
  },
  UserID: {
    type: mongoose.Schema.Types.Number,
    ref: 'User',
    required: true,
  },
  CreationDate: {
    type: Date,
    default: Date.now,
  },
  TrackIDs: [{
    type: mongoose.Schema.Types.Number,
    ref: 'Track',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Playlist', playlistSchema);
