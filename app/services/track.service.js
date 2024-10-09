const Track = require('../models/track.model.js');

const createTrack = async (trackData) => {

  const track = new Track(trackData);
  await track.save();
  return track;
};

const getAllTracks = async () => {
  const tracks = await Track.find()
    .populate('albumID', 'albumName')
    .populate('artistID', 'artistName')
    .populate('genreIDs', 'genreName');
  return tracks;
};

const getTrackById = async (id) => {
  const track = await Track.findOne({ _id: id })
    .populate('albumID', 'albumName')
    .populate('artistID', 'artistName')
    .populate('genreIDs', 'genreName');
  return track;
};

const updateTrack = async (id, updateData) => {
  const track = await Track.findOneAndUpdate({ _id: id }, updateData, { new: true })
    .populate('albumID', 'albumName')
    .populate('artistID', 'artistName')
    .populate('genreIDs', 'genreName');
  if (!track) throw new Error('Track not found');
  return track;
};

const deleteTrack = async (id) => {
  const track = await Track.findOneAndDelete({ _id: id });
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
