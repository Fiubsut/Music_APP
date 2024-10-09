const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller.js');
// const authenticate = require('../middlewares/authMiddleware.js');

// Tạo thể loại mới
router.post('/', genreController.createGenre);

router.get('/', genreController.getAllGenres);

router.get('/:id', genreController.getGenre);

router.put('/:id', genreController.updateGenre);

router.delete('/:id', genreController.deleteGenre);

module.exports = router;
