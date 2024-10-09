// // middlewares/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');
// require('dotenv').config();

// const authenticate = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader)
//     return res.status(401).json({ error: 'No token provided' });

//   const token = authHeader.split(' ')[1];

//   if (!token)
//     return res.status(401).json({ error: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ UserID: decoded.id });
//     if (!user)
//       return res.status(401).json({ error: 'User not found' });
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// module.exports = authenticate;
