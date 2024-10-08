// services/userService.js
const User = require('../models/user.model.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();



const register = async (userData) => {
  // Tự động tăng UserID (cách đơn giản)
  const lastUser = await User.findOne().sort({ UserID: -1 });
  const newUserID = lastUser ? lastUser.UserID + 1 : 1;
  userData.UserID = newUserID;

  const user = new User(userData);
  const hashedPassword = await bcrypt.hash(user.Password, 10);
  user.Password = hashedPassword
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ Email: email });
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.Password);
  if (!isPasswordMatch) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: user.UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token , message:"Login successful", user: user};
};

const getUserById = async (id) => {
  const user = await User.findOne({ UserID: id }).select('-Password');
  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const deleteUser = async (id) => {
    const user = await User.findOneAndDelete({ UserID: id });
    if (!user) throw new Error('User not found');
    return;
  };


  const changeInfor = async (id, updatedData) => {
    // Tìm người dùng hiện tại bằng UserID
    const user = await User.findOne({ UserID: id });
    if (!user) {
      throw new Error('User not found');
    }
  
    // Kiểm tra nếu email mới tồn tại và không trùng với email hiện tại của người dùng
    if (updatedData.Email && updatedData.Email !== user.Email) {
      const emailExists = await User.findOne({ Email: updatedData.Email });
      if (emailExists) {
        throw new Error('Email already in use');
      }
    }
  
    // Cập nhật thông tin người dùng với dữ liệu mới
    Object.assign(user, updatedData);

    const hashedPassword = await bcrypt.hash(user.Password, 10);
    user.Password = hashedPassword;
    
    // Lưu các thay đổi vào cơ sở dữ liệu
    await user.save();
    return user;
  };

module.exports = {
  register,
  login,
  getUserById,
  getAllUsers,
  deleteUser,
  changeInfor,
};
