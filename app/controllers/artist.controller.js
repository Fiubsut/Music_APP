// controllers/artistController.js
const artistService = require('../services/artist.service.js');

const createArtist = async (req, res) => {
  try {
    const artist = await artistService.createArtist(req.body);
    res.status(201).json({ message: 'Artist created successfully', artist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllArtists = async (req, res) => {
  try {
    const artists = await artistService.getAllArtists();
    res.status(200).json(artists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getArtist = async (req, res) => {
  try {
    const artist = await artistService.getArtistById(req.params.id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    res.status(200).json(artist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateArtist = async (req, res) => {
  try {
    const artist = await artistService.updateArtist(req.params.id, req.body);
    res.status(200).json({ message: 'Artist updated successfully', artist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteArtist = async (req, res) => {
  try {
    await artistService.deleteArtist(req.params.id);
    res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createArtist,
  getAllArtists,
  getArtist,
  updateArtist,
  deleteArtist,
};
