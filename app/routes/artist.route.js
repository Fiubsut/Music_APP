// routes/artistRoutes.js
const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artist.controller.js');
const authenticate = require('../middlewares/authMiddleware.js');

// Tạo nghệ sĩ mới (yêu cầu xác thực)
router.post('/', authenticate, artistController.createArtist);

// Lấy tất cả nghệ sĩ
router.get('/', artistController.getAllArtists);

// Lấy thông tin nghệ sĩ theo ID
router.get('/:id', artistController.getArtist);

// Cập nhật thông tin nghệ sĩ (yêu cầu xác thực)
router.put('/:id', authenticate, artistController.updateArtist);

// Xóa nghệ sĩ (yêu cầu xác thực)
router.delete('/:id', authenticate, artistController.deleteArtist);

module.exports = router;
