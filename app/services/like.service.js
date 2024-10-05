// services/likeService.js
const Like = require('../models/like.model.js');

const createLike = async (likeData) => {
  const lastLike = await Like.findOne().sort({ LikeID: -1 });
  const newLikeID = lastLike ? lastLike.LikeID + 1 : 1;
  likeData.LikeID = newLikeID;

  const like = new Like(likeData);
  await like.save();
  return like;
};

const getAllLikes = async () => {
  const likes = await Like.find()
    .populate('UserID', 'UserName')
    .populate('TrackID', 'TrackName');
  return likes;
};

const getLikeById = async (id) => {
  const like = await Like.findOne({ LikeID: id })
    .populate('UserID', 'UserName')
    .populate('TrackID', 'TrackName');
  return like;
};

const deleteLike = async (id) => {
  const like = await Like.findOneAndDelete({ LikeID: id });
  if (!like) throw new Error('Like not found');
  return;
};

module.exports = {
  createLike,
  getAllLikes,
  getLikeById,
  deleteLike,
};
