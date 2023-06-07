const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models').users;
require('dotenv').config()

// Login route
exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password)
  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    // console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email:user.email, password: user.password, role: user.role }, process.env.jwtSecret, { expiresIn: '1h' });

    // Return token
    res.json({message: user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', err: error });
  }
};