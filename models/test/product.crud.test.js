const Product = require('../productsModel');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('CRUD - Read', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/shopOne');
      const testProduct = new Product({
        name: 'test',
        price: 12,
        amount: 2,
        description: 'test test test test test test',
        img: 'avatar.jpg',
        date: '2024-04-04',
      });
      await testProduct.save();
      const anotherTestProduct = new Product({
        name: 'test2',
        price: 22,
        amount: 22,
        description: '2test test test test test test',
        img: 'avatar.jpg',
        date: '2024-04-04',
      });
      await anotherTestProduct.save();
    } catch (err) {
      console.error(err);
    }
  });

  it('should return all the data with "find" method', async () => {
    const products = await Product.find();
    const expectedLength = 2;
    expect(products.length).to.be.equal(expectedLength);
  });

  it('should return proper product with "findOne" method', async () => {
    const products = await Product.findOne({ name: 'test2' });
    const expectedName = 'test2';
    expect(products.name).to.be.equal(expectedName);
  });

  after(async () => {
    await Product.deleteMany();
  });
});
