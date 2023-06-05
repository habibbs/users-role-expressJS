const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models').users;

// Authentication middleware
// exports.authenticate = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Failed to authenticate token' });
//     }

//     req.userId = decoded.userId;
//     req.role = decoded.role;
//     next();
//   });
// };

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