const mongoose = require('mongoose');

const usersModel = new mongoose.Schema({
  name: { type: String, required: true },
  authProviderId: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Users', usersModel);
