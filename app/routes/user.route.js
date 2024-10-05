// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

// Đăng ký người dùng
router.post('/register', userController.register);

// Đăng nhập người dùng
router.post('/login', userController.login);

// Lấy thông tin người dùng
router.get('/:id', userController.getUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
