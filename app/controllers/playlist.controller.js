const playlistService = require('../services/playlist.service.js');

const createPlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.createPlaylist(req.body);
    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await playlistService.getAllPlaylists();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.getPlaylistById(req.params.id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    res.status(200).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const playlist = await playlistService.updatePlaylist(req.params.id, req.body);
    res.status(200).json({ message: 'Playlist updated successfully', playlist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeTrackFromPlaylist = async (req, res) => {
  console.log('Playlist ID:', req.params.id);
  console.log('Track ID:', req.params.trackId);

  try {
    const updatedPlaylist = await playlistService.removeTrackFromPlaylist(
      req.params.id,
      req.params.trackId
    );
    res.status(200).json({ message: 'Track removed successfully', playlist: updatedPlaylist });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    await playlistService.deletePlaylist(req.params.id);
    res.status(200).json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPlaylist,
  getAllPlaylists,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
  removeTrackFromPlaylist,
};
