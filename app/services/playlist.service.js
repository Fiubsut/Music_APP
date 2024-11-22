const Playlist = require('../models/playlist.model.js');

const createPlaylist = async (playlistData) => {
  const playlist = new Playlist(playlistData);
  await playlist.save();
  return playlist;
};

const getAllPlaylists = async () => {
  const playlists = await Playlist.find()
    .populate('userID', 'userName')
    .populate('trackIDs', 'trackName');
  return playlists;
};

const getPlaylistById = async (id) => {
  const playlist = await Playlist.findOne({ _id: id })
    .populate('userID', 'userName')
    .populate('trackIDs', 'trackName');
  return playlist;
};

const updatePlaylist = async (id, updateData) => {
  const updateQuery = {};

  if (updateData.trackIDs) {
    updateQuery.$addToSet = { trackIDs: { $each: updateData.trackIDs } };
  }

  if (updateData.playlistName) {
    updateQuery.$set = { playlistName: updateData.playlistName };
  }

  const playlist = await Playlist.findOneAndUpdate(
    { _id: id },
    updateQuery,
    { new: true }
  )
    .populate('userID', 'userName')
    .populate('trackIDs', 'trackName');

  if (!playlist) throw new Error('Playlist not found');
  return playlist;
};



const deletePlaylist = async (id) => {
  const playlist = await Playlist.findOneAndDelete({ _id: id });
  if (!playlist) throw new Error('Playlist not found');
  return;
};

module.exports = {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
};
