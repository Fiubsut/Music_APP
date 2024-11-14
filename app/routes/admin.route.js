const express = require('express');
const router = express.Router();
const createAdminToken = require('../untils/createAdminToken');  // Import hàm tạo token admin

// Route để tạo token admin
router.get('/', (req, res) => {
  const token = createAdminToken();  // Gọi hàm tạo token
  res.json({ token });  // Trả về token admin
});

module.exports = router;