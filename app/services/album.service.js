// services/albumService.js
const Album = require('../models/album.model.js');

const createAlbum = async (albumData) => {
  const lastAlbum = await Album.findOne().sort({ AlbumID: -1 });
  const newAlbumID = lastAlbum ? lastAlbum.AlbumID + 1 : 1;
  albumData.AlbumID = newAlbumID;

  const album = new Album(albumData);
  await album.save();
  return album;
};

const getAllAlbums = async () => {
  const albums = await Album.find().populate('ArtistID', 'ArtistName');
  return albums;
};

const getAlbumById = async (id) => {
  const album = await Album.findOne({ AlbumID: id }).populate('ArtistID', 'ArtistName');
  return album;
};

const updateAlbum = async (id, updateData) => {
  const album = await Album.findOneAndUpdate({ AlbumID: id }, updateData, { new: true });
  if (!album) throw new Error('Album not found');
  return album;
};

const deleteAlbum = async (id) => {
  const album = await Album.findOneAndDelete({ AlbumID: id });
  if (!album) throw new Error('Album not found');
  return;
};

module.exports = {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
};
