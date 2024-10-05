// services/trackService.js
const Track = require('../models/track.model.js');

const createTrack = async (trackData) => {
  const lastTrack = await Track.findOne().sort({ TrackID: -1 });
  const newTrackID = lastTrack ? lastTrack.TrackID + 1 : 1;
  trackData.TrackID = newTrackID;

  const track = new Track(trackData);
  await track.save();
  return track;
};

const getAllTracks = async () => {
  const tracks = await Track.find()
    .populate('AlbumID', 'AlbumName')
    .populate('ArtistID', 'ArtistName')
    .populate('GenreIDs', 'GenreName');
  return tracks;
};

const getTrackById = async (id) => {
  const track = await Track.findOne({ TrackID: id })
    .populate('AlbumID', 'AlbumName')
    .populate('ArtistID', 'ArtistName')
    .populate('GenreIDs', 'GenreName');
  return track;
};

const updateTrack = async (id, updateData) => {
  const track = await Track.findOneAndUpdate({ TrackID: id }, updateData, { new: true })
    .populate('AlbumID', 'AlbumName')
    .populate('ArtistID', 'ArtistName')
    .populate('GenreIDs', 'GenreName');
  if (!track) throw new Error('Track not found');
  return track;
};

const deleteTrack = async (id) => {
  const track = await Track.findOneAndDelete({ TrackID: id });
  if (!track) throw new Error('Track not found');
  return;
};

module.exports = {
  createTrack,
  getAllTracks,
  getTrackById,
  updateTrack,
  deleteTrack,
};
