const Artist = require('../models/artist.model.js');

const createArtist = async (artistData) => {

  const artist = new Artist(artistData);
  await artist.save();
  return artist;
};

const getAllArtists = async () => {
  const artists = await Artist.find();
  return artists;
};

const getArtistById = async (id) => {
  const artist = await Artist.findOne({ _id: id });
  return artist;
};

const updateArtist = async (id, updateData) => {
  const artist = await Artist.findOneAndUpdate({ _id: id }, updateData, { new: true });
  if (!artist) throw new Error('Artist not found');
  return artist;
};

const deleteArtist = async (id) => {
  const artist = await Artist.findOneAndDelete({ _id: id });
  if (!artist) throw new Error('Artist not found');
  return;
};

module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
};
