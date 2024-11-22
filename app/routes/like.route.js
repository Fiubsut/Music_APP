const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller.js');

router.post('/', likeController.createLike);

router.get('/', likeController.getAllLikes);

router.get('/:id', likeController.getLike);

router.delete('/:id', likeController.deleteLike);

module.exports = router;
