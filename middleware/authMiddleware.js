const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models').users;

module.exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    User.findByPk(decoded.id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
};

module.exports.checkAdminRole = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    const { role } = decodedToken;

    if (role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};