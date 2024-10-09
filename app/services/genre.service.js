// services/genreService.js
const Genre = require('../models/genre.model.js');

const createGenre = async (genreData) => {
  const genre = new Genre(genreData);
  await genre.save();
  return genre;
};

const getAllGenres = async () => {
  const genres = await Genre.find();
  return genres;
};

const getGenreById = async (id) => {
  const genre = await Genre.findOne({ _id: id });
  return genre;
};

const updateGenre = async (id, updateData) => {
  const genre = await Genre.findOneAndUpdate({ _id: id }, updateData, { new: true });
  if (!genre) throw new Error('Genre not found');
  return genre;
};

const deleteGenre = async (id) => {
  const genre = await Genre.findOneAndDelete({ _id: id });
  if (!genre) throw new Error('Genre not found');
  return;
};

module.exports = {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
};
