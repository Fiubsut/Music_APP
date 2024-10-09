const User = require('../models/user.model.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();



const register = async (userData) => {
  // const existingUser = await User.findOne({ email: userData.email });
  // if (existingUser) {
  //   // Bạn có thể tùy chỉnh thông báo lỗi theo ý muốn
  //   throw new Error('Email này đã được sử dụng. Vui lòng sử dụng email khác.');
  // }
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


  const changeInfor = async (id, updatedData) => {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error('User not found');
    }
  
    // Kiểm tra nếu email mới tồn tại và không trùng với email hiện tại của người dùng
    if (updatedData.email && updatedData.email !== user.email) {
      const emailExists = await User.findOne({ email: updatedData.email });
      if (emailExists) {
        throw new Error('Email already in use');
      }
    }
  
    // Cập nhật thông tin người dùng với dữ liệu mới
    Object.assign(user, updatedData);

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    
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
