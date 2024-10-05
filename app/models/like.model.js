// models/Like.js
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  LikeID: {
    type: Number,
    unique: true,
    required: true,
  },
  UserID: {
    type: mongoose.Schema.Types.Number,
    ref: 'User',
    required: true,
  },
  TrackID: {
    type: mongoose.Schema.Types.Number,
    ref: 'Track',
    required: true,
  },
  DateLiked: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);
