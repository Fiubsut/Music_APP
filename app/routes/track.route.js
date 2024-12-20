const express = require('express');
const router = express.Router();
const trackController = require('../controllers/track.controller.js');


// Track Routes
router.post('/', trackController.createTrack);
router.get('/', trackController.getAllTracks);
router.get('/:id', trackController.getTrack);
router.put('/:id', trackController.updateTrack);
router.delete('/:id', trackController.deleteTrack);

module.exports = router;
