const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const uploadImage = require('../utils/uploadImage');

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getById);
router.delete('/products/:id', productsController.delete);
router.post(
  '/products',
  uploadImage.single('uploaded_file'),
  productsController.add
);
router.put(
  '/products/:id',
  uploadImage.single('uploaded_file'),
  productsController.edit
);

module.exports = router;
