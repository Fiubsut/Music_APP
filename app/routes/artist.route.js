// routes/artistRoutes.js
const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artist.controller.js');
// const authenticate = require('../middlewares/authMiddleware.js');

// Tạo nghệ sĩ mới
router.post('/', artistController.createArtist);

// Lấy tất cả nghệ sĩ
router.get('/', artistController.getAllArtists);

// Lấy thông tin nghệ sĩ theo ID
router.get('/:id', artistController.getArtist);

// Cập nhật thông tin nghệ sĩ
router.put('/:id', artistController.updateArtist);

// Xóa nghệ sĩ
router.delete('/:id', artistController.deleteArtist);

module.exports = router;
