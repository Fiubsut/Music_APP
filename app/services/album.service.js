// services/albumService.js
const Album = require('../models/album.model.js');

const createAlbum = async (albumData) => {
  const album = new Album(albumData);
  await album.save();
  return album;
};

const getAllAlbums = async () => {
  const albums = await Album.find().populate('artistID', 'artistName');
  return albums;
};

const getAlbumById = async (id) => {
  const album = await Album.findOne({ _id: id }).populate('artistID', 'artistName');
  return album;
};

const updateAlbum = async (id, updateData) => {
  const album = await Album.findOneAndUpdate({ _id: id }, updateData, { new: true });
  if (!album) throw new Error('Album not found');
  return album;
};

const deleteAlbum = async (id) => {
  const album = await Album.findOneAndDelete({ _id: id });
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
