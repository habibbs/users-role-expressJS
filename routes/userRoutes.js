const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models').users;
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', authController.login);

// admin
router.get('/users', authMiddleware.authenticate, authMiddleware.isAdmin,  (req, res) => {
    res.send('Khusus Admin Dashboard')
});


module.exports = router;