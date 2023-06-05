const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Login route
router.post('/login', authController.login);
router.get('/login', (req, res) => {
    res.send ('login admin')
});

module.exports = router;