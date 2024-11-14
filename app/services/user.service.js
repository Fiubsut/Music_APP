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


  const changeInfor = async (id, updatedData) => {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error('User not found');
    }
  
    // Kiểm tra nếu email mới tồn tại và không trùng với email hiện tại của người dùng
    if (updatedData.email && updatedData.email !== user.email) {
      const emailExists = await User.findOne({ email: updatedData.email });
      if (emailExists) {
        const error = new Error('Email already in use');
        error.statusCode = 400;  // Thêm mã lỗi HTTP 400
        throw error;
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

  const updatePicture = async (userId, pictureUrl) => {
    try {
      // Kiểm tra nếu người dùng không tồn tại
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error('User not found');
      }
  
      // Kiểm tra nếu không có URL ảnh
      if (!pictureUrl) {
        throw new Error('No picture URL provided');
      }
  
      // Cập nhật URL ảnh đại diện
      user.profilePicture = pictureUrl;
  
      // Lưu các thay đổi vào cơ sở dữ liệu
      await user.save();
  
      // Trả về thông tin người dùng không có mật khẩu
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
