// routes/trackRoutes.js
const express = require('express');
const router = express.Router();
const trackController = require('../controllers/track.controller.js');
// const authenticate = require('../middlewares/authMiddleware.js');

// Tạo bài hát mới
router.post('/', trackController.createTrack);

// Lấy tất cả bài hát
router.get('/', trackController.getAllTracks);

// Lấy thông tin bài hát theo ID
router.get('/:id', trackController.getTrack);

// Cập nhật thông tin bài hát
router.put('/:id', trackController.updateTrack);

// Xóa bài hát
router.delete('/:id', trackController.deleteTrack);

module.exports = router;
