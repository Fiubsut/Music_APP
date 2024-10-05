// routes/genreRoutes.js
const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller.js');
const authenticate = require('../middlewares/authMiddleware.js');

// Tạo thể loại mới (yêu cầu xác thực)
router.post('/', authenticate, genreController.createGenre);

// Lấy tất cả thể loại
router.get('/', genreController.getAllGenres);

// Lấy thông tin thể loại theo ID
router.get('/:id', genreController.getGenre);

// Cập nhật thông tin thể loại (yêu cầu xác thực)
router.put('/:id', authenticate, genreController.updateGenre);

// Xóa thể loại (yêu cầu xác thực)
router.delete('/:id', authenticate, genreController.deleteGenre);

module.exports = router;
