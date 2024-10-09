// routes/playlistRoutes.js
const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist.controller.js');
// const authenticate = require('../middlewares/authMiddleware.js');

// Tạo playlist mới
router.post('/', playlistController.createPlaylist);

// Lấy tất cả playlist
router.get('/', playlistController.getAllPlaylists);

// Lấy thông tin playlist theo ID 
router.get('/:id', playlistController.getPlaylist);

// Cập nhật thông tin playlist
router.put('/:id', playlistController.updatePlaylist);

// Xóa playlist
router.delete('/:id', playlistController.deletePlaylist);

module.exports = router;
