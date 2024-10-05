// routes/playlistRoutes.js
const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist.controller.js');
const authenticate = require('../middlewares/authMiddleware.js');

// Tạo playlist mới (yêu cầu xác thực)
router.post('/', authenticate, playlistController.createPlaylist);

// Lấy tất cả playlist
router.get('/', authenticate, playlistController.getAllPlaylists);

// Lấy thông tin playlist theo ID (yêu cầu xác thực)
router.get('/:id', authenticate, playlistController.getPlaylist);

// Cập nhật thông tin playlist (yêu cầu xác thực)
router.put('/:id', authenticate, playlistController.updatePlaylist);

// Xóa playlist (yêu cầu xác thực)
router.delete('/:id', authenticate, playlistController.deletePlaylist);

module.exports = router;
