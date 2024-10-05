// services/playlistService.js
const Playlist = require('../models/playlist.model.js');

const createPlaylist = async (playlistData) => {
  const lastPlaylist = await Playlist.findOne().sort({ PlaylistID: -1 });
  const newPlaylistID = lastPlaylist ? lastPlaylist.PlaylistID + 1 : 1;
  playlistData.PlaylistID = newPlaylistID;

  const playlist = new Playlist(playlistData);
  await playlist.save();
  return playlist;
};

const getAllPlaylists = async () => {
  const playlists = await Playlist.find()
    .populate('UserID', 'UserName')
    .populate('TrackIDs', 'TrackName');
  return playlists;
};

const getPlaylistById = async (id) => {
  const playlist = await Playlist.findOne({ PlaylistID: id })
    .populate('UserID', 'UserName')
    .populate('TrackIDs', 'TrackName');
  return playlist;
};

const updatePlaylist = async (id, updateData) => {
  const playlist = await Playlist.findOneAndUpdate({ PlaylistID: id }, updateData, { new: true })
    .populate('UserID', 'UserName')
    .populate('TrackIDs', 'TrackName');
  if (!playlist) throw new Error('Playlist not found');
  return playlist;
};

const deletePlaylist = async (id) => {
  const playlist = await Playlist.findOneAndDelete({ PlaylistID: id });
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
