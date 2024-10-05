// routes/albumRoutes.js
const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album.controller.js');
const authenticate = require('../middlewares/authMiddleware.js');

// Tạo album mới (yêu cầu xác thực)
router.post('/', authenticate, albumController.createAlbum);

// Lấy tất cả album
router.get('/', albumController.getAllAlbums);

// Lấy thông tin album theo ID
router.get('/:id', albumController.getAlbum);

// Cập nhật thông tin album (yêu cầu xác thực)
router.put('/:id', authenticate, albumController.updateAlbum);

// Xóa album (yêu cầu xác thực)
router.delete('/:id', authenticate, albumController.deleteAlbum);

module.exports = router;
