// services/artistService.js
const Artist = require('../models/artist.model.js');

const createArtist = async (artistData) => {
  const lastArtist = await Artist.findOne().sort({ ArtistID: -1 });
  const newArtistID = lastArtist ? lastArtist.ArtistID + 1 : 1;
  artistData.ArtistID = newArtistID;

  const artist = new Artist(artistData);
  await artist.save();
  return artist;
};

const getAllArtists = async () => {
  const artists = await Artist.find();
  return artists;
};

const getArtistById = async (id) => {
  const artist = await Artist.findOne({ ArtistID: id });
  return artist;
};

const updateArtist = async (id, updateData) => {
  const artist = await Artist.findOneAndUpdate({ ArtistID: id }, updateData, { new: true });
  if (!artist) throw new Error('Artist not found');
  return artist;
};

const deleteArtist = async (id) => {
  const artist = await Artist.findOneAndDelete({ ArtistID: id });
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
