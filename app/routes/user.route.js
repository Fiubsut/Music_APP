const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const authenticateJWT = require('../middlewares/authMiddleware.js');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', authenticateJWT, userController.getUser);
router.get('/', authenticateJWT, userController.getAllUsers);
router.delete('/:id', authenticateJWT, userController.deleteUser);
router.put('/:id', authenticateJWT, userController.changeInfor);
router.put('/:id/update_picture', authenticateJWT, userController.updatePicture);

module.exports = router;
