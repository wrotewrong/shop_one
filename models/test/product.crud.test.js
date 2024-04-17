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

describe('CRUD - Create', () => {
  it('should insert new product with "insertOne" method', async () => {
    const product = new Product({
      name: 'test2',
      price: 22,
      amount: 22,
      description: '2test test test test test test',
      img: 'avatar.jpg',
      date: '2024-04-04',
    });
    await product.save();
    expect(product.isNew).to.be.false;
  });

  after(async () => {
    await Product.deleteMany();
  });
});

describe('CRUD - Update', () => {
  beforeEach(async () => {
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
  });

  it('should update the product with "save" method', async () => {
    const product = await Product.findOne({ name: 'test2' });
    product.name = 'updated';
    await product.save();
    const updatedProduct = await Product.findOne({ name: 'updated' });
    expect(updatedProduct.name).to.not.be.null;
  });

  it('should update the product with "updateOne" method', async () => {
    await Product.updateOne({ name: 'test2' }, { $set: { price: 1 } });
    const updatedProduct = await Product.findOne({ name: 'test2' });
    expect(updatedProduct.price).to.be.equal(1);
  });

  it('should update the product with "updateMany" method', async () => {
    await Product.updateMany({}, { $set: { price: 5 } });
    const updatedProduct = await Product.find({ price: 5 });
    expect(updatedProduct.length).to.be.equal(2);
  });

  afterEach(async () => {
    await Product.deleteMany();
  });
});
