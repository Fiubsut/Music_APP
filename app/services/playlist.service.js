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
  const existingPlaylist = await Playlist.findById(id);
  if (!existingPlaylist) throw new Error('Playlist not found');

  const newTrackIds = updateData.trackIDs;
  const duplicateTrackIds = newTrackIds.filter(trackId => 
    existingPlaylist.trackIDs.includes(trackId)
  );

  if (duplicateTrackIds.length > 0) {
    throw new Error(`Track(s) already exist in the playlist: ${duplicateTrackIds.join(', ')}`);
  }

  const playlist = await Playlist.findOneAndUpdate(
    { _id: id },
    { $addToSet: { trackIDs: { $each: newTrackIds } } },
    { new: true }
  )
    .populate('userID', 'userName')
    .populate('trackIDs', 'trackName');

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
