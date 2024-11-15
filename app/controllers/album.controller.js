const albumService = require('../services/album.service.js');

const createAlbum = async (req, res) => {
  try {
    const album = await albumService.createAlbum(req.body);
    res.status(201).json({ message: 'Album created successfully', album });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAlbums = async (req, res) => {
  try {
    const albums = await albumService.getAllAlbums();
    res.status(200).json(albums);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAlbum = async (req, res) => {
  try {
    const album = await albumService.getAlbumById(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.status(200).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const album = await albumService.updateAlbum(req.params.id, req.body);
    res.status(200).json({ message: 'Album updated successfully', album });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    await albumService.deleteAlbum(req.params.id);
    res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addTrack = async (req, res) => {
  try {
    console.log('Album ID:', req.params.id); // Log album ID
    console.log('Track IDs:', req.body.trackIDs); // Log track IDs

    const { id } = req.params; 
    const { trackIDs } = req.body;

    if (!Array.isArray(trackIDs) || trackIDs.length === 0) {
      return res.status(400).json({ error: 'Track IDs must be a non-empty array' });
    }

    const updatedAlbum = await albumService.addTracksToAlbum(id, trackIDs);
    res.status(200).json({ message: 'Tracks added successfully', album: updatedAlbum });
  } catch (error) {
    console.error('Error in addTrack:', error.message); // Log lỗi chi tiết
    res.status(400).json({ error: error.message });
  }
};



const removeTrack = async (req, res) => {
  try {
    const { id } = req.params; // ID của album
    const { trackIDs } = req.body; // ID của track cần xoá (không phải mảng)

    // Kiểm tra nếu trackID là hợp lệ
    if (!trackIDs) {
      return res.status(400).json({ error: 'Track ID is required' });
    }

    // Xử lý việc xóa track trong album
    const updatedAlbum = await albumService.removeTrackFromAlbum(id, trackIDs);

    // Trả về album đã được cập nhật
    res.status(200).json({
      message: 'Track removed successfully',
      album: updatedAlbum,
    });
  } catch (error) {
    // Gửi lỗi chi tiết nếu có lỗi xảy ra
    console.error('Error removing track:', error.message);
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createAlbum,
  getAllAlbums,
  getAlbum,
  addTrack,
  updateAlbum,
  deleteAlbum,
  removeTrack,
};
