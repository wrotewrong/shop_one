const mongoose = require('mongoose');
const {
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_PRICE_MIN,
  PRODUCT_PRICE_MAX,
  PRODUCT_AMOUNT_MIN,
  PRODUCT_AMOUNT_MAX,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
} = require('../config/backendConfig');

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: PRODUCT_NAME_MIN_LENGTH,
    maxlength: PRODUCT_NAME_MAX_LENGTH,
  },
  price: {
    type: Number,
    required: true,
    min: PRODUCT_PRICE_MIN,
    max: PRODUCT_PRICE_MAX,
  },
  amount: {
    type: Number,
    required: true,
    min: PRODUCT_AMOUNT_MIN,
    max: PRODUCT_AMOUNT_MAX,
  },
  description: {
    type: String,
    required: true,
    minlength: PRODUCT_DESCRIPTION_MIN_LENGTH,
    maxlength: PRODUCT_DESCRIPTION_MAX_LENGTH,
  },
  img: { type: String, required: true },
  date: { type: String, required: true },
  user: { type: String, required: true, ref: 'Users' },
});

module.exports = mongoose.model('Products', productsSchema);
