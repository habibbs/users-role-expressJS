const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

// admin
router.get('/users', authMiddleware.authenticate, authMiddleware.checkAdminRole,  (req, res) => {
    res.send('Khusus Admin Dashboard')
});


module.exports = router;