const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album.controller.js');
// const authenticate = require('../middlewares/authMiddleware.js');

router.post('/', albumController.createAlbum);

router.get('/', albumController.getAllAlbums);

router.get('/:id', albumController.getAlbum);

router.put('/:id', albumController.updateAlbum);

router.delete('/:id', albumController.deleteAlbum);

module.exports = router;
