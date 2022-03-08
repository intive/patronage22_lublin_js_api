const db = require('../models');

const Page = db.pages;

const addPage = async (req, res) => {
  let info = {
    title: req.body.title,
    description: req.body.description,
  };

  let page = await Page.create(info).catch((err) => {
    console.log('Error' + err);
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
  res.status(200).send(page);
};

const updatePage = async (req, res) => {
  const id = req.params.id;
  const page = await Page.update(req.body, { where: { id: id } });
  res.status(200).send(page);
};

const deletePage = async (req, res) => {
  const id = req.params.id;
  await Page.destroy({ where: { id: id } });
  res.status(200).send('Page deleted');
};

module.exports = {
  addPage,
  getAllPages,
  getOnePage,
  updatePage,
  deletePage,
};
