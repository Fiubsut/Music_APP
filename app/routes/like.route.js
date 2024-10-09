// routes/likeRoutes.js
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller.js');
// const authenticate = require('../middlewares/authMiddleware.js');

// Tạo like mới
router.post('/', likeController.createLike);

// Lấy tất cả likes
router.get('/', likeController.getAllLikes);

// Lấy thông tin like theo ID
router.get('/:id', likeController.getLike);

// Xóa like
router.delete('/:id', likeController.deleteLike);

module.exports = router;
