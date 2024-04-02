const Products = require('../models/productsModel');
const removeImage = require('../utils/removeImage');
const path = require('path');
const fs = require('fs');

exports.getAll = async (req, res) => {
  try {
    const allProducts = await Products.find();
    if (allProducts.length === 0) {
      res
        .status(200)
        .json({ message: 'There are no products in the database' });
      console.log('There are no products in the database');
    } else {
      res.status(200).json(allProducts);
      console.log(`Number of products: ${allProducts.length}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const productById = await Products.find({ _id: req.params.id });
    if (productById.length === 0) {
      res.status(404).json({ message: `Not found...` });
      console.log(`The product with id: ${req.params.id} does not exist`);
    } else {
      res.status(200).json(productById[0]);
      console.log(productById[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

exports.add = async (req, res) => {
  try {
    const { name, description, price, amount } = req.body;
    const img = req.file;
    const date = new Date();
    const formatDate = `${String(date.getDate()).padStart(2, '0')}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${date.getFullYear()}`;

    const newProduct = new Products({
      name,
      description,
      price,
      amount,
      img: img.filename,
      date: formatDate,
    });
    await newProduct.save();
    res.status(201).json({ message: 'Product has been added', newProduct });
    console.log('Product has been added', newProduct);
  } catch (err) {
    if (req.file) removeImage(req.file.filename);
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: `Not found...` });
      console.log(`The product with id: ${req.params.id} does not exist`);
    } else {
      fs.stat(
        `${path.join(__dirname, '../public/uploads/')}${product.img}`,
        () => {
          removeImage(product.img);
        }
      );
      await Products.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: `The product has been removed` });
      console.log(`The product with id: ${req.params.id} has been removed`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};
