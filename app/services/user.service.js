// services/userService.js
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (userData) => {
  // Tự động tăng UserID (cách đơn giản)
  const lastUser = await User.findOne().sort({ UserID: -1 });
  const newUserID = lastUser ? lastUser.UserID + 1 : 1;
  userData.UserID = newUserID;

  const user = new User(userData);
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ Email: email });
  if (!user) {
    throw new Error('User not found');
  }
  const isValid = await user.validPassword(password);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: user.UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token };
};

const getUserById = async (id) => {
  const user = await User.findOne({ UserID: id }).select('-Password');
  return user;
};

const deleteUser = async (id) => {
    const user = await User.findOneAndDelete({ UserID: id });
    if (!user) throw new Error('User not found');
    return;
  };

module.exports = {
  register,
  login,
  getUserById,
  deleteUser,
};
