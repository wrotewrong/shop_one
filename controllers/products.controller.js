const Products = require('../models/productsModel');
const Users = require('../models/usersModel');
const removeImage = require('../utils/removeImage');
const findImageType = require('../utils/findImageType');
const { PRODUCT_IMAGE_VALID_EXTENSIONS } = require('../config/backendConfig');
const logWhenNotTesting = require('../utils/logWhenNotTesting');

exports.getAll = async (req, res) => {
  try {
    const allProducts = await Products.find().populate({
      path: 'user',
      select: ['-authProviderId', '-email'],
    });

    if (allProducts.length === 0) {
      res
        .status(200)
        .json({ message: 'There are no products in the database' });
      logWhenNotTesting('There are no products in the database');
    } else {
      res.status(200).json(allProducts);
      logWhenNotTesting(`Number of products: ${allProducts.length}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    logWhenNotTesting(err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const productById = await Products.find({ _id: req.params.id }).populate({
      path: 'user',
      select: ['-authProviderId', '-email'],
    });
    if (productById.length === 0) {
      res.status(404).json({ message: `Not found...` });
      logWhenNotTesting(`The product with id: ${req.params.id} does not exist`);
    } else {
      res.status(200).json(productById[0]);
      logWhenNotTesting(productById[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    logWhenNotTesting(err.message);
  }
};

exports.add = async (req, res) => {
  try {
    const { name, description, price, amount } = req.body;
    const img = req.file;
    const imgType = img ? await findImageType(img) : 'unknown';
    const date = new Date();
    const formatDate = `${String(date.getDate()).padStart(2, '0')}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${date.getFullYear()}`;

    if (PRODUCT_IMAGE_VALID_EXTENSIONS.includes(imgType)) {
      const newProduct = new Products({
        name,
        description,
        price,
        amount,
        img: img.filename,
        date: formatDate,
        user: await Users.findOne({ authProviderId: req.user.id }).select([
          '-authProviderId',
          '-email',
        ]),
      });
      await newProduct.save();
      res.status(200).json({ message: 'OK', newProduct });
      logWhenNotTesting('Product has been added', newProduct);
    } else {
      if (img) {
        removeImage(img.filename);
      }
      res.status(400).json({
        message: `Bad request`,
      });
      logWhenNotTesting('Invalid file format');
    }
  } catch (err) {
    if (req.file) {
      removeImage(req.file.filename);
    }
    res.status(500).json({ message: err.message });
    logWhenNotTesting(err.message);
  }
};

exports.edit = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    const { name, price, amount, description } = req.body;
    const newImg = req.file;
    const newImgType = newImg ? await findImageType(newImg) : 'unknown';

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.amount = amount || product.amount;
      product.description = description || product.description;
      if (newImg) {
        if (PRODUCT_IMAGE_VALID_EXTENSIONS.includes(newImgType)) {
          removeImage(product.img);
          product.img = newImg.filename;
        } else {
          removeImage(newImg.filename);
          res.status(400).json({ message: 'Bad request' });
          logWhenNotTesting('Invalid file format');
          return;
        }
      }
      await product.save();
      res.status(200).json({
        message: `OK`,
        product,
      });
      logWhenNotTesting(`Product with id ${req.params.id} has been edited`);
    } else {
      if (process.env.NODE_ENV !== 'test') {
        removeImage(newImg.filename);
      }
      res.status(404).json({ message: 'Not found...' });
      logWhenNotTesting(`The product with id: ${req.params.id} does not exist`);
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      removeImage(req.file.filename);
    }
    res.status(500).json({ message: err.message });
    logWhenNotTesting(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedProduct = await Products.findById(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: `Not found...` });
      logWhenNotTesting(`The product with id: ${req.params.id} does not exist`);
    } else {
      if (process.env.NODE_ENV !== 'test') {
        removeImage(deletedProduct.img);
      }
      await Products.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: `OK`, deletedProduct });
      logWhenNotTesting(
        `The product with id: ${req.params.id} has been removed`
      );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    logWhenNotTesting(err.message);
  }
};
