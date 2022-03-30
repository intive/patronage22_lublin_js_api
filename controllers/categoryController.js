const db = require('../models');

const Category = db.categories;

const addCategory = async (req, res) => {
  let info = {
    title: req.body.title,
    description: req.body.description,
  };
  let category = await Category.create(info).catch((err) => {
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map((err) => err.message);
      res.status(400).json({ errors });
    }
  });
  res.status(200).send(category);
};

const getAllCategories = async (req, res) => {
  const categories = await Category.findAll({});
  res.status(200).send(categories);
};

const getOneCategory = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findOne({ where: { id: id } });
  res.status(200).send(category);
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const category = await Category.update(req.body, { where: { id: id } });
  res.status(200).send(category);
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  await Category.destroy({ where: { id: id } });
  res.status(200).send('Category is deleted');
};

module.exports = {
  addCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
