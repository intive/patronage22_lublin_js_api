const db = require('../models');

const Photo = db.photos;

const addPhoto = async (req, res) => {
  let productId = req.body.product_id;
  let photoDetails = {
    product_id: productId,
    url: `${process.env.PHOTO_URL}${req.file.path}`,
    active: false,
    main_photo: false,
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

const getOnePhotoById = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findOne({ where: { id: id } });
  res.status(200).send(photo);
};

const updatePhotoById = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.update(req.body, { where: { id: id } });
  res.status(200).send(photo);
};

const removeOneById = async (req, res) => {
  const id = req.params.id
  await Photo.destroy({ where: {id: id }})
  res.status(200).send('Photo is deleted')
}
const removeAllByProductId = async (req, res) => {
  const id = req.params.id;
  await Photo.destroy({ where: { product_id: id } });
  res.status(200).send('Photos are deleted');
};

const getAllPhotosByProductId = async (req, res) => {
  const id = req.params.id;
  const photos = await Photo.findAll({ where: { product_id: id } });
  res.status(200).send(photos);
};

const getMainPhotoByProductId = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findOne({ where: { product_id: id, main_photo: true } });
  res.status(200).send(photo);
};

module.exports = {
  addPhoto,
  getAllPhotos,
  getAllPhotosByProductId,
  getMainPhotoByProductId,
  getOnePhotoById,
  updatePhotoById,
  removeOneById,
  removeAllByProductId,
};
