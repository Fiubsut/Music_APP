const Album = require('../models/album.model.js');

const createAlbum = async (albumData) => {
  const album = new Album(albumData);
  await album.save();
  return album;
};

const getAllAlbums = async () => {
  const albums = await Album.find()
    .populate('artistID', 'artistName')
    .populate('trackIDs', 'trackName');
  return albums;
};

const getAlbumById = async (id) => {
  const album = await Album.findOne({ _id: id })
    .populate('artistID', 'artistName')
    .populate('trackIDs', 'trackName');
  return album;
};

const updateAlbum = async (id, updateData) => {
  const album = await Album.findOneAndUpdate({ _id: id }, updateData, { new: true })
    .populate('artistID', 'artistName')
    .populate('trackIDs', '_id');
  if (!album) throw new Error('Album not found');
  return album;
};

const deleteAlbum = async (id) => {
  const album = await Album.findOneAndDelete({ _id: id });
  if (!album) throw new Error('Album not found');
  return;
};


const addTracksToAlbum = async (albumId, trackIDs) => {
  const album = await Album.findById(albumId);
  if (!album) throw new Error('Album not found');

  // Lọc ra các track mới chưa có trong album
  const newTrackIDs = trackIDs.filter(trackID => !album.trackIDs.includes(trackID));

  if (newTrackIDs.length === 0) throw new Error('No new tracks to add');

  album.trackIDs.push(...newTrackIDs);

  await album.save();

  // Populate các trường cần thiết trên document
  const populatedAlbum = await Album.findById(albumId)
    .populate('artistID', 'artistName') // Chỉ lấy artistName từ artistID
    .populate('trackIDs', 'trackName'); // Chỉ lấy trackName từ trackIDs

  return populatedAlbum;
};



const removeTrackFromAlbum = async (albumId, trackID) => {
  const album = await Album.findOne({ _id: albumId }).populate('artistID', 'artistName').populate('trackIDs', 'trackName');
  if (!album) throw new Error('Album not found');

  // Kiểm tra xem trackID có trong album không
  if (!album.trackIDs.some(track => track._id.toString() === trackID.toString())) {
    throw new Error('Track not found in album');
  }

  // Lọc bỏ track ID khỏi album
  album.trackIDs = album.trackIDs.filter(track => track._id.toString() !== trackID.toString());

  await album.save();
  return album;
};


module.exports = {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  addTracksToAlbum,
  removeTrackFromAlbum,
};
