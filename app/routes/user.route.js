// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/:id', userController.getUser);

router.get('/', userController.getAllUsers);

router.delete('/:id', userController.deleteUser);

router.put('/:id', userController.changeInfor);

module.exports = router;
