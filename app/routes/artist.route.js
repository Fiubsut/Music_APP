const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artist.controller.js');
// const authenticate = require('../middlewares/authMiddleware.js');

router.post('/', artistController.createArtist);

router.get('/', artistController.getAllArtists);

router.get('/:id', artistController.getArtist);

router.put('/:id', artistController.updateArtist);

router.delete('/:id', artistController.deleteArtist);

module.exports = router;
