const Orders = require('../models/ordersModel');
const logWhenNotTesting = require('../utils/logWhenNotTesting');

exports.add = async (req, res) => {
  try {
    const {
      products,
      totalPrice,
      firstName,
      lastName,
      country,
      zipCode,
      city,
      street,
      mail,
      phone,
    } = req.body;

    let parsedProducts;
    try {
      parsedProducts = JSON.parse(products);
      if (!Array.isArray(parsedProducts) || parsedProducts.length === 0) {
        throw new Error('No products provided');
      }
    } catch (parseError) {
      res.status(400).json({ message: 'Invalid product data' });
      logWhenNotTesting('Invalid product format or empty');
      return;
    }

    const newOrder = new Orders({
      products: parsedProducts,
      totalPrice,
      firstName,
      lastName,
      country,
      zipCode,
      city,
      street,
      mail,
      phone,
      date: Date.now(),
      size: parsedProducts.reduce((a, b) => a + b.amount, 0),
      paymentStatus: 'negative',
    });
    await newOrder.save();
    res.status(200).json({ message: 'OK', newOrder });
    logWhenNotTesting('Order has been added', newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logWhenNotTesting(err.message);
  }
};
