// routes/likeRoutes.js
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller.js');
const authenticate = require('../middlewares/authMiddleware.js');

// Tạo like mới (yêu cầu xác thực)
router.post('/', authenticate, likeController.createLike);

// Lấy tất cả likes
router.get('/', authenticate, likeController.getAllLikes);

// Lấy thông tin like theo ID (yêu cầu xác thực)
router.get('/:id', authenticate, likeController.getLike);

// Xóa like (yêu cầu xác thực)
router.delete('/:id', authenticate, likeController.deleteLike);

module.exports = router;
