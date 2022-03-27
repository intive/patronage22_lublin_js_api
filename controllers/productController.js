const CustomAPIError = require('../errors/customError');
const db = require('../models');

const Product = db.products;
const Photo = db.photos;

const addProduct = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new CustomAPIError('Please provide details for new product', 400);
  }
  let info = {
    title: req.body.title,
    price: req.body.price,
    quantity: req.body.quantity,
    status: req.body.status ? 'Available' : 'Unavailable',
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };
  let product = await Product.create(info).catch((err) => {
    console.log('Error' + err);
  });
  res.status(200).send(product);
};

const getAllProducts = async (req, res) => {
  const products = await Product.findAll({});
  res.status(200).send(products);
};

const getOneProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ where: { id: id } });
  if (!product) {
    throw new CustomAPIError(`Product id: ${id} not found...`, 404);
  }
  res.status(200).send(product);
};

const updateProduct = async (req, res) => {
  const status = req.body.status ? 'Available' : 'Unavailable';
  const id = req.params.id;
  const product = await Product.findOne({ where: { id: id } });
  if (!product) {
    throw new CustomAPIError(`Product id: ${id} not found...`, 404);
  }
  let newDetails = {
    ...req.body,
    status,
  };
  await Product.update(newDetails, { where: { id: id } });
  res.status(200).send(product);
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const deletedItem = await Product.findOne({ where: { id: id } });
  if (!deletedItem) {
    throw new CustomAPIError(`Product id: ${id} not found...`, 404);
  }
  await Product.destroy({ where: { id: id } });
  res.status(200).send('Product is deleted');
};

const getPublishedProducts = async (req, res) => {
  const products = await Product.findAll({
    where: { published: true },
  });
  if (!products) {
    throw new CustomAPIError(`No published products`, 404);
  }
  res.status(200).send(products);
};

const getAllProductsExternal = async (req, res) => {
  const products = await Product.findAll({
    include: { model: Photo, as: 'photos', where: { main_photo: 1 } },
  });
  res.status(200).send(products);
};

const getOneProductExternal = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({
    where: { id: id },
    include: { model: Photo, as: 'photos' },
  });
  if (!product) {
    throw new CustomAPIError(`Product id: ${id} not found...`, 404);
  }
  res.status(200).send(product);
};

const getPublishedProductsExternal = async (req, res) => {
  const products = await Product.findAll({
    where: { published: true },
    include: { model: Photo, as: 'photos', where: { main_photo: 1 } },
  });
  res.status(200).send(products);
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProducts,
  getAllProductsExternal,
  getOneProductExternal,
  getPublishedProductsExternal,
};
