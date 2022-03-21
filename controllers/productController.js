const db = require('../models');

const Product = db.products;
const Photo = db.photos;

const addProduct = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ msg: `Please provide details for new product` });
  }
    let info = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    };
    let product = await Product.create(info).catch((err) => {
      console.log('Error' + err);
    });
    res.status(200).send(product);
    console.log(product);
};

const getAllProducts = async (req, res) => {
  const products = await Product.findAll({});
  res.status(200).send(products);
};

const getOneProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ where: { id: id } });
  if (!product) {
    return res.status(404).json({ msg: `Product id: ${id} not found...` });
  }
  res.status(200).send(product);
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.update(req.body, { where: { id: id } });
  if (!product) {
    return res.status(404).json({ msg: `Product id: ${id} not found...` });
  }
  res.status(200).send(product);
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const deletedItem = await Product.findOne({ where: { id: id } });
  if (!deletedItem) {
    return res.status(404).json({ msg: `Product id: ${id} not found...` });
  }
  await Product.destroy({ where: { id: id } });
  res.status(200).send('Product is deleted');
};

const getPublishedProducts = async (req, res) => {
  const products = await Product.findAll({
    where: { published: true },
  });
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
    return res.status(404).json({ msg: `Product id: ${id} not found...` });
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
