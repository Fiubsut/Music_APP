// routes/albumRoutes.js
const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album.controller.js');
// const authenticate = require('../middlewares/authMiddleware.js');

// Tạo album mới
router.post('/', albumController.createAlbum);

// Lấy tất cả album
router.get('/', albumController.getAllAlbums);

// Lấy thông tin album theo ID
router.get('/:id', albumController.getAlbum);

// Cập nhật thông tin album
router.put('/:id', albumController.updateAlbum);

// Xóa album
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;
