const db = require('../models');

const UsersExternal = db.usersExternal;

const addUserExternal = async (req, res) => {
  let info = {
    name: req.body.name,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    postal_code: req.body.postal_code
  };
  let externalUser = await UsersExternal.create(info).catch((err) => {
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map((err) => err.message);
      res.status(400).json({ errors });
    }
  });
  res.status(200).send(externalUser);
};

const getAllUsersExternal = async (req, res) => {
  const externalUsers = await UsersExternal.findAll({});
  res.status(200).send(externalUsers);
};

const getAllActiveUsersExternal = async (req, res) => {
  const externalUsers = await UsersExternal.findAll({ where: { active: true }});
  res.status(200).send(externalUsers);
};



const getOneUserExternal = async (req, res) => {
  const id = req.params.id;
  const externalUser = await UsersExternal.findOne({ where: { id: id } });
  res.status(200).send(externalUser);
};

const updateUserExternal = async (req, res) => {
  const id = req.params.id;
  const externalUser = await UsersExternal.update(req.body, { where: { id: id } });
  res.status(200).send(externalUser);
};

const deleteUserExternal = async (req, res) => {
  const id = req.params.id;
  await UsersExternal.destroy({ where: { id: id } });
  res.status(200).send('External user is deleted');
};

module.exports = {
  addUserExternal,
  getAllUsersExternal,
  getAllActiveUsersExternal,
  getOneUserExternal,
  updateUserExternal,
  deleteUserExternal,
};
