const jwt = require('jsonwebtoken');
require('dotenv').config();

const createAdminToken = () => {
  const adminPayload = {
    id: 'adminId123',  // ID của admin
    role: 'admin',     // Vai trò là admin
  };

  const token = jwt.sign(adminPayload, process.env.JWT_SECRET, {
    expiresIn: '1d',  // Token có thể hết hạn sau 1 ngày hoặc không hết hạn
  });

  return token;  // Trả về token
};

module.exports = createAdminToken;
