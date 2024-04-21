const Product = require('../../models/productsModel.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /products', () => {
  before(async () => {
    const testProduct = new Product({
      _id: '6624327aca894b49e9f99066',
      name: 'test',
      price: 12,
      amount: 2,
      description: 'test test test test test test',
      img: 'avatar.jpg',
      date: '2024-04-04',
    });
    await testProduct.save();
    const anotherTestProduct = new Product({
      _id: '6624327aca894b49e9f99067',
      name: 'test2',
      price: 22,
      amount: 22,
      description: '2test test test test test test',
      img: 'avatar.jpg',
      date: '2024-04-04',
    });
    await anotherTestProduct.save();
  });

  it('/ should return all products', async () => {
    const res = await request(server).get('/products');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/:id should return product by id ', async () => {
    const res = await request(server).get('/products/6624327aca894b49e9f99067');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  after(async () => {
    await Product.deleteMany();
  });
});
