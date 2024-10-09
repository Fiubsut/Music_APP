const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trackID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
  },
  dateLiked: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);
