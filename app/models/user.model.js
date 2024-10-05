// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  UserID: {
    type: Number,
    unique: true,
    required: true,
  },
  UserName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  Password: {
    type: String,
    required: true,
  },
  ProfilePicture: {
    type: String,
    default: '',
  },
}, { timestamps: true });

// // Mã hóa mật khẩu trước khi lưu
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('Password')) return next(); //kiểm tra bất thường
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.Password = await bcrypt.hash(this.Password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Phương thức so sánh mật khẩu
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.Password);
};

module.exports = mongoose.model('User', userSchema);
