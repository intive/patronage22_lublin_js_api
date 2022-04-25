const CustomAPIError = require('../errors/customError');
const db = require('../models');

const Page = db.pages;

const addPage = async (req, res) => {
  const pageTitle = req.body.title;
  const pageExist = await Page.findOne({ where: { title: pageTitle } });
  if (pageExist) {
    throw new CustomAPIError('Page already exist', 400);
  }
  let info = {
    title: req.body.title,
    description: req.body.description,
    slug: req.body.title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'), // collapse dashes
  };

  let page = await Page.create(info).catch((err) => {
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map((err) => err.message);
      res.status(400).json({ errors });
    }
  });
  res.status(200).send(page);
};

const getAllPages = async (req, res) => {
  const pages = await Page.findAll({});
  res.status(200).send(pages);
};

const getOnePage = async (req, res) => {
  const id = req.params.id;
  const page = await Page.findOne({ where: { id: id } });
  if (!page) {
    throw new CustomAPIError(`Page id: ${id} not found...`, 404);
  }
  res.status(200).send(page);
};
const getOnePageBySlug = async (req, res) => {
  const slug = req.params.slug;
  const page = await Page.findOne({ where: { slug: slug } });
  if (!page) {
    throw new CustomAPIError(`Page slug: ${slug} not found...`, 404);
  }
  res.status(200).send(page);
};

const updatePage = async (req, res) => {
  const id = req.params.id;
  const page = await Page.findOne({ where: { id: id } });
  if (!page) {
    throw new CustomAPIError(`Product id: ${id} not found...`, 404);
  }
  await Page.update(req.body, { where: { id: id } });
  res.status(200).send(page);
};

const deletePage = async (req, res) => {
  const id = req.params.id;
  const deletedPage = await Page.findOne({ where: { id: id } });
  if (!deletedPage) {
    throw new CustomAPIError(`Page id: ${id} not found...`, 404);
  }
  await Page.destroy({ where: { id: id } });
  res.status(200).send('Page deleted');
};

module.exports = {
  addPage,
  getAllPages,
  getOnePage,
  updatePage,
  deletePage,
  getOnePageBySlug,
};
