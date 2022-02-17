const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, 'jwtSecret');
    req.user = { name: decoded.name, email: decoded.email };
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = authMiddleware;