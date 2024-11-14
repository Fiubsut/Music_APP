const userService = require('../services/user.service.js');

const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    console.log(req.body)
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const changeInfor = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await userService.changeInfor(id, req.body);
      res.status(200).json({ message: 'User information updated successfully', user: updatedUser });
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  };

const updatePicture = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const { pictureUrl } = req.body; // Lấy URL ảnh từ body của request

    if (!pictureUrl) {
      return res.status(400).json({ error: 'No picture URL provided' });
    }

    // Cập nhật ảnh đại diện của người dùng
    const updatedUser = await userService.updatePicture(id, pictureUrl);

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Profile picture updated successfully', user: updatedUser });
  } catch (error) {
    // Xử lý lỗi
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getUser,
  getAllUsers,
  deleteUser,
  changeInfor,
  updatePicture,
};
