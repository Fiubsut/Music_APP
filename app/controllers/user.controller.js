// controllers/userController.js
const userService = require('../services/user.service.js');

const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const token = await userService.login(Email, Password);
    res.status(200).json({ token });
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

const deleteUser = async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
  register,
  login,
  getUser,
  deleteUser,
};
