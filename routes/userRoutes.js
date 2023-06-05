const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models').users;
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all users (admin only)
router.get('/users', authMiddleware.authenticate, (req, res) => {
    res.send('admin roles succes')
});

module.exports = router;