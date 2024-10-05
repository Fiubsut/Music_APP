// services/genreService.js
const Genre = require('../models/genre.model.js');

const createGenre = async (genreData) => {
  const lastGenre = await Genre.findOne().sort({ GenreID: -1 });
  const newGenreID = lastGenre ? lastGenre.GenreID + 1 : 1;
  genreData.GenreID = newGenreID;

  const genre = new Genre(genreData);
  await genre.save();
  return genre;
};

const getAllGenres = async () => {
  const genres = await Genre.find();
  return genres;
};

const getGenreById = async (id) => {
  const genre = await Genre.findOne({ GenreID: id });
  return genre;
};

const updateGenre = async (id, updateData) => {
  const genre = await Genre.findOneAndUpdate({ GenreID: id }, updateData, { new: true });
  if (!genre) throw new Error('Genre not found');
  return genre;
};

const deleteGenre = async (id) => {
  const genre = await Genre.findOneAndDelete({ GenreID: id });
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
