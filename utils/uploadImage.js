const multer = require('multer');
const { PRODUCT_IMAGE_MAX_SIZE } = require('../backendConfig');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

const uploadImage = multer({
  storage,
  limits: { fileSize: PRODUCT_IMAGE_MAX_SIZE },
});

module.exports = uploadImage;
