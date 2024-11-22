const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist.controller.js');
// const authenticate = require('../middlewares/authMiddleware.js');

router.post('/', playlistController.createPlaylist);

router.get('/', playlistController.getAllPlaylists);

router.get('/:id', playlistController.getPlaylist);

router.put('/:id', playlistController.updatePlaylist);

router.delete('/:id', playlistController.deletePlaylist);
router.delete('/:id/:trackId', playlistController.removeTrackFromPlaylist);

module.exports = router;
