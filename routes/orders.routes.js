const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');

router.post('/orders', ordersController.add);

module.exports = router;
