// controllers/trackController.js
const trackService = require('../services/track.service.js');

const createTrack = async (req, res) => {
  try {
    const track = await trackService.createTrack(req.body);
    res.status(201).json({ message: 'Track created successfully', track });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTracks = async (req, res) => {
  try {
    const tracks = await trackService.getAllTracks();
    res.status(200).json(tracks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTrack = async (req, res) => {
  try {
    const track = await trackService.getTrackById(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(track);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTrack = async (req, res) => {
  try {
    const track = await trackService.updateTrack(req.params.id, req.body);
    res.status(200).json({ message: 'Track updated successfully', track });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTrack = async (req, res) => {
  try {
    await trackService.deleteTrack(req.params.id);
    res.status(200).json({ message: 'Track deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTrack,
  getAllTracks,
  getTrack,
  updateTrack,
  deleteTrack,
};
