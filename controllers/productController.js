const db = require('../models')

const Product = db.products

const addProduct = async (req,res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false, 
  }

  let product = await Product.create(info).catch(err => {console.log('Error' + err)})
  res.status(200).send(product)
  console.log(product)
}

const getAllProducts = async (req,res) => {
  const products = await Product.findAll({})
  res.status(200).send(products)
}

const getOneProduct = async (req,res) => {
  const id = req.params.id
  const product = await Product.findOne({ where: {id: id }})
  res.status(200).send(product)
}

const updateProduct = async (req,res) => {
  const id = req.params.id
  const product = await Product.update(req.body, { where: {id: id }})
  res.status(200).send(product)
}

const deleteProduct = async (req,res) => {
  const id = req.params.id
  await Product.destroy({ where: {id: id }})
  res.status(200).send('Product is deleted')
}

const getPublishedProducts = async (req,res) => {
  const products = await Product.findAll({ where: {published: true }})
  res.status(200).send(products)
}

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProducts
}