const Products = require('../models/productsModel');
const removeImage = require('../utils/removeImage');

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
