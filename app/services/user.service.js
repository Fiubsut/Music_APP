const User = require('../models/user.model.js');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const register = async (userData) => {
  const user = new User(userData);
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token , message:"Login successful", user: user};
};

const getUserById = async (id) => {
  const user = await User.findOne({ _id: id }).select('-password');
  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  if(!users) throw new Error('There are no users in the database!!!')
  return users;
};

const deleteUser = async (id) => {
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) throw new Error('User not found');
  return;
};

const changeInfor = async (userId, { userName, email, oldPassword, newPassword }) => {
  const user = await User.findById(userId);

  if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
  }

  if (oldPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
          const error = new Error('Old password is incorrect');
          error.statusCode = 400;
          throw error;
      }

      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
          const error = new Error('New password cannot be the same as the old password');
          error.statusCode = 400;
          throw error;
      }

      if (newPassword) {
          user.password = await bcrypt.hash(newPassword, 10);
      }
  }

  if (userName) user.userName = userName;
  if (email) user.email = email;

  await user.save();

  const { password, ...updatedUserData } = user.toObject();

  return updatedUserData;
};

module.exports = { changeInfor };


  const updatePicture = async (userId, pictureUrl) => {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error('User not found');
      }
  
      if (!pictureUrl) {
        throw new Error('No picture URL provided');
      }
  
      user.profilePicture = pictureUrl;
  
      await user.save();
  
      return user.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; } });
    } catch (error) {
      throw new Error('Error updating profile picture: ' + error.message);
    }
  };
  
  

module.exports = {
  register,
  login,
  getUserById,
  getAllUsers,
  deleteUser,
  changeInfor,
  updatePicture,
};
