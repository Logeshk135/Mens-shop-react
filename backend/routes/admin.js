// routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');
const User = require('../models/User');

// Get all users (admin)
router.get('/users', auth, adminOnly, async (req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json(users);
});

module.exports = router;
