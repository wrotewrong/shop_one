const mongoose = require('mongoose');

const ordersModel = new mongoose.Schema({
  products: [],
  totalPrice: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Orders', ordersModel);
