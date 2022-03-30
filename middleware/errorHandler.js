const CustomAPIError = require('../errors/customError');
const Sequelize = require('sequelize');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof Sequelize.ValidationError) {
    return res.status(400).json({ msg: err.message });
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).send('Something went wrong try again later');
};

module.exports = errorHandlerMiddleware;
