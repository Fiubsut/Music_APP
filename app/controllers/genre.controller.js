const genreService = require('../services/genre.service.js');

const createGenre = async (req, res) => {
  try {
    const genre = await genreService.createGenre(req.body);
    res.status(201).json({ message: 'Genre created successfully', genre });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllGenres = async (req, res) => {
  try {
    const genres = await genreService.getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGenre = async (req, res) => {
  try {
    const genre = await genreService.getGenreById(req.params.id);
    if (!genre) return res.status(404).json({ error: 'Genre not found' });
    res.status(200).json(genre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateGenre = async (req, res) => {
  try {
    const genre = await genreService.updateGenre(req.params.id, req.body);
    res.status(200).json({ message: 'Genre updated successfully', genre });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGenre = async (req, res) => {
  try {
    await genreService.deleteGenre(req.params.id);
    res.status(200).json({ message: 'Genre deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createGenre,
  getAllGenres,
  getGenre,
  updateGenre,
  deleteGenre,
};
