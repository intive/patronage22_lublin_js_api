const db = require('../models');

const Photo = db.photos;

const addPhoto = async (req, res) => {
  let productId = req.body.product_id;
  let photoDetails = {
    product_id: productId,
    url: `http://localhost:8080/${req.file.path}`,
    active: true,
    main_photo: true,
  };
  let photo = await Photo.create(photoDetails).catch((err) => {
    console.log('Error' + err);
  });
  res.status(200).send(photo);
};

const getAllPhotos = async (req, res) => {
  const photos = await Photo.findAll({});
  res.status(200).send(photos);
};

const getOnePhotoByProductId = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findOne({ where: { product_id: id } });
  res.status(200).send(photo);
};

const updatePhotoByProductId = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.update(req.body, { where: { product_id: id } });
  res.status(200).send(photo);
};

const deletePhotoByProductId = async (req, res) => {
  const id = req.params.id;
  await Photo.destroy({ where: { product_id: id } });
  res.status(200).send('Photo is deleted');
};

const getAllActivePhotos = async (req, res) => {
  const photos = await Photo.findAll({ where: { active: true } });
  res.status(200).send(photos);
};

const getAllMainPhotos = async (req, res) => {
  const photos = await Photo.findAll({ where: { main_photo: true } });
  res.status(200).send(photos);
};

module.exports = {
  addPhoto,
  getAllPhotos,
  getAllActivePhotos,
  getAllMainPhotos,
  getOnePhotoByProductId,
  updatePhotoByProductId,
  deletePhotoByProductId,
};
