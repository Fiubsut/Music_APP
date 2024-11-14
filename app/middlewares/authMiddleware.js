const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    // Lấy token từ header Authorization
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
    if (!token) {
      console.log('No token provided'); // Log nếu không có token
      return res.status(401).json({ error: 'Access token is missing or invalid' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // if (decoded.role !== 'admin') {
      //   return res.status(403).json({ error: 'Access denied. Admins only.' });
      // }
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(403).json({ error: 'Invalid token' });
    }
  };
  
  module.exports = authenticateJWT;
