const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { BadRequest, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const User = db.users;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequest('Please provide name, email and password to register');
  }

  const emailAlreadyExist = await User.findOne({ where: { email: email }});
  if (emailAlreadyExist) {
    throw new BadRequest('Email already exist!')
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = {
    name,
    email,
    password: hashPassword,
  };
  const savedUser = await User.create(newUser).catch((err) => {
    console.log('Error' + err);
  });

  const token = jwt.sign({ name }, 'jwtSecret', {
    expiresIn: '7d',
  });

  return res.status(200).json({ msg: 'User created', token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest('Please provide email and password');
  }
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  const isPasswrodCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswrodCorrect) {
    throw new UnauthenticatedError('Invalid credentials')
  }
  const token = jwt.sign({ user }, 'jwtSecret', {
    expiresIn: '7d',
  });
  res.cookie('jwt', token)
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};


const logout = (req, res, next) => {
    res.cookie('token', null, {
      httpOnly: true,
    })
    res.clearCookie("jwt");

    res.status(200).json({
      success: true,
      data: {},
    })
};
    
module.exports = {
  register,
  login,
  logout,
};
