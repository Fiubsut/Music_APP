// routes/trackRoutes.js
const express = require('express');
const router = express.Router();
const trackController = require('../controllers/track.controller.js');
const authenticate = require('../middlewares/authMiddleware.js');

// Tạo bài hát mới (yêu cầu xác thực)
router.post('/', authenticate, trackController.createTrack);

// Lấy tất cả bài hát
router.get('/', trackController.getAllTracks);

// Lấy thông tin bài hát theo ID
router.get('/:id', trackController.getTrack);

// Cập nhật thông tin bài hát (yêu cầu xác thực)
router.put('/:id', authenticate, trackController.updateTrack);

// Xóa bài hát (yêu cầu xác thực)
router.delete('/:id', authenticate, trackController.deleteTrack);

module.exports = router;
