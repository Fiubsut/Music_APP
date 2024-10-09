// routes/genreRoutes.js
const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller.js');
// const authenticate = require('../middlewares/authMiddleware.js');

// Tạo thể loại mới
router.post('/', genreController.createGenre);

// Lấy tất cả thể loại
router.get('/', genreController.getAllGenres);

// Lấy thông tin thể loại theo ID
router.get('/:id', genreController.getGenre);

// Cập nhật thông tin thể loại
router.put('/:id', genreController.updateGenre);

// Xóa thể loại
router.delete('/:id', genreController.deleteGenre);

module.exports = router;
