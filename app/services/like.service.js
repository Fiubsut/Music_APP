// services/likeService.js
const Like = require('../models/like.model.js');

const createLike = async (likeData) => {
  const like = new Like(likeData);
  await like.save();
  return like;
};

const getAllLikes = async () => {
  const likes = await Like.find()
    .populate('userID', 'userName')
    .populate('trackID', 'trackName');
  return likes;
};

const getLikeById = async (id) => {
  const like = await Like.findOne({ _id: id })
    .populate('userID', 'userName')
    .populate('trackID', 'trackName');
  return like;
};

const deleteLike = async (id) => {
  const like = await Like.findOneAndDelete({ _id: id });
  if (!like) throw new Error('Like not found');
  return;
};

module.exports = {
  createLike,
  getAllLikes,
  getLikeById,
  deleteLike,
};
