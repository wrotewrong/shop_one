const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const multer = require('multer');
const upload = multer({ dest: './public/uploads' });

router.post('/add', upload.single('uploaded_file'), productsController.add);

module.exports = router;
