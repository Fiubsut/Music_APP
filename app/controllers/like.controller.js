const likeService = require('../services/like.service.js');

const createLike = async (req, res) => {
  try {
    const like = await likeService.createLike(req.body);
    res.status(201).json({ message: 'Like created successfully', like });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllLikes = async (req, res) => {
  try {
    const likes = await likeService.getAllLikes();
    res.status(200).json(likes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLike = async (req, res) => {
  try {
    const like = await likeService.getLikeById(req.params.id);
    if (!like) return res.status(404).json({ error: 'Like not found' });
    res.status(200).json(like);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteLike = async (req, res) => {
  try {
    await likeService.deleteLike(req.params.id);
    res.status(200).json({ message: 'Like deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createLike,
  getAllLikes,
  getLike,
  deleteLike,
};
