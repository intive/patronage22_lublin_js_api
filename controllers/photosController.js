const db = require('../models');
const fs = require('fs');
const { unlink, access, constants, fstat } = require('fs');
const { CustomAPIError } = require('../errors');
const { all } = require('express/lib/application');

const Photo = db.photos;
const Product = db.products;

const addPhoto = async (req, res) => {
  let productId = req.body.product_id;
  if (!productId) {
    return res.status(400).json({ msg: 'Please provide product_id' });
  }

  const checkProductExist = await Product.findOne({
    where: { id: productId },
  });

  if (!checkProductExist) {
    return res.status(400).json({ msg: 'Unable to find provided product_id' });
  } else {
    let photoDetails = {
      product_id: productId,
      url: `${req.file.path}`,
      active: true,
      main_photo: false,
    };
    let photo = await Photo.create(photoDetails).catch((err) => {
      console.log('Error' + err);
    });
    res.status(200).send(photo);
  }
};
const getAllPhotos = async (req, res) => {
  const photos = await Photo.findAll({});
  res.status(200).send(photos);
};

const getPhotoById = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findOne({ where: { id: id } });
  res.status(200).send(photo);
};

const updatePhotoById = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.update(req.body, { where: { id: id } });
  res.status(200).send(photo);
};

const deletePhotoById = async (req, res) => {
  const id = req.params.id;
  let photoToDelete = await Photo.findOne({ where: { id: id } });
  if (!photoToDelete) {
    throw new CustomAPIError(`Photo id: ${id} - not found`, 404);
  }
  function deleteFile(filepath, callback) {
    try {
      fs.access(filepath, (error) => {
        if (error) {
          return res.status(404).json({ msg: `File not found in directory.` });
        }
        fs.unlink(filepath, async (err) => {
          if (err) {
            callback(err);
            return;
          }
          await Photo.destroy({ where: { id: id } });
          return res.status(200).json({ msg: 'File deleted' });
        });
      });
    } catch (error) {
      throw new CustomAPIError(`${error.message}`, `${error.status}`);
    }
  }
  deleteFile(`./${photoToDelete.url}`, (err) => {
    if (err) {
      throw new CustomAPIError(`Photo id: ${id} not found`, 404);
    }
  });
};

const removeAllPhotosByProductId = async (req, res) => {
  const id = req.params.id;
  let allPhotosByProductId = await Photo.findAll({ where: { product_id: id } });

  if (allPhotosByProductId.length === 0) {
    throw new CustomAPIError('No photos were found', 404);
  }

  let allUrls = [];
  for (let { url } of allPhotosByProductId) {
    allUrls.push(url);
  }
  function dataDeleter() {
    return Promise.all(
      allUrls.map(
        (url) =>
          new Promise((res, rej) => {
            try {
              fs.unlink(`./${url}`, (err) => {
                if (err) throw new CustomAPIError(`${err.message}`, 400);
                console.log(`${url} was deleted`);
              });
              Photo.destroy({ where: { product_id: id } });
              res();
            } catch (err) {
              console.error(err);
              rej(err);
            }
          })
      )
    )
      .then(() => {
        allUrls.length = 0;
        res.status(200).json({ msg: 'Files removed' });
      })
      .catch((err) => new CustomAPIError(`${err.message}`, 400));
  }
  dataDeleter(allUrls);
};

const getAllPhotosByProductId = async (req, res) => {
  const id = req.params.id;
  const photos = await Photo.findAll({ where: { product_id: id } });
  res.status(200).send(photos);
};

const getMainPhotoByProductId = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findOne({
    where: { product_id: id, main_photo: true },
  });
  res.status(200).send(photo);
};

module.exports = {
  addPhoto,
  getAllPhotos,
  getAllPhotosByProductId,
  getMainPhotoByProductId,
  getPhotoById,
  updatePhotoById,
  deletePhotoById,
  removeAllPhotosByProductId,
};
